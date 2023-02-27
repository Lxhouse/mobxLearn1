import { Button, Progress, Slider } from "antd";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { createCar, createLine, createMarkersInfo } from "../../tools/utils";
import Amap from "../Amap";
import "./index.css";
import Data from "./jsonData";
const TrackPlayback = ({ trackPlaBackStore }) => {
  const lineArr = Data.map((e) => ({ lat: e.lat, lng: e.lng }));
  const [carSpeed, setCarSpeed] = useState(2000);
  const [multiple, setMultiple] = useState(0);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playbackStart, setPlaybackStart] = useState(0);
  const carMarker = useRef(null);
  const carLine = useRef(null);
  const replayPath = useRef([]);
  const playCar = () => {
    const { _mapIns } = window || {};
    if (!carMarker.current || !_mapIns) return;
    carMarker.current.on("moving", function (e) {
      setPlaybackProgress(
        Math.round(((e.passedPath.length + playbackStart) / Data.length) * 100)
      );
      // _mapIns.setCenter(e.target.getPosition());
      // _mapIns.setZoomAndCenter(18, e.target.getPosition(), true);
    });
    carMarker.current.moveAlong(replayPath.current, {
      // 持续时间
      duration: carSpeed,
      autoRotation: true,
    });
  };
  const queryCar = () => {
    const { _AMap, _mapIns } = window || {};

    _AMap.plugin("AMap.MoveAnimation", () => {
      if (!_mapIns || !_AMap) return;

      if (carMarker.current) {
        carMarker.current.stopMove();
        _mapIns.remove(carMarker.current);
      }
      if (carLine.current) {
        replayPath.current = [];
        _mapIns.remove(carLine.current);
      }
      const markerInfo = { lng: lineArr[0].lng, lat: lineArr[0].lat };
      carMarker.current = createCar(_mapIns, _AMap, markerInfo);

      //计算需要回放的GPS路径
      for (var i = playbackStart; i < lineArr.length; i++) {
        replayPath.current.push(
          new _AMap.LngLat(lineArr[i].lng, lineArr[i].lat)
        );
      }
      carLine.current = createLine(_mapIns, _AMap, replayPath.current);
      // 地图自适应缩放
      _mapIns.setFitView();
    });
  };
  const progressSlider = (e) => {
    const { _mapIns } = window || {};
    const temp = replayPath.current.slice(e);
    carMarker.current.setPosition(temp[0]);

    _mapIns.setCenter(temp[0], true);
    carMarker.current.moveAlong(temp, {
      duration: carSpeed,
      autoRotation: true,
    });
  };
  const drawPoint = () => {
    const { _AMap, _mapIns } = window || {};
    createMarkersInfo(_mapIns, _AMap, lineArr);
    // 地图自适应缩放
    _mapIns.setFitView();
  };
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="operation">
        {/* 速度条 */}
        <Progress className="pro" percent={multiple * 10} />
        <Slider
          className="pro"
          value={playbackProgress}
          max={200}
          onChange={progressSlider}
        />
        {/* 进度条 */}
        {/* <Progress className="pro" percent={playbackProgress} /> */}
        <Button onClick={queryCar}>查询</Button>
        <Button onClick={playCar}>回放</Button>
        <Button
          onClick={() => {
            carMarker.current?.pauseMove();
          }}
        >
          暂停
        </Button>
        <Button
          onClick={() => {
            carMarker.current?.resumeMove();
          }}
        >
          继续
        </Button>
        <Button onClick={drawPoint}>画点</Button>
      </div>
      <Amap trackPlayBackStore={trackPlaBackStore}></Amap>
    </div>
  );
};

export default observer(TrackPlayback);
