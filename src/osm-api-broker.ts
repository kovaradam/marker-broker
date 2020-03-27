const fetch = require("node-fetch");
import createMarkersFromResponse from "./marker-extractor";

/**
 * @param bound Bounding box: 'bottom,left,top,right'
 * @param types Type filters: ['type', 'instance'][]
 */
export default function fetchMarkers(bound: string, ...types: [string, string][]) {

  return fetch(url(bound, ...types), {
    method: "GET"
  })
    .then((res: any) => {
      return res.json();
    })
    .then((json: any) => {
      return createMarkersFromResponse(json);
    })
    .catch((e: any) => console.log(e));
}

function url(bound: string, ...types: [string, string][]): string {
  let typesQuery = "";
  types.forEach(t => (typesQuery += `way[${t[0]}=${t[1]}](${bound});`));
  return `https://overpass-api.de/api/interpreter?data=[out:json];(${typesQuery});out body;>;out skel qt;`;
}
