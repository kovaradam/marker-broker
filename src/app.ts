import fetchMarkers from './osm-api-broker'

fetchMarkers('49.99,14.94,50.27,15.05',  ['shop', 'mall'], ['shop', 'supermarket']).
then((markers:any)=>console.log(markers))


