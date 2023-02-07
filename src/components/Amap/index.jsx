import AMapLoader from "@amap/amap-jsapi-loader";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { createMap } from "../../tools/utils";
const Amap = ({ trackPlayBackStore }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const mapDOM = useRef(null);
  useEffect(() => {
    // initMap();
    AMapLoader.load({
      key: "e15e343ed5f952efd7899005dc60900f", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["Adaptor"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      Loca: {
        version: "2.0", // Loca 版本
      },
    }).then((AMap) => {
      window._AMap = AMap;
      const mapIns = createMap(mapDOM.current, AMap, {
        // center: [120.750865, 30.762653],
      });
      if (mapIns) {
        window._mapIns = mapIns;
        setMapInstance(mapIns);
      }
      return () => {
        if (mapInstance) mapInstance.destroy();
      };
    });
  }, []);

  return (
    <div
      id="map-container"
      ref={mapDOM}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};
export default observer(Amap);
