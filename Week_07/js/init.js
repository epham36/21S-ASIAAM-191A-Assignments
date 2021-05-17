const map = L.map('map').setView([34.0709, -118.444], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1XDlSWXVZF9LRWCR9GgQYeScnMdncnKlY0TX7wwOtxdg/ofjqb6j/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)  
        certifiedChef.addTo(map) // add our layers after markers have been made
        sorryChef.addTo(map) // add our layers after markers have been made  
        let allLayers = L.featureGroup([certifiedChef,sorryChef]);
        map.fitBounds(allLayers.getBounds());      
}

// function addMarker(data){
//         // console.log(data)
//         // these are the names of our lat/long fields in the google sheets:
//         L.marker([data.lat,data.lng]).addTo(map).bindPopup(data.whatisatraveldestinationyourememberfondly +"<br>" + 'Yummy food here: ' + data.whatwasthebestfoodyouhadthere)
//         // adding our create button function
//         createButtons(data.lat,data.lng,data.whatisatraveldestinationyourememberfondly)
//         return data.timestamp
// }

let certifiedChef = L.featureGroup();
let sorryChef = L.featureGroup();

let circleOptions = {
  radius: 4,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

function addMarker(data){
  if(data.doyouknowhowtomakethatfood == "Yes"){
    circleOptions.fillColor = "white" 
    // let circleOptions.fillColor = "green" 
    certifiedChef.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup('Certified Chef!' + "<br>" + data.whatisatraveldestinationyourememberfondly +"<br>" + 'Yummy food here: ' + data.whatwasthebestfoodyouhadthere)) 
      createButtons(data.lat,data.lng,data.whatisatraveldestinationyourememberfondly)
  }
  else{
    circleOptions.fillColor = "black"
    sorryChef.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup('Sorry Chef, No Can Do' + "<br>" + data.whatisatraveldestinationyourememberfondly +"<br>" + 'Yummy food here: ' + data.whatwasthebestfoodyouhadthere)) 
      createButtons(data.lat,data.lng,data.whatisatraveldestinationyourememberfondly)   
      // Bonus:    
      // speakOtherLanguage += 1
  }
  return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

let layers = {
	"I know how to make this dish!": certifiedChef,
	"I don't know how to make this dish :(": sorryChef
}
L.control.layers(null,layers).addTo(map)
