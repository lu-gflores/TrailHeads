$(document).ready(function () {
  $("nav").hide();
  $(".swiper-button-next").hide();
  $(".swiper-button-prev").hide();
  $("#explorerDiv").hide();
  $("#savedPagesDiv").hide();
  var savedTrails; //saved array of trails 
  var hasSearched = false; //Have you searched once

  //If there are saved trails show the saved page or just start an empty array
  if(localStorage.getItem("trails")) {
    $("nav").show();
    $("#introFormDiv").hide();
    $("#savedPagesDiv").show();
    $("#explorerDiv").hide();
    $("#container").empty();
    savedTrails = localStorage.getItem("trails").split(",");
    generateSaved();
  } else {
    savedTrails = [];
  }

  function generateExplorer(response) {
    $(".swiper-wrapper").empty();
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

      var container2 = $('<div class="w-full h-full flex justify-center items-center bg-red-500 rounded-br saveMaryPoppins">');
      container2.appendTo(buttonRow);
      
      var heart =$('<i class="icon fas fa-heart fa-2x">');
      container2.attr("data-id", response.trails[i].id).append(heart);

      var cardBackground = $("<div>").addClass("px-4 py-4 bg-white");
      //Trail Name
      var trailName = $("<h1>").addClass("cardTitle text-xl font-bold").text(response.trails[i].name);
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
    $("#container").empty();
    $.ajax ( {
      url: "https://www.hikingproject.com/data/get-trails-by-id?ids="+ localStorage.getItem("trails") +"&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
      method: 'GET'
    }).then (function(response){
      // For debugging purposes - uncomment out if you want to see the underlying data
      //console.log(getStorage);
      
      // We haven't set any favorites yet. Tell them to go do that!
      if (localStorage.getItem("trails") === null)
      {
        var h1El = $("<h1>");
        h1El.html("<br>No favorite trails found. Click <a href='#index.html'><u>here</u></a> to go find some!");
        h1El.attr("class", "text-center text-3xl");
        $("#container").append(h1El);
        return;
      }
  
      // We have favorite data. Time to parse it out!
      $.each (response.trails, function(i) {

        // For debugging purposes - uncomment out if you want to see the underlying data
        //console.log($(this));
        console.log(response)
        // Step 1: Create a new div containing the entire card
        var masterCard = $("<div>").addClass("container flex flex-col items-center w-64 my-4 mx-auto");
        var newCard = $("<div>");
        newCard.attr("class", "max-w-sm rounded overflow-hidden shadow-lg mx-auto");
  
        // Step 2: Pull the stored image
        var newIconmg = $("<img>");
        newIconmg.attr("class", "w-full");
        newIconmg.attr("id", response.trails[i].url);

        if (response.trails[i].imgSmallMed === "") {
          newIconmg.attr("src", "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
          newIconmg.attr("alt", "Placeholder image");
          newIconmg.attr("class", "w-full overflow-hidden h-64 overflow-hidden rounded-t");
        }
        else {
          newIconmg.attr("src", response.trails[i].imgSmallMed);
          newIconmg.attr("alt", response.trails[i].location);
          newIconmg.attr("class", "w-full overflow-hidden h-64 overflow-hidden rounded-t");
        }
  
        // Step 3: Create a new div to contain everything else
        var newContents = $("<div>");
        newContents.attr("class", "max-w-sm rounded overflow-hidden shadow-lg");

        var textDiv = $("<div>");
        textDiv.addClass("px-6 py-4 bg-white");
  
        // Step 4: Create another new div to first contain the location
        var newLocation = $("<div>");
        newLocation.attr("class", "text-xl font-bold");
        newLocation.text(response.trails[i].name);
  
        // Step 5: Create a new p for summary
        var newSummary = $("<p>");
        newSummary.text(response.trails[i].summary);
        newSummary.attr("class", "text-gray-700 text-base");
  
        // Step 6: Create a new span for trail difficulty
        var newDifficulty = $("<span>");
        newDifficulty.attr("class", "inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 my-1");
        newDifficulty.text("Difficulty: " + response.trails[i].difficulty.charAt(0).toUpperCase() + response.trails[i].difficulty.substr(1));

        // Step 7: Create yet another div to contain the buttons to delete a favorite or map the trail
        var newRow = $("<div>");
        newRow.attr("class", "w-full h-16 bg-gray-300 flex flex-row");
  
        // Step 8: Create a div within containing the unheart button
        var newButton = $("<div>");
        newButton.attr("class", "removeSaveBtn w-2/4 h-full flex justify-center items-center bg-blue-300 rounded-bl");
        newButton.attr("data-id", response.trails[i].id);
  
        var newIcon = $("<i>");
        newIcon.attr("class", "icon fas fa-heart-broken fa-2x");
  
        // Step 9: Create another div within containing the map button
        var newMapButton = $("<div>");
        newMapButton.attr("class", "w-2/4 h-full flex justify-center items-center bg-green-500 rounded-br");
        
        var newMapIcon = $("<i>");
        newMapIcon.attr("class", "mapIcon icon fas fa-map fa-2x");
        newMapIcon.attr("data-name", response.trails[i].name)
  
        // Final step: bring it all together
        $(newCard).append(newIconmg);
        $(textDiv).append(newLocation);
        $(textDiv).append(newSummary);
        $(textDiv).append(newDifficulty);
        $(newContents).append(textDiv);
        $(newContents).append(newRow);
        $(newButton).append(newIcon);
        $(newRow).append(newButton);
        $(newMapButton).append(newMapIcon);
        $(newRow).append(newMapButton);
        $(newCard).append(newContents);
        $(masterCard).append(newCard);
        $("#container").append(masterCard);
        
    })
  })
  }

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

  // ----hiking project API
  function getTrails(a, b, distance) {
    $.ajax({
      url: "https://www.hikingproject.com/data/get-trails?lat=" + a + "&lon=" + b + "&maxDistance=" + distance + "&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
      method: 'GET'
    }).then(function (response) {

      // localStorage.setItem("currentSearch", JSON.stringify(response));
      generateExplorer(response);
    }
    )
  }

  //search event listener, changing certain elements to ids soon
  $(".search-btn").on("click", function (event) {
    event.preventDefault();
    if ($(this).siblings('.cityNameInput').val().trim()) {
      hasSearched = true;
      $("nav").show();
      $("#introFormDiv").hide();
      var searchInputCity = $(this).siblings('.cityNameInput').val().trim();
      var searchInputDistance = parseInt($(this).siblings('.cityDistanceInput').val().trim()) || 10;
      $(this).siblings('.cityNameInput').val("");
      $(this).siblings('.cityDistanceInput').val("");
      //savedPages.push(searchInputCity);

      cityLocation(searchInputCity, searchInputDistance);//passing user input to cityLocation

    }
  })

  //Push trail id into saved array when you click the heart
  $(document).on("click",".saveMaryPoppins", function() {
    if(!savedTrails.includes($(this).attr("data-id"))) {
      savedTrails.push($(this).attr("data-id"));
      localStorage.setItem("trails", savedTrails.toString());
      console.log("https://www.hikingproject.com/data/get-trails-by-id?ids="+ localStorage.getItem("trails") +"&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16");
    }
  })


  //If you click on the logo do another search
  $(".logo").on("click", function () {
    $("nav").hide();
    $("#introFormDiv").show();
    $(".swiper-wrapper").empty();
    $("#explorerDiv").hide();
    $("#savedPagesDiv").hide();
    $("#container").empty();
  })

  //When you click on a map icon it reads the data-name attribute and opens a window with a google map to that place
  $(document).on("click", ".mapIcon", function () {
    var place = $(this).attr("data-name");
    window.open("https://www.google.com/maps/search/?api=1&query=" + place);
  })

  //When you click on the explorer nav button show the explorer and hide the saved page
  //But only if you've already searched something
  $(document).on("click", "#explorerNav", function() {
    if(hasSearched) {
      $("#explorerDiv").show();
      $("#savedPagesDiv").hide();
    }
  })

  //When you click on the saved nav button show the saved page and hide the explorer
  $(document).on("click", "#savedNav", function() {
    $("#savedPagesDiv").show();
    $("#explorerDiv").hide();
    $("#container").empty();
    generateSaved();
  })

  //In the saved page when you click remove trail it removes the id out of the saved array and then generates the page again
  $(document).on("click", ".removeSaveBtn", function() {
    savedTrails.splice(savedTrails.indexOf($(this).attr("data-id")), 1);
    localStorage.setItem("trails", JSON.stringify(savedTrails));
    generateSaved();
  })
});