

  let map;

  /**
   * Function to init map
   */

  function initMap() {
    var center = new google.maps.LatLng(49.2578263, -123.1939435);
    var mapOptions = {
      zoom: 13,
      center: center,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,    
    };

    googlify = function (lat, lng){
        return new google.maps.LatLng(lat, lng)
    }

    function getWaterData(){
        const url = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=drinking-fountains&q=&rows=1000&facet=in_operation&facet=pet_friendly&facet=geo_local_area";
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);


        var data = request.responseText;
        var obj = JSON.parse(data);

        var waterfountains = []
        
        for(i=0;i<obj.records.length;i++){
            var record = obj.records[i];
            var long = record.fields.geom.coordinates[0];
            var lat = record.fields.geom.coordinates[1];
            var type = "fountain";
            var pet_friendly = "unknown";
            var in_operation = "na";
            if ("pet_friendly" in record.fields){
                pet_friendly = record.fields.pet_friendly;
            }
            if ("in_operation" in record.fields){
                in_operation = record.fields.in_operation;
            }
            var waterfountain = {"lat": lat, "lng": long, "type": "fountain", "category":{"in_operation":in_operation, "pet_friendly": pet_friendly}}
            waterfountains.push(waterfountain);
            //console.log(waterfountain);
        }
        return waterfountains;
    }
    //

    function getWashroomData(){
        const url = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-washrooms&q=&rows=1000&facet=type&facet=summer_hours&facet=winter_hours&facet=wheel_access&facet=maintainer&facet=geo_local_area";

        console.log(url);
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);


        var data = request.responseText;
        var obj = JSON.parse(data);

        var washrooms = []
        
        for(i=0;i<obj.records.length;i++){
            var record = obj.records[i];
            var long = record.fields.geom.coordinates[0];
            var lat = record.fields.geom.coordinates[1];
            var type = "washroom";
            var hours;
            switch (record.fields.winter_hours){
                case "Dawn to Dusk":
                    hours = "Dawn to Dusk";
                    break;
                case "24 hrs":
                    hours = "24 hrs";
                    break;
                case "Closed":
                    hours = "closed";
                    break;
                default:
                    hours ="na";
            }
            var washroom = {"lat": lat, "lng": long, "type": "washroom", "category":{"hours":hours}};
            washrooms.push(washroom);
            //console.log(washroom);
        }
        //console.log(washrooms.length);
        return washrooms;
    }

    function getDogparkData(){
        const url = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=dog-off-leash-parks&q=&rows=1000&facet=geo_local_area";

        console.log(url);
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);


        var data = request.responseText;
        var obj = JSON.parse(data);

        var dogparks = []
        
        for(i=0;i<obj.records.length;i++){
            var record = obj.records[i];
            if (record.fields.geom.coordinates.length == 2){
                var coords = record.fields.geom.coordinates[1];
            }
            else{
                var coords = record.fields.geom.coordinates[0]
            }

            points = []

            for (j=0; j<coords.length; j++){
                points.push({"lat": coords[j][1], "lng": coords[j][0]});
            }

            var type = "dogpark";
            var dogpark = {"coords":points, "type": "dogpark", "category":{}};
            dogparks.push(dogpark);
            //console.log(dogpark);
        }
        //console.log("dogpark length" + dogparks.length);
        return dogparks;
    }          

    //getDogparkData();
    var features=getWaterData();
    features=features.concat(getWashroomData());
    features=features.concat(getDogparkData());

    const markers = [];
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // Create markers.
    const styleControl = document.getElementById("style-selector-control");
        map.controls.push(styleControl);
        // Apply new JSON when the user chooses to hide/show features.
        document.getElementById("hide-poi").addEventListener("click", () => {
            map.setOptions({ styles: styles["hide"] });
        });
        document.getElementById("show-poi").addEventListener("click", () => {
            map.setOptions({ styles: styles["default"] });
        });
            const styles = {
        default: [],
        hide: [
            {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.park",
                stylers: [{ visibility: "on" }],
                },
            {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
            },
        ],
        };


    getColour = function (category) {
      if (category == "fountain") {
        return {
          url:
            // "https://www.freepnglogos.com/uploads/water-drop-png/water-drop-falling-illustration-transparent-png-svg-vector-29.png",
         "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            //scaledSize: new google.maps.Size(25, 25), // scaled size
        };
      } else if (category == "washroom") {
        return {
        //   url: "https://cdn1.iconfinder.com/data/icons/tools-and-construction-2-6/65/64-512.png",
        // url:"http://planyourwalk.online.s3-website-us-east-1.amazonaws.com/toilet_pin.png",
        url:"http://maps.google.com/mapfiles/ms/icons/pink-dot.png",

         // scaledSize: new google.maps.Size(25, 25), // scaled size
        };
      } else if (category == "dogpark") {
        return {    
          url: "https://cdn.iconscout.com/icon/free/png-256/paw-29-459421.png",
          //scaledSize: new google.maps.Size(25, 25), // scaled size
        };
      }
    };



    for (let i = 0; i < features.length; i++) {
     if(features[i].type !='dogpark'){
         const marker = new google.maps.Marker({
        position: googlify(features[i].lat,features[i].lng),
        map: map,
        visible: true,
        category: features[i].category,
        type: features[i].type,
        icon: getColour(features[i].type),
      });
      markers[i] = marker;
     }else{
        const marker = new google.maps.Polygon({
         paths: features[i].coords,
         type: features[i].type,
        strokeColor: "#6A0DAD",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#6A0DAD",
        fillOpacity: 0.6,
        })
        marker.setMap(map);
        markers[i] = marker;
     }
     
      
    }


      showSubFilters = function (category, checked) {
          if (category=='fountain'){
            
            if(checked){
                document.getElementById("fountain_operation").style.display = "block";
            }else{
                document.getElementById("fountain_operation").style.display = "none";
            }
          }
          if (category=='washroom'){
            
            if(checked){
                document.getElementById("washroom_operation").style.display = "block";
            }else{
                document.getElementById("washroom_operation").style.display = "none";
            }
          }
      };


    filterMarkers = function (category, checked) {
      for (i = 0; i < markers.length; i++) {
        marker = markers[i];
        // If is same category or category not picked
        if (marker.type == category) {
          if (category != "dogpark") {
            if (checked) {
              marker.setVisible(true);
            } else {
              marker.setVisible(false);
            }
          } else {
            if (checked) {
              marker.setMap(map);
            } else {
              marker.setMap(null);
            }
          }
        }
      }
      showSubFilters(category, checked);
    };

    filterFountainMarkers= function (category, checked){
        for (i = 0; i < markers.length; i++) {
            marker = markers[i];
            // If is same category or category not picked
            if (marker.category.in_operation == category && marker.type == "fountain") {
              if (checked) {
                marker.setVisible(true);
              } else if (marker.type == "fountain" && marker.category.in_operation == category ){
                marker.setVisible(false);
              }
            }
            if (marker.category.pet_friendly == category && marker.type == "fountain") {
                if (checked) {
                  marker.setVisible(true);
                } else if (marker.category.pet_friendly == category && marker.type == "fountain"){
                  marker.setVisible(false);
                }
              }
          }
    }
    filterWashroomMarkers= function (category, checked){
        for (i = 0; i < markers.length; i++) {
            marker = markers[i];
            // If is same category or category not picked
            if (marker.category.hours == category && marker.type == "washroom") {
              if (checked) {
                marker.setVisible(true);
              } else if (marker.type == "washroom"){
                marker.setVisible(false);
              }
            }
          }
  }
  
}
  


