
map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());
epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
var lonLat = new OpenLayers.LonLat(-73.2125066115683, 44.4778504937817).transform(epsg4326, projectTo);
var zoom = 14;
map.setCenter(lonLat, zoom);
var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

// Define markers as "features" of the vector layer:



for (i = 0; i < filelist.length; i++) {


    fetch(filelist[i])
        .then(function (response) {
            myRestaurant = response
            console.log(response)
            return response.text();
        })
        .then(function (myText) {
            // console.log(myText);
            var js_object = JSON.parse(myText);
            console.log(js_object)


            spaceRegex = /\s/g
            urlAddressString = js_object["address"].replace(spaceRegex, "%20")
            fetchMapString = "https://nominatim.openstreetmap.org/search/?q=" + urlAddressString + "&format=json"


            console.log("Fetched JSON in MAP is " + fetchMapString)

            fetch(fetchMapString)
                .then(function (response) {
                    myRestaurant = response
                    console.log(response)
                    return response.text();
                }).then(function (myMapSon) {

                    var js_MapObject = JSON.parse(myMapSon);
                    console.log("js-object is in MAP is...");
                    console.log("name is " + js_object["name"])
                    console.log(js_MapObject);
                    let longitude = js_MapObject[0]["lon"]
                    let latitude = js_MapObject[0]["lat"]




                    var feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Point(longitude, latitude).transform(epsg4326, projectTo),
                        { description: "'" + js_object["name"] + "'" },
                        { externalGraphic: 'img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
                    );

                    vectorLayer.addFeatures(feature);
                })
        })
}

map.addLayer(vectorLayer);


//Add a selector control to the vectorLayer with popup functions
var controls = {
    selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
};

function createPopup(feature) {
    feature.popup = new OpenLayers.Popup.FramedCloud("pop",
        feature.geometry.getBounds().getCenterLonLat(),
        null,
        '<div class="markerContent"' + ' href= /?name=mr-mikes style=text-decoration: none>' + '<a' + ' href= /?name=mr-mikes >' + feature.attributes.description + '</a>' +'</div>',
        null,
        true,
        function () { controls['selector'].unselectAll(); }
    );
    //feature.popup.closeOnMove = true;
    map.addPopup(feature.popup);
}

function destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
}

map.addControl(controls['selector']);
controls['selector'].activate();
reset: true



