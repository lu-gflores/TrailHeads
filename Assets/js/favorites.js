function createGrid() {
    var getStorage = JSON.parse(localStorage.getItem('trails'));

    // For debugging purposes - uncomment out if you want to see the underlying data
    console.log(getStorage);

    // We haven't set any favorites yet. Tell them to go do that!
    if (getStorage === null)
    {
      var h1El = $("<h1>");
      h1El.html("<br>No favorite trails found. Click <a href='index.html'><u>here</u></a> to go find some!");
      h1El.attr("class", "text-center text-3xl");
      $("header").append(h1El);
      return;
    }

    // We have favorite data. Time to parse it out!
    $.each (getStorage, function() {

      // For debugging purposes - uncomment out if you want to see the underlying data
      //console.log($(this));
      
      // Step 1: Create a new div containing the entire card
      var newCard = $("<div>");
      newCard.attr("class", "max-w-sm rounded text-overflow shadow-lg");

      // Step 2: Pull the stored image
      var newIconmg = $("<img>");
      newIconmg.attr("class", "w-full");
      newIconmg.attr("id", this.url);
      if (this.imgSmallMed === "") {
        newIconmg.attr("src", "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
        newIconmg.attr("alt", "Placeholder image");
        newIconmg.attr("style", "width: 400px; height: 300px");
      }
      else {
      newIconmg.attr("src", this.imgSmallMed);
      newIconmg.attr("alt", this.location);
      }

      // Step 3: Create a new div to contain everything else
      var newContents = $("<div>");
      newContents.attr("class", "px-6 py-4");

      // Step 4: Create another new div to first contain the location
      var newLocation = $("<div>");
      newLocation.attr("class", "font-bold text-xl mb-2");
      newLocation.text(this.location);

      // Step 5: Create a new p for summary
      var newSummary = $("<p>");
      newSummary.text(this.summary);
      newSummary.attr("class", "text-gray-700 text-base");

      // Step 6: Create a new span for trail difficulty
      var newDifficulty = $("<span>");
      newDifficulty.attr("class", "inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 my-1");
      newDifficulty.text("Difficulty: " + this.difficulty.charAt(0).toUpperCase() + this.difficulty.substr(1));

      // Step 7: Create yet another div to contain the buttons to delete a favorite or map the trail
      var newRow = $("<div>");
      newRow.attr("class", "w-full h-16 bg-gray-300 flex flex-row");

      // Step 8: Create a div within containing the unheart button
      var newButton = $("<div>");
      newButton.attr("class", "w-2/4 h-full flex justify-center items-center bg-blue-300 rounded-bl");

      var newIcon = $("<i>");
      newIcon.attr("class", "icon fas fa-heart-broken fa-2x");

      // Step 9: Create another div within containing the map button
      var newMapButton = $("<div>");
      newMapButton.attr("class", "mapIcon w-2/4 h-full flex justify-center items-center bg-green-500 rounded-br");

      var newMapIcon = $("<i>");
      newMapIcon.attr("class", "mapIcon icon fas fa-map fa-2x");

      // Final step: bring it all together
      $("#container").append(newCard);
      $(newCard).append(newIconmg);
      $(newCard).append(newContents);
      $(newContents).append(newLocation);
      $(newContents).append(newSummary);
      $(newContents).append(newDifficulty);
      $(newContents).append(newRow);
      $(newRow).append(newButton);
      $(newButton).append(newIcon);
      $(newRow).append(newMapButton);
      $(newMapButton).append(newMapIcon);
    })
    
  }
  createGrid();

  $('body').on('click', 'img', function() {
    window.location = this.id;
  })

  $('.fa-heart-broken').on('click', function() {
    console.log(this);
    console.log($(this).parent().parent().parent());
  })