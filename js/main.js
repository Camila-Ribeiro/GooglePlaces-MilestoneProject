

var url =
"https://api.foursquare.com/v2/venues/explore?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=50&ll=48.8566, 2.3522&query=";


function getAllData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
            // console.log(typeof(xhr.responseText))
        }
    }
    xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
    };
    xhr.send();
}

function populateInspiration(places, endFunc) {
    if(places === "hotels") {
        getAllData(url + places, function(resp) {

            data = JSON.parse(resp).response.groups[0].items;            
            var list = Object.keys(data);
            endFunc(getRandomItems(list, data, places))
        });
    }
    else if (places === "restaurants") {
        getAllData(url + places, function(resp) {
            data = JSON.parse(resp).response.groups[0].items;
            var list = Object.keys(data);
            endFunc(getRandomItems(list, data, places))
        });
    }
    else if (places === "museums") {
        getAllData(url + places, function(resp) {
            data = JSON.parse(resp).response.groups[0].items;
            var list = Object.keys(data);
            getRandomItems(list, data, places)
        });
    }
      
}
//CALLING FUNCTION
populateInspiration("hotels",function(){
    populateInspiration("restaurants",function(){
        populateInspiration("museums");
    })
});


//LOOP RANDOM ITEMS - BRING PLACES PARAM IN ORDER TO GET EACH DETAILS
function getRandomItems(list, data, places) {
    for (let index = 1; index < list.length; index++) {   
        if (list.length >= 4 && index < 4) {
        var randomIndex = Math.floor(Math.random() * list.length);
        var randomObject = data[list[randomIndex]];
        
        getDetails(randomObject,index,places);
        }
    }
}

//GET DETAILS (VENUE NAME, VENUE ID)
function getDetails(obj,i,places) {
    if(places === "hotels") {
        var hotelName = document.getElementById("hotels_insp_" + i);
        hotelName.innerHTML = obj.venue.name;
    }
    else if(places === "restaurants") {
        var restName = document.getElementById("rest_insp_" + i);
        restName.innerHTML = obj.venue.name;
    }
    else if(places === "museums") {
        var museumName = document.getElementById("museum_insp_" + i);
        museumName.innerHTML = obj.venue.name;
    }
}


// getAllData(url, function(resp) {
//     var data = JSON.parse(resp).response.groups[0].items;
//     var list = Object.keys(data);
//     console.log(data)
  
//     for (let index = 1; index < list.length; index++) {
        
//         if (list.length >= 4 && index < 4) {
//         var randomIndex = Math.floor(Math.random() * list.length);
//         var randomObject = data[list[randomIndex]];
//         var hotelName = document.getElementById("hotels_insp_" + index);
//         hotelName.innerHTML = randomObject.venue.name;

//         var hotelId = randomObject.venue.id;
//         console.log(hotelId)
//         }
//     }
// });





window.addEventListener("load", function() {
//   console.log("All assets are loaded");
//     var options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0
//     };

//     function success(pos) {
//       var crd = pos.coords;

//       console.log('Your current position is:');
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//     }

//     function error(err) {
//       console.log("error")
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     navigator.geolocation.getCurrentPosition(success, error, options);
});
