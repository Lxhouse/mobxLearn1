// 创建地图
export const createMap = (dom, AMap, option) => {
  if (!dom || !AMap) return;
  return new AMap.Map(dom, {
    // zoom: 12,
    pitch: 60,
    doubleClickZoom: false,
    center: [123.390381, 41.929537],
    mapStyle: "amap://styles/24e5c77d4e3a7bc131df1b6dbafde743",
    ...option,
  });
};

// 创建车车
export const createCar = (map, AMap, markerInfo) => {
  if (!map || !AMap) return;
  return new AMap.Marker({
    map: map,
    position: [markerInfo.lng, markerInfo.lat],
    icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
    offset: new AMap.Pixel(-13, -26),
  });
};

// 绘制轨迹
export const createLine = (map, AMap, lineArr) => {
  if (!map || !AMap) return;
  return new AMap.Polyline({
    map: map,
    path: lineArr,
    showDir: true,
    strokeColor: "#28F", //线颜色
    // strokeOpacity: 1,     //线透明度
    strokeWeight: 6, //线宽
    // strokeStyle: "solid"  //线样式
  });
};

/**绘制海量点 */
export const createMarkersInfo = (map, AMap, pointArr) => {
  debugger;
  if (!map || !AMap) return;
  /**点的数据 */
  const markers = [],
    infoList = [];
  pointArr.forEach((position) => {
    //TODO 根据属性给图标
    const icon = {
      type: "image",
      image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      size: [6, 9],
      anchor: "bottom-center",
    };
    markers.push(
      new AMap.LabelMarker({ position: [position.lng, position.lat], icon })
    );
    /**信息数据的数据 */
    const infoItem = new AMap.Marker({
      anchor: "center",
      bubble: true,
      offset: new AMap.Pixel(0, -30),
      content: "这个是测试的文本",
      position: position,
    });
    infoList.push(infoItem);
  });
  console.log(123321, markers, infoList);
  //把点加上去
  const _labelsLayer = new AMap.LabelsLayer({
    zooms: [3, 20],
    collision: false,
  });
  // 将图层添加到地图
  map.add(_labelsLayer);
  _labelsLayer.add(markers);
  map.setFitView();
  //把信息框加上去
  const _overlayGroup = new AMap.OverlayGroup(infoList);
  map.add(_overlayGroup);
  // 地图自适应缩放

  return { labelsLayer: _labelsLayer, overlayGroup: _overlayGroup };
};
