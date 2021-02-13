

  let map;
  
  /**
   * Function to init map
   */
  
  function initMap() {
      var center = new google.maps.LatLng(49.2578263,  -123.1939435);
      var mapOptions = {
          zoom: 12,
          center: center,
          mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      const features = [
        {
          position: new google.maps.LatLng(49.25721, -123.1963),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25539, -123.1982),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25747, -123.19252),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.2525, -123.19907),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25725, -123.23011),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25872, -123.23089),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25784, -123.23094),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25682, -123.23149),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.2579, -123.23463),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25666, -123.23468),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.256988, -123.23364),
          type: "info",
        },
        {
          position: new google.maps.LatLng(49.25662347903106, -123.19879464019775),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.256365282092855, -123.19937399734496),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.25665018901448, -123.1982474695587),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.259543720969806, -123.23112279762267),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.25608037421864, -123.23288232673644),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.25851096325805, -123.2344058214569),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.25818154739766, -123.2346203981781),
          type: "parking",
        },
        {
          position: new google.maps.LatLng(49.25727341958453, -123.23348314155578),
          type: "library",
        },
      ];
    
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // Create markers.
        for (let i = 0; i < features.length; i++) {
            const marker = new google.maps.Marker({
            position: features[i].position,
            map: map,
            });
        }

  }
  

  
  /**
   * Function to filter markers by category
   */
  
  filterMarkers = function (category) {
      for (i = 0; i < gmarkers1.length; i++) {
          marker = gmarkers1[i];
          // If is same category or category not picked
          if (marker.category == category || category.length === 0) {
              marker.setVisible(true);
          }
          // Categories don't match 
          else {
              marker.setVisible(false);
          }
      }
  }
  
