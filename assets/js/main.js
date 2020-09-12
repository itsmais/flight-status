function checkFlight(){
    
    // Flight info
    let flightCode = document.getElementById("flight-code").value.toLowerCase();
    let flightResult = document.getElementById("flight-result");
    
    // time in unix format
    let currentTime = (new Date()).getTime();
    flightResult.innerHTML= "";

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=8c94279a-6bb5-4aae-92fa-864bcd13cb06");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let url ="http://api.aviationstack.com/v1/flights?access_key=3f73b3a87c3e6b9b0f64a9e98cfdd01b&flight_icao="+flightCode;
    console.log(url);
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        var jsonObj = JSON.parse(result);
        console.log(jsonObj);

        let flightDate = jsonObj["data"][0]["flight_date"];
        let flightStatus = jsonObj["data"][0]["flight_status"]; // toTimestamp(jsonObj["states"][0][4]); // .toLocaleDateString("en-US");
        let airlineName = jsonObj["data"][0]["airline"]["name"];

        // Departure info
        let departureAirport = jsonObj["data"][0]["departure"]["airport"];
        let departureTimeEstimated = jsonObj["data"][0]["departure"]["estimated"];
        
        // Arrival info
        let arrivalAirport = jsonObj["data"][0]["arrival"]["airport"];
        let arrivalTimeEstimated = jsonObj["data"][0]["arrival"]["estimated"];

        flightResult.innerHTML += ("</br> <span class=\"bold-title\">flight date: </span>" + flightDate + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">flight status: </span>" + flightStatus + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">airline name: </span>" + airlineName + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">departure airport: </span>" + departureAirport + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">estimated departure time: </span>" + departureTimeEstimated + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">arrival airport: </span>" + arrivalAirport + "</br>");
        flightResult.innerHTML += ("<span class=\"bold-title\">estimated arrival time: </span>" + arrivalTimeEstimated + "</br>");

    })
    .catch(error => 
        {
            console.log('error', error)
        });
}
