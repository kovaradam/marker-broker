export default class Marker {
    constructor(
      public id: number,
      public name = "",
      public website = "",
      public opening_hours = "",
      public area = 0,
      public lon = 0,
      public lat = 0,
      public polygon: { lat: number, lon: number }[] = [],
    ) {}
  
  }
  