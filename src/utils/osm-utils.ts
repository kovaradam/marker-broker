export type OSMresponse = {
  version: number;
  generator: string;
  osm3s: {};
  elements: OSMItem[];
};

export type OSMItem = { type: "node" | "way"; id: number };

export type location = { lat: number; lon: number };

export const OSMRelevantTags = ["name", "website", "opening_hours"];

export class OSMNode {
  constructor(
    public type = "node",
    public id: number,
    public lat: number,
    public lon: number
  ) {}
}

export default class OSMWay {
  constructor(
    public type = "way",
    public id: number,
    public nodes: number[],
    public tags: {}
  ) {}
}
