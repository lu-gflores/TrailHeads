function createGrid() {
    var getStorage = JSON.parse(localStorage.getItem('trails'));

    // For debugging purposes - uncomment out if you want to see the underlying data
    //console.log(getStorage);

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
      newDiv.attr("class", "max-w-sm rounded text-overflow shadow-lg");

      // Step 2: Create a new image
      var newImg = $("<img>");
      newImg.attr("class", "w-full");
      console.log(this.imgSmallMed);
      if (this.imgSmallMed === "") {
        newImg.attr("src", "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
        newImg.attr("alt", "Placeholder image");
        newImg.attr("style", "width: 400px; height: 300px");
      }
      else {
      newImg.attr("src", this.imgSmallMed);
      newImg.attr("alt", this.location);
      }

      // Step 3: Create a new div to contain the location/summary
      var newDiv2 = $("<div>");
      newDiv2.attr("class", "px-6 py-4");

      // Step 4: Create another new div to first contain the location
      var newDiv3 = $("<div>");
      newDiv3.attr("class", "font-bold text-xl mb-2");
      newDiv3.text(this.location);

      // Step 5: Create a new p for summary
      var newP = $("<p>");
      newP.text(this.summary);
      newP.attr("class", "text-gray-700 text-base");

      // Final step: bring it all together
      $("#container").append(newDiv);
      $(newDiv).append(newImg);
      $(newDiv).append(newDiv2);
      $(newDiv2).append(newDiv3);
      $(newDiv2).append(newP);
    })
    
  }
  createGrid();