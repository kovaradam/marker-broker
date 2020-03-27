import fetchMarkers from './osm-api-broker'

// Print shops of type 'mall' and 'supermarket' bounded by 49.99,14.94,50.27,15.05
fetchMarkers('49.99,14.94,50.27,15.05',  ['shop', 'mall'], ['shop', 'supermarket']).
then((markers:any)=>console.log(markers))


