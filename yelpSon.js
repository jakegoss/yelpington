fetch('mr-Mikes.json')
    .then(function (response) {
        response.text().then((s) => console.log(s));
    });

fetch('mr-Mikes.json')
    .then(function (response) {
        return response.text();
    })
    .then(function (myText) {
        console.log(myText);
    });


let params = new URLSearchParams(document.location.search.slice(1));
let name = params.get("name");