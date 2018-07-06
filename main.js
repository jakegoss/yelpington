var filelist = [
    'asiana-noodle-house.json',
    'august-first.json',
    'church-street-tavern.json',
    'city-market.json',
    'mr-mikes.json',
    'new-moon.json'
];
var extension = 'json';
let body = document.querySelector("body")


printJSONs(filelist)

function printJSONs(filelist) {

    var x = filelist.filter(function (file) {
        return file.indexOf(extension) !== -1;
    });
    console.log(x);

    for (i = 0; i < x.length; i++) {
        x[i] = x[i].replace(".json", "")
        let htmlString = "<p id='title' onclick= " + "clickRestaurant(" + "'" + x[i] + "'" + ")>" + x[i] + "</p>"
        console.log(htmlString)
        body.innerHTML += htmlString
    }
}



let myRestaurant
params = new URLSearchParams(document.location.search.slice(1));
let name = params.get("name");

console.log("params is " + params)
console.log("name is " + name)

if (params != "") {
    populateCity(name)
}


function clickRestaurant(restName) {
    console.log("Rest name passed from Button is " + restName)
    populateCity(restName)
}

function populateCity(name) {
    fetch(name + '.json')
        .then(function (response) {
            myRestaurant = response
            console.log(response)
            return response.text();
        })
        .then(function (myText) {
            // console.log(myText);
            var js_object = JSON.parse(myText);
            console.log(js_object)

            let body = document.querySelector("body")
            let markedJSON
            let innerString = ""
            body.innerHTML = "<div><a href=" + "/" + ">HOME</a></div>"
            body.innerHTML += "<p id='title'>" + js_object["name"] + "</p>"
            body.innerHTML += "<p id='address'>" + js_object["address"] + "</p>"
            body.innerHTML += "<p id='phone'>" + js_object["phone number"] + "</p>"
            body.innerHTML += "<p id='hours'>" + js_object["hours"] + "</p>"
            body.innerHTML += "<p id='website'>" + js_object["website"] + "</p>"

            markedJSON = marked(js_object["notes"].toString())
            body.innerHTML += "<p id='notes'>" + markedJSON + "</p>"

            spaceRegex = /\s/g
            urlAddressString = js_object["address"].replace(spaceRegex, "%20")
            fetchMapString = "https://nominatim.openstreetmap.org/search/?q=" + urlAddressString + "&format=json"


            console.log("Fetched JSON is " + fetchMapString)

            fetch(fetchMapString)
                .then(function (response) {
                    myRestaurant = response
                    console.log(response)
                    return response.text();
                }).then(function (myMapSon) {

                    var js_object = JSON.parse(myMapSon);
                    console.log("js-object is...");
                    console.log(js_object);
                    let left = js_object[0]["boundingbox"][0]
                    let bottom = js_object[0]["boundingbox"][1]
                    let right = js_object[0]["boundingbox"][2]
                    let top = js_object[0]["boundingbox"][3]

                    console.log(right, bottom, top, left)
                    body.innerHTML += "<iframe id='inlineFrameExample' title='Inline Frame Example'width='300' height='200'src=https://www.openstreetmap.org/export/embed.html?bbox=" + right + "," + bottom + "," + top + "," + left + "&layer=mapnik></iframe>"
                })




        });
}


