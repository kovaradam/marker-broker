import MyHashMap from "./utils/hash-map";
import Marker from "./utils/marker";
import OSMWay, {
  OSMresponse,
  OSMItem,
  OSMNode,
  location,
  OSMRelevantTags
} from "./utils/osm-utils";

export default function createMarkersFromResponse(data: OSMresponse) {
  const ways = [] as OSMWay[];
  const map = splitData(data.elements, ways);
  const markers = buildMarkes(ways, map);
  console.log(map.stats);
  return markers;
}

function splitData(data: OSMItem[], ways: OSMWay[]) {
  let i = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i].type! === "way") {
      ways.push(data[i] as OSMWay);
    } else {
      break;
    }
  }

  const hashMap = new MyHashMap(data.length - i);
  for (; i < data.length; i++) {
    hashMap.insert(data[i] as OSMNode);
  }
  return hashMap;
}

function buildMarkes(ways: OSMWay[], hashMap: MyHashMap) {
  const ret: Marker[] = [];
  ways.forEach(w => {
    const marker = new Marker(w.id);
    let latSum = 0;
    let lonSum = 0;
    w.nodes.forEach(id => {
      const node = hashMap.get(id);
      marker.polygon.push({ lat: node.lat, lon: node.lon });
      latSum += node.lat;
      lonSum += node.lon;
    });
    const { lat, lon } = getCoordsFromPolygon(latSum, lonSum, w.nodes.length);
    marker.lat = lat;
    marker.lon = lon;
    marker.area = getPolygonArea(marker.polygon);
    OSMRelevantTags.forEach(tag => {
      (marker as any)[tag] = (w.tags as any)[tag] || "";
    });
    ret.push(marker);
  });
  return ret;
}

function getPolygonArea(polygon: location[]) {
  let sum = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    sum += a.lat * b.lon - a.lon * b.lat;
  }
  return Math.abs(sum / 2);
}

function getCoordsFromPolygon(latSum: number, lonSum: number, count: number) {
  const lat = latSum / count;
  const lon = lonSum / count;
  return { lat, lon };
}
