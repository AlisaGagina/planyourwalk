

  let map;

  /**
   * Function to init map
   */

  function initMap() {
    var center = new google.maps.LatLng(49.2578263, -123.1939435);
    var mapOptions = {
      zoom: 16,
      center: center,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,    
    };

    

    
    const features = [
      {
        position: new google.maps.LatLng(49.25721, -123.1963),
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        position: new google.maps.LatLng(49.25539, -123.1982),
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        position: new google.maps.LatLng(49.25747, -123.19252),
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        position: new google.maps.LatLng(49.2525, -123.19907),
        type: "fountain", category:{in_operation:"na", pet_friendly:'na'},
      },
      {
        position: new google.maps.LatLng(49.25725, -123.23011),
        type: "fountain", category:{in_operation:"na", pet_friendly:'yes'},
      },
      {
        position: new google.maps.LatLng(49.25872, -123.23089),
        type: "fountain", category:{in_operation:"na", pet_friendly:'yes'},
      },
      {
        position: new google.maps.LatLng(49.25784, -123.23094),
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'yes'}
      },
      {
        position: new google.maps.LatLng(49.25682, -123.23149),
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'no'}
      },
      {
        position: new google.maps.LatLng(49.2579, -123.23463),
        type: "fountain", category:{in_operation:"yearround", pet_friendly:'yes'}
      },
      {
        position: new google.maps.LatLng(49.25666, -123.23468),
        type: "fountain", category:{in_operation:"may-october", pet_friendly:'no'}
      },
      {
        position: new google.maps.LatLng(49.256988, -123.23364),
        type: "fountain", category:{in_operation:"may-october", pet_friendly:'yes'}
      },
      {
        position: new google.maps.LatLng( 49.25662347903106, -123.19879464019775),
        type: "washroom",  category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(
          49.256365282092855,
          -123.19937399734496
        ),
        type: "washroom", category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(49.25665018901448, -123.1982474695587),
        type: "washroom", category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(
          49.259543720969806,
          -123.23112279762267
        ),
        type: "washroom", category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(
          49.25608037421864,
          -123.23288232673644
        ),
        type: "washroom", category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(49.25851096325805, -123.2344058214569),
        type: "washroom", category:{hours:"na"},
      },
      {
        position: new google.maps.LatLng(49.25818154739766, -123.2346203981781),
        type: "washroom", category:{hours:"na"},
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
        position: features[i].position,
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
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
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
  

