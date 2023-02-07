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
