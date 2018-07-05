var filelist = [
    'asiana-noodle-house.json',
    'august-first.json',
    'church-street-tavern.json',
    'city-market.json',
    'mr-mikes.json'
];
var extension = 'json';

var x = filelist.filter(function(file){
    return file.indexOf(extension) !== -1;
});
console.log(x);

let body = document.querySelector("body")

for (i = 0; i < x.length; i++) {
    x[i] = x[i].replace(".json", "")
    body.innerHTML += "<p id='title' onclick='clickRestaurant("+ x[i] + ")'>" + x[i] + "</p>"
}


//-------------

