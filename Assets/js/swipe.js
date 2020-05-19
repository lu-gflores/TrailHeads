$(document).ready(function () {
  $("nav").hide();
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
  function generateExplorer() {
  }
  //saved trails
  function generateSaved() {
  }
  // ----hiking project API
  function getTrails(a, b, distance, weather){
      $.ajax({
          url: "https://www.hikingproject.com/data/get-trails?lat=" + a + "&lon=" + b +"&maxDistance=" + distance + "&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
          method: 'GET'
      }).then(function(response){
          console.log(response)
         //for loop?
          $('#trail1').attr('src',response.trails[0].imgSmallMed)
          $('#trail2').attr('src',response.trails[1].imgSmallMed)
          $('#trail3').attr('src',response.trails[2].imgSmallMed)
          $('#trail4').attr('src',response.trails[3].imgSmallMed)
          $('#trail5').attr('src',response.trails[4].imgSmallMed)
           //div row, may not be needed for swipe
           var divRow = $("<div>").addClass("flex flex-row justify-around my-16");
           $("#container").append(divRow);//added id in html
           var shadowElement = $("<div>").addClass("max-w-sm rounded overflow-hidden shadow-lg");
          $(divRow).append(shadowElement);
          var cardsArray = [];//store cards generated
          //append results to cards/create new variables, subject to change.    
         for (var i = 0; i < response.trails.length; i++){
          var newCard = $("<div>").addClass("container flex flex-col items-center w-64 my-4");//trail card
          divRow.append(newCard);
          //image 
          var imgTag = $("<img>").addClass("w-full overflow-hidden h-64 overflow-hidden").attr("src", response.trails[i].imgSmallMed);
          newCard.append(imgTag);
          var cardBackground =  $("<div>").addClass("px-4 py-4 bg-white");
          //Trail Name
          var trailName = $("<h1>").addClass("text-xl font-bold").text(response.trails[i].name);
          newCard.append(trailName);
          //div sub-container for summary paragraph
           var divH = $("<div>").addClass("h-48");
          //summary paragraph
          var trailInfo = $("<p>").text(response.trails[i].summary);
          divH.append(trailName, trailInfo);
          cardBackground.append(divH);
          newCard.append(cardBackground);
          cardsArray.push(newCard);
          // console.log(cardsArray);
         }
      })
  }
  //search event listener, changing certain elements to ids soon
  var savedPages =  JSON.parse(localStorage.getItem("searches")) || []; //may put this in a function to load saved pages

  $(".search-btn").on("click", function(event) {
    event.preventDefault();
    if($(this).siblings('.cityNameInput').val().trim()) {
      $("nav").show();
      $("#introFormDiv").hide();
      var searchInputCity = $(this).siblings('.cityNameInput').val().trim();
      var searchInputDistance = parseInt($(this).siblings('.cityDistanceInput').val().trim()) || 10;
      $(this).siblings('.cityNameInput').val("");
      $(this).siblings('.cityDistanceInput').val("");
      savedPages.push(searchInputCity);
      //localStorage.setItem("searches").JSON.stringify(savedPages);
      cityLocation(searchInputCity, searchInputDistance);//passing user input to cityLocation
      //getTrails()
    }
  })
// ----Weather API for retrieving longitude and latitude and pass to hiking project api
function cityLocation(cityName, cityDistance) {
  var locationAPIKey = "&appid=0888bb26c1d027c60cb2417244156801";
  var locationURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityName + locationAPIKey;
  $.ajax ({
      url: locationURL,
      method: "GET"
  }).then(function(response) {
      var long = response.coord.lon;
      var lat = response.coord.lat;
      var temp = Math.round(response.main.temp)
      console.log(lat);
      console.log(long);
      console.log(temp);
      //not needed for now, only need to pass lat & long
      /*
      var divEl = $("<div>").addClass("coordinates")
      var locationLon = $("<p>").text("Longitude: " + long);
      var locationLat = $("<p>").text("Latitude: " + lat);
      divEl.append(locationLon, locationLat);
      */
      getTrails(lat, long, cityDistance, temp); //passing longitude and latitude parameters to get trail results
  })
}   
  //cityLocation("Charlotte");

  //If you click on the logo do another search
  $(".logo").on("click", function() {
    $("nav").hide();
    $("#introFormDiv").show();
  })
  //When you click on a map icon it reads the data-name attribute and opens a window with a google map to that place
  $(document).on("click", ".mapIcon", function() {
    var place = $(this).attr("data-name").replace(" ", "+");
    window.open("https://www.google.com/maps/search/?api=1&query=" + place)
  })
})