

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

    
    const features = [
      {
        lat:49.25721, lng :-123.1963,
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        lat:49.25711, lng :-123.263,
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        lat:49.45721, lng :-123.3963,
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        lat:48.45721, lng :-124.3963,
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        lat:48.45721, lng :-124.3963,
        type: "fountain", category:{in_operation:"na", pet_friendly:'yes'},
      },
      {
        lat:49.1358, lng :-123.9963,
        type: "fountain", category:{in_operation:"na", pet_friendly:'yes'},
      },
      {
        lat:48.3268, lng :-123.0963,
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'yes'}
      },
      {
        lat:49.135, lng :-123.93,
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'no'}
      },
      {
        lat:49.36, lng :-123.93,
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'yes'}
      },
      {
        lat:49.3467, lng :-123.93,
        type: "fountain", category:{in_operation:"may-october", pet_friendly:'no'}
      },
      {
        lat:49.124, lng :-123.93,
        type: "fountain", category:{in_operation:"may-october", pet_friendly:'yes'}
      },
      {
        lat:49.3416, lng :-122.93,
        type: "washroom",  category:{hours:"na"},
      },
      {
        lat:49.5641, lng :-123.96,
        type: "washroom", category:{hours:"na"},
      },
      {
        lat:49.32131, lng :-123.99,
        type: "washroom", category:{hours:"na"},
      },
      {
        lat:49.34251, lng :-123.98,
        type: "washroom", category:{hours:"na"},
      },
      {
        lat:49.3821, lng :-123.97,
        type: "washroom", category:{hours:"na"},
      },
      {
        lat:49.3731, lng :-123.93,
        type: "washroom", category:{hours:"na"},
      },
      {
        lat:49.3722, lng :-123.92,
        type: "washroom", category:{hours:"24hrs"},
      },
      {
        coords: [
            { lat: 49.25608, lng: -123.23 },
            { lat: 49.24607, lng:-123.24 },
            { lat: 49.25606, lng: -123.13 },
          ],
        type: "dogpark", category:{},
      },
    ];

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
            "https://cdn.iconscout.com/icon/free/png-256/water-glass-1440342-1216076.png",
          scaledSize: new google.maps.Size(25, 25), // scaled size
        };
      } else if (category == "washroom") {
        return {
          url: "https://img.icons8.com/pastel-glyph/2x/toilet.png",
          scaledSize: new google.maps.Size(25, 25), // scaled size
        };
      } else if (category == "dogpark") {
        return {
          url: "https://cdn.iconscout.com/icon/free/png-256/paw-29-459421.png",
          scaledSize: new google.maps.Size(25, 25), // scaled size
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
        strokeColor: "#F86464",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F86464",
        fillOpacity: 0.35,
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
  


