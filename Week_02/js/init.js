// JavaScript const variable declaration
const map = L.map('map').setView([37.338, -121.886], 5);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let markers = [
    {pos: [37.774929, -122.419418], popup: "San Brancisco"},
    {pos: [34.052235, -118.243683], popup: "Los Pangeles"},
    {pos: [37.338207, -121.886330], popup: "San Doughse"},
    {pos: [35.37113502280101, -119.03686523437], popup: "Baker's Field"},
    {pos: [33.127560521579746, -117.31879234313965], popup: "Carlsbad Flour Fields"}];
markers.forEach(function (obj) {
    let m = L.marker(obj.pos).addTo(map),
        p = new L.Popup({closeOnClick: false })
                .setContent(obj.popup)
                .setLatLng(obj.pos);
    m.bindPopup(p);
});
        


        fetch("js/lab1.geojson")
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
                        // the leaflet method for adding a geojson
            L.geoJSON(data, {
                style: function (feature) {
                    return {color: 'gray'};
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.name;
            }).addTo(map);
        });
     