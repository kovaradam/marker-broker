import { OSMNode } from "./osm-utils";

export default class MyHashMap {
  private data: (OSMNode | null)[] = [];
  public missCount = 0;
  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.data.push(null);
    }
  }

  public insert = (node: OSMNode) => {
    let idx = this.hash(node.id);
    const startIdx = idx;
    while (this.data[idx] !== null) {
      idx = (idx + 1) % this.data.length;
      if (idx === startIdx) throw Error;
    }
    this.data[idx] = node;
  };

  public get = (id: number) => {
    let idx = this.hash(id);
    let result = this.data[idx];
    if (result === null) throw Error;
    while (result.id !== id) {
      this.missCount++;
      idx = (idx + 1) % this.data.length;
      result = this.data[idx];
      if (result === null) throw Error;
    }
    return result;
  };

  private hash(id: number) {
    return id % this.data.length;
  }

  get size() {
    return this.data.length
  }

  get stats(){
    return `Hashmap - size: ${this.size} missCount: ${this.missCount}`
  }
}
