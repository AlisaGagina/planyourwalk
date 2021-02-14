

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
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25539, -123.1982),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25747, -123.19252),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.2525, -123.19907),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25725, -123.23011),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25872, -123.23089),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25784, -123.23094),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25682, -123.23149),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.2579, -123.23463),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.25666, -123.23468),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(49.256988, -123.23364),
        type: "fountain",
      },
      {
        position: new google.maps.LatLng(
          49.25662347903106,
          -123.19879464019775
        ),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(
          49.256365282092855,
          -123.19937399734496
        ),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(49.25665018901448, -123.1982474695587),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(
          49.259543720969806,
          -123.23112279762267
        ),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(
          49.25608037421864,
          -123.23288232673644
        ),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(49.25851096325805, -123.2344058214569),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(49.25818154739766, -123.2346203981781),
        type: "washroom",
      },
      {
        position: new google.maps.LatLng(
          49.25727341958453,
          -123.23348314155578
        ),
        type: "dogpark",
      },
    ];

    const markers = [];
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // Create markers.
    const styleControl = document.getElementById("style-selector-control");
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);
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
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
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
      const marker = new google.maps.Marker({
        position: features[i].position,
        map: map,
        visible: true,
        type: features[i].type,
        icon: getColour(features[i].type),
      });
      markers[i] = marker;
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
          if (checked) {
            marker.setVisible(true);
          } else {
            marker.setVisible(false);
          }
        }
      }
      showSubFilters(category, checked);
    };

    filterFountainMarkers= function (category, checked){

    }
  }
  


