function createGrid() {
    var getStorage = JSON.parse(localStorage.getItem('trails'));
    console.log(getStorage);

    // We haven't set any favorites yet. Tell them to go do that!
    if (getStorage === null)
    {
      var h1El = $("<h1>");
      h1El.html("<br>No favorite trails found. Click <a href='#index.html'><u>here</u></a> to go find some!");
      h1El.attr("class", "text-center text-3xl");
      $("header").append(h1El);
      return;
    }

    // We have favorite data. Time to parse it out!
    $.each (getStorage, function() {

      // For debugging purposes - uncomment out if you want to see the underlying data
      //console.log($(this));
      
      // Step 1: Create a new div
      var newDiv = $("<div>");

      // Step 2: Create a new image
      var newImg = $("<img>");
      newImg.attr("class", "p-5");
      newImg.attr("src", this.imgSmallMed);
      newImg.attr("alt", this.location);

      // Step 3: Create a new p for location
      var newP1 = $("<p>");
      newP1.attr("class", "text-center p-2");
      newP1.text(this.location);

      // Step 4: Create another new p for summary
      var newP2 = $("<p>");
      newP2.text(this.summary);
      newP2.attr("class", "text-center");

      // Final step: bring it all together
      $("#container").append(newDiv);
      $(newDiv).append(newImg);
      $(newDiv).append(newP1);
      $(newDiv).append(newP2);
    })
    
  }
  createGrid();