$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: '2',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        }
    })



    function getTrails(a, b){

        $.ajax({
            url: "https://www.hikingproject.com/data/get-trails?lat=" + a + "&lon=" + b +"&maxDistance=10&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
            method: 'GET'
        }).then(function(response){
            console.log(response.trails[0])
            $('#trail1').attr('src',response.trails[0].imgSmallMed)
            $('#trail2').attr('src',response.trails[1].imgSmallMed)
            $('#trail3').attr('src',response.trails[2].imgSmallMed)
            $('#trail4').attr('src',response.trails[3].imgSmallMed)
            $('#trail5').attr('src',response.trails[4].imgSmallMed)
            
    })
    }




// ----Weather API for retrieving longitude and latitude
// var lat = "";
// var long = "";
function cityLocation(cityName) {

    var locationAPIKey = "&appid=0888bb26c1d027c60cb2417244156801";
    var locationURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + locationAPIKey;
    $.ajax ({
        url: locationURL,
        method: "GET"
    }).then(function(response) {
       
        var long = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lat)

        var divEl = $("<div>").addClass("coordinates")
        var locationLon = $("<p>").text("Longitude: " + long);
        var locationLat = $("<p>").text("Latitude: " + lat);
    
        divEl.append(locationLon, locationLat);
        getTrails(lat, long);
    })
}   

    cityLocation("Charlotte")
})