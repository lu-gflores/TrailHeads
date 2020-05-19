$(document).ready(function () {
  $("nav").hide();
  $(".swiper-button-next").hide();
  $(".swiper-button-prev").hide();
  $("#explorerDiv").hide();
  $("#savedPagesDiv").hide();
  
  function generateExplorer(response) {
    $(".swiper-button-next").show();
    $(".swiper-button-prev").show();
    $("#savedPagesDiv").hide();
    $("#explorerDiv").show();
    //div row, may not be needed for swipe
    var divRow = $("<div>").addClass("flex flex-row justify-around my-16");
    $("#container").append(divRow);//added id in html
    var shadowElement = $("<div>").addClass("max-w-sm rounded overflow-hidden shadow-lg");
    $(divRow).append(shadowElement);
    var cardsArray = [];//store cards generated
    //append results to cards/create new variables, subject to change.    
    for (var i = 0; i < response.trails.length; i++) {
      var divSlide = $('<div class="swiper-slide" id="slide">' + i);

      $(".swiper-wrapper").append(divSlide);
      $('#slide' + i).addClass();

      var newCard = $("<div>").addClass("container flex flex-col items-center w-64 my-4");//trail card
      divRow.append(newCard);
      //image 
      var imgTag = $("<img>").addClass("w-full overflow-hidden h-64 overflow-hidden");
      if (response.trails[i].imgSmallMed === "") {

       imgTag.attr("src", "https://via.placeholder.com/150", "alt", "no image");
      
      } else {
        imgTag.attr("src", response.trails[i].imgSmallMed , "alt", response.trails[i].name);
       
      }
      newCard.append(imgTag);
      //saved buttons
      var buttonRow = $("<div class= 'w-full h-16 bg-gray-300 flex flex-row'>")
      var buttonContainer = $('<div class="w-2/4 h-full flex justify-center items-center bg-blue-300 rounded-bl">');
      buttonRow.append(buttonContainer);
      
      var brokenHeart = $('<i class="icon fas fa-heart-broken fa-2x">');

      var container2 = $('<div class="w-2/4 h-full flex justify-center items-center bg-red-500 rounded-br">');
      container2.appendTo(buttonRow);

      var heart =$('<i class="icon fas fa-heart fa-2x">');
      container2.append(heart);
      buttonContainer.append(brokenHeart);

      var cardBackground = $("<div>").addClass("px-4 py-4 bg-white");
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
      $("#slide" + i).append(divSlide);
      
      newCard.append(buttonRow);

      divSlide.append(newCard);
      //cardsArray.push(newCard);
      
      initSwiper();
    }
  }

  function initSwiper() {
    var mySwiper = new Swiper('.swiper-container', {

      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  }


  //saved trails
  function generateSaved() {


  }
  // ----hiking project API
  function getTrails(a, b, distance, weather) {
    $.ajax({
      url: "https://www.hikingproject.com/data/get-trails?lat=" + a + "&lon=" + b + "&maxDistance=" + distance + "&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
      method: 'GET'
    }).then(function (response) {

      localStorage.setItem("currentSearch", JSON.stringify(response));
      generateExplorer(response);
    }
    )
  }
  //search event listener, changing certain elements to ids soon
  var savedPages = JSON.parse(localStorage.getItem("searches")) || []; //may put this in a function to load saved pages

  $(".search-btn").on("click", function (event) {
    event.preventDefault();
    if ($(this).siblings('.cityNameInput').val().trim()) {
      $("nav").show();
      $("#introFormDiv").hide();
      var searchInputCity = $(this).siblings('.cityNameInput').val().trim();
      var searchInputDistance = parseInt($(this).siblings('.cityDistanceInput').val().trim()) || 10;
      $(this).siblings('.cityNameInput').val("");
      $(this).siblings('.cityDistanceInput').val("");
      savedPages.push(searchInputCity);

      cityLocation(searchInputCity, searchInputDistance);//passing user input to cityLocation

    }
  })

  // ----Weather API for retrieving longitude and latitude and pass to hiking project api
  function cityLocation(cityName, cityDistance) {
    var locationAPIKey = "&appid=0888bb26c1d027c60cb2417244156801";
    var locationURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityName + locationAPIKey;
    $.ajax({
      url: locationURL,
      method: "GET"
    }).then(function (response) {
      var long = response.coord.lon;
      var lat = response.coord.lat;
      var temp = Math.round(response.main.temp)

      getTrails(lat, long, cityDistance, temp); //passing longitude and latitude parameters to get trail results
    })
  }


  //If you click on the logo do another search
  $(".logo").on("click", function () {
    $("nav").hide();
    $("#introFormDiv").show();
  })
  //When you click on a map icon it reads the data-name attribute and opens a window with a google map to that place
  $(document).on("click", ".mapIcon", function () {
    var place = $(this).attr("data-name").replace(" ", "+");
    window.open("https://www.google.com/maps/search/?api=1&query=" + place)
  })

  $(document).on("click", "#explorerNav", function() {
    $("#explorerDiv").show();
    $("#savedPagesDiv").hide();
  })

  $(document).on("click", "#savedNav", function() {
    $("#savedPagesDiv").show();
    $("#explorerDiv").hide();
  })
});