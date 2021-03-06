window.onload = function() {
/***************************INIT STUFF*****************************************/
  var searchBox           = document.getElementById('search-box');
  var searchBoxDiv        = document.getElementById('search-box-div');
  var searchBtn           = document.getElementById('search-glass');
  var allImages           = document.getElementById('allImages');
  var favImages           = document.getElementById('favImages');
  var favPlaces           = document.getElementById('favPlaces');
  var allPlaces           = document.getElementById("allPlaces");
  var body                = document.getElementById("body");
  var right               = document.getElementById("right");
  var home                = document.getElementById("home");
  var favsPlace           = document.getElementById("favs-place");
  var favsImage           = document.getElementById("favs-image");
  var favsPlaceClear      = document.getElementById("favs-place-clear");
  var favsImageClear      = document.getElementById("favs-image-clear");
  var nameContainer       = document.getElementById("results-name");
  var tempContainer       = document.getElementById("results-temp");
  var resultsDescript     = document.getElementById("results-description");
  var resultsMain         = document.getElementById("results-main");
  var flexMain            = document.getElementById("flex-main");
  var card                = document.getElementById("card-id");
  var views               = document.getElementById("view-id");
  var wrapper             = document.getElementById("wrapper");
  var mvpButton           = document.getElementById("mvp-checklist");
  var mvpArea             = document.getElementById("mvp-area");
  var infoID              = document.getElementById("infoID");
  var header              = document.getElementById("header");
  var welcome             = document.getElementById("welcome");
  var imgContainer;
  var placeSearch;
  var tempData = {};
  var highestLikes = 0;
  var highestLikesUrl = "";
  var highestFavs = 0;
  var highestFavsUrl = "";
  // var url = 'http://localhost:3000';

  var locatName;
  var url = "https://morning-temple-77469.herokuapp.com";
  hideMVP();
  //HIDE EVERYTHING
  function hideEverything(){
    hideAll();
    hideFavorites();
    hideMVP();
  }

  function hideMVP(){
    mvpArea.style.display = "none";
    header.style.display = "block";
    mvpArea.classList.add("hide");
    mvpArea.classList.remove("show");

  }

  function showMVP(){
    mvpArea.style.display = "flex";
    header.style.display = "none";
    mvpArea.classList.remove("hide");
    mvpArea.classList.add("show");
  }

  //ALL IMAGES/PLACES
  function hideAll(){
    hideAllPlaces();
    hideAllImages();
    hideMVP();
  }

  function hideAllPlaces(){
    allPlaces.style.display = "none";
  }
  function hideAllImages(){
    allImages.style.display = "none";
  }
  function showAll(){
    showAllPlaces();
    showAllImages();
  }
  function showAllPlaces(){
    welcome.style.display = "none";
    header.style.display = "block";
    allPlaces.style.display = "flex";
    allPlaces.innerHTML = "";
    resultsDescript.innerHTML = "";
    flexMain.innerHTML="";
    nameContainer.innerHTML = "";
    tempContainer.innerHTML = "";
    resultsMain.innerHTML = "";
  }
  function showAllImages(){
    welcome.style.display = "none";
    header.style.display = "block";
    allImages.innerHTML = "";
    allImages.style.display = "flex";
  }

  //FAVORITE IMAGES/PLACES
  function hideFavorites(){
    hideFavPlaces();
    hideFavImages();
    hideMVP();
  }
  function hideFavPlaces(){
    favPlaces.style.display = "none";
  }
  function hideFavImages(){
    favImages.style.display = "none";
  }
  function showFavorites(){
    welcome.style.display = "none";
    header.style.display = "block";
    favPlaces.innerHTML = "";
    favImages.innerHTML = "";
    favImages.style.display = "flex";
    favPlaces.style.display = "flex";
  }
  function showFavImages(){
    welcome.style.display = "none";
    header.style.display = "block";
    favImages.innerHTML="";
    favImages.style.display = "flex";
  }
  function showFavPlaces(){
    welcome.style.display = "none";
    header.style.display = "block";
    favPlaces.innerHTML = "";
    favPlaces.style.display = "flex";
  }

  function set_background(childImg){
    var reg = "linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var moz = "-moz-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var webkit = "-webkit-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var ms = "-ms-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var second = "url("+childImg+")"
    right.style.background=reg + second;
    right.style.background=moz + second;
    right.style.background=webkit + second;
    right.style.background=ms + second;
    right.style.backgroundSize="cover, cover";
    right.style.backgroundPosition = "center, center";
    right.style.backgroundRepeat = "no-repeat, repeat";
    right.style.backgroundAttachment = "fixed"
  }

/***************AJAX CALLS*****************/
  function put_places_favorites(data, upInputVal){
    console.log(url + '/places/favorites/' + upInputVal);
    $.ajax({
          url: url + '/places/favorites/' + upInputVal,
          dataType: 'json',
          method: 'put',
          data: data
        }).done(function(response){
             console.log("PUT RESPONSE", response);
             if(response == "UPDATED"){
               var message = document.createElement("h3");
               favPlaces.innerHTML = "";
               favPlaces.appendChild(message);
               message.innerHTML = "";
               message.innerHTML = "ALL UPDATED!";
               message.classList.add("message");
             }
       }); // end ajax
  }

  function post_places_search(data){
    console.log("AJAX CALL ################## POST PLACES/SEARCH #######################");
    $.ajax({
      url: url + '/places/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST PLACES/SEARCH:", response);
      if(response.cod == "404"){
        console.log("Please try again");
        var message = document.createElement("h3");
        allPlaces.innerHTML = "";
        allPlaces.appendChild(message);
        message.innerHTML = "There were no results with the specified criteria. <br><br> Please try again.";
        message.classList.add("message");
      }
      else{
        displayAllPlaces(response);

      }
    }); // end ajax
  }
  function post_places_favorites(data){
    console.log("AJAX CALL ################## POST PLACES/FAVORITES #######################");
    $.ajax({
      url: url + '/places/favorites',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST PLACES/FAVORITES:", response);
      console.log("len of response", response.length);
      if(response.ok == 1){
        console.log("saved successfully.");
        get_places_favorites();
      }
    }); // end ajax
  }

  function get_places_favorites(){

    console.log("AJAX CALL ################## GET PLACES/FAVORITES #######################");
    $.ajax({
      url: url + '/places/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM GET PLACES/FAVORITES:", response);
      console.log("CALLING DISPLAY FAV PLACE");
      if(response.length<1){
        displayFavPlace(response);
        var message = document.createElement("h3");
        favPlaces.innerHTML = "";
        favPlaces.appendChild(message);
        message.innerHTML = "There are currently no favorites.<br>Go add some favorites!";
        message.classList.add("message");
        console.log("there are no favorites");
      }
      else{
        displayFavPlace(response);

      }
    }); // end ajax
  }

  function delete_places_favorites(data){
    console.log("AJAX CALL ################## DELETE PLACES/FAVORITES #######################");
    console.log("DATA to DELETE:", data);
    $.ajax({
      url: url + '/places/favorites',
      method: 'DELETE',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM DELETE PLACES/FAVORITES:", response);
    }); // end ajax
    location.reload();
    // get_places_favorites();

  }
  function delete_places(){
    console.log("AJAX CALL ################## DELETE PLACES ALL #######################");
    $.ajax({
      url: url + '/places/',
      method: 'DELETE',
      dataType: 'json'
    }).done(function(response){
      console.log("RESPONSE FROM DELETING ALL PLACES", response);
    });
    location.reload();

  }

  function post_images_search(data){
    console.log("AJAX CALL ################## POST IMAGES/SEARCH #######################");
    console.log("DATA to POST:", data);
    $.ajax({
      url: url + '/images/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
        console.log("RESPONSE FROM POST IMAGES/SEARCH:", response);
        if(response.totalHits == 0){
          console.log("Please try again");
          var message = document.createElement("h3");
          allImages.innerHTML = "";
          allImages.appendChild(message);
          message.innerHTML = "There were no images with the specified criteria.";
          message.classList.add("message");
        }
        else{
          displayAllImages(response);
        }
    }); // end ajax
  }
  function post_images_favorites(data){
    console.log("data being posted to favorites", data);
    console.log("AJAX CALL ################## POST IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST IMAGES/FAVORITES:", response);
      if(response.ok == 1){
        console.log("saved successfully.");
        get_images_favorites();
      }
    }); // end ajax
  }

  function get_images_favorites(){
    console.log("AJAX CALL ################## GET IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM GET IMAGES/FAVORITES:", response);

      if(response.length<1){
        console.log("there are no favorites");
        displayFavImages(response);

        var message = document.createElement("h3");
        favImages.innerHTML = "";
        favImages.appendChild(message);
        message.innerHTML = "There are currently no favorites images.<br>Go add some favorites!";
        message.classList.add("message");
      }
      else{
        displayFavImages(response);
      }
    }); // end ajax
  }

  function delete_images(){
    console.log("AJAX CALL ################## DELETE IMAGES ALL #######################");
    $.ajax({
      url: url + '/images/',
      method: 'DELETE',
      dataType: 'json'
    });
    location.reload();
  }
  function delete_images_favorites(data){
    console.log("AJAX CALL ################## DELETE IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'DELETE',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM DELETE IMAGES/FAVORITES:", response);
    }); // end ajax
    location.reload();
  }
/***************END AJAX CALLS*****************/

/*********************BUTTONS EVENT LISTENERS*************************/
  searchBtn.addEventListener('click', function(ev) {
    hideEverything();
    hideMVP();
    showAll();
    ev.preventDefault();

    placeSearch = searchBox.value;

    var data = {
      queryString: placeSearch
    };

    post_places_search(data);
    post_images_search(data);
  }); // end search btn

  home.addEventListener("click", function(ev){
    hideEverything();
    hideMVP();
    ev.preventDefault();
    location.reload();
  })

  favsImageClear.addEventListener("click", function(ev){
    hideEverything();
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y" || permission.toLowerCase() == "yes"){
      delete_images();
    }
  });
  favsPlaceClear.addEventListener("click", function(ev){
    hideEverything();
    showFavPlaces();
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y"){
      delete_places();
    }
  });

  mvpButton.addEventListener("click", function(e){
    console.log("mvp was pressed");
    e.preventDefault();
    hideEverything();
    showMVP();
    infoID.innerHTML = "";
    mvpArea.id = "mvpArea";

    var ul    = document.createElement("ul");

    var checkArray = [
      "The user can search for a place to display; the current weather, a short description, the humidity level and some other temperature related information.",
      "The user is also displayed an array of images thay can save and view at a later time.",
      "The user can also select an image to be used as the current background.",
      "The user can save the location and view it at a later date with the updated weather and image information.",
      "The user can view all their saved images and locations.",
      "When the user views all their locations, they can either view the specified location in more detail, they can delete this location from their favorite list, or they can add a comment to the specified location.",
      "When the user views all their saved images, they can select an image to be the current background or they can delete this image from their favorites.",
      "In addition, the user has the capability to delete all their favorite images and locations.  An alert window confirms this action so they user won't accidentally delete all their favorite images and locations.",
      "This website application is fully responsive as well. "
    ];
    for(var i = 0; i < checkArray.length; i++){
      var li= document.createElement("li");
      li.innerHTML = checkArray[i];
      ul.appendChild(li);
    }
    infoID.appendChild(ul);
    // mvpArea.appendChild(infoID);
  })

  //favsPlace.addEventListener
  //favsImage.addEventListener
/*********************END BUTTONS EVENT LISTENERS***********************/

/***********************FAV PLACE*************************/
favsPlace.addEventListener("click", function(ev){
  console.log("FAV PLACE PRESSED");
  hideEverything();
  hideMVP();
  showFavPlaces();
  ev.preventDefault();
  get_places_favorites();
  })

  function displayFavPlace(response){
    console.log("IN DISPLAY FAV PLACE","RESPONSE PASSED IN", response);
    hideFavImages();
    hideAllImages();
    hideAllPlaces();
    showFavPlaces();
    set_background("back4.jpg");
    var h3Container = document.createElement("div");
    var h3 = document.createElement("h3");
    h3Container.id = "titleMessage";
    h3.innerHTML = "FAVORITE PLACES:";
    h3Container.appendChild(h3);
    favPlaces.appendChild(h3Container);

    var favPlacesContainer = document.createElement("div");
    favPlacesContainer.id = "favPlacesContainer";
    var resLen = response.length;
    var resI;
    for(var i = 0; i < resLen; i++){
      console.log("i is", i);
      resI = response[i];
      console.log("res[i]", resI);
      //make outer card for each i
      var cardContainer = document.createElement("article");
      cardContainer.id = "cardContainerID"+i;
      console.log("cardCon[i]", cardContainer.id);
      cardContainer.className = "cardContainer";
      favPlacesContainer.appendChild(cardContainer);

        var cardWrapper = document.createElement("div");
        cardWrapper.id = "cardWrapperID";
        cardWrapper.className="cardWrapper";
        console.log(cardWrapper.id, "CID");
        cardContainer.appendChild(cardWrapper);

          var nameCard = document.createElement("div");
          nameCard.id = "nameCardID";
          cardWrapper.appendChild(nameCard);

          var cardSplit = document.createElement("div");
          cardSplit.id = "cardSplitID";
          cardWrapper.appendChild(cardSplit);

            var buttonCard = document.createElement("div");
            buttonCard.id = "buttonCardID";
            cardSplit.appendChild(buttonCard);

            var commentCard = document.createElement("div");
            commentCard.id = "commentCardID";
            cardSplit.appendChild(commentCard);

        var updateArea = document.createElement("div");
        updateArea.id = "updateAreaID"+i;
        updateArea.className = "updateArea"
        cardContainer.appendChild(updateArea);
        favPlaces.appendChild(favPlacesContainer);

      for(var key in resI){
        switch (key) {
          case "your_comment":

            var comment = resI[key];
            commentCard.innerHTML="<h4>Your Comment:</h4> <br>" + comment;
            console.log("parent of comment", $(this).parent());
            var update = document.createElement("button");
            break;

          case "name":

            var name = resI[key];
            nameCard.innerHTML = name;

            var view = document.createElement("button");
            view.id = "view-id";
            view.className="glyphicon glyphicon-zoom-in";
            view.innerText = "view this";
            buttonCard.appendChild(view);

            console.log("favPlaces", favPlaces);

            view.addEventListener("click", function(e){
              console.log("VIEW WAS PRESSED");
              e.preventDefault();
              var parent = $(this).parent();
              console.log("view parent", parent);
              var text = parent[0].parentElement.parentElement.children[0].childNodes[0].data;
              console.log("text", text);
              tempData = {
                queryString: text
              };
              post_places_search(tempData);
              post_images_search(tempData);
            }); //end of view more

            var remove = document.createElement("button");
            remove.id = "delete-id";
            remove.innerText = "delete";
            remove.className = "glyphicon glyphicon-remove";
            buttonCard.appendChild(remove);

            remove.addEventListener("click", function(){
              var parent = $(this).parent();
              console.log("parent in remove", parent);
              var locatName = parent[0].parentElement.parentElement.children[0].childNodes[0].data;
              console.log(locatName);
              var dataPlace = {
                name: locatName
              }
              delete_places_favorites(dataPlace);
            }); //end of remove/delete button


            var update = document.createElement("button");
            update.id = "update-id";
            update.innerText = "comment";
            update.className = "glyphicon glyphicon-edit";
            buttonCard.appendChild(update);

            update.addEventListener("click", function(e){
              console.log("UPDATE IN NAME WAS PRESSED");
              e.preventDefault();
              var parent = $(this).parent();
              var text = parent[0].parentElement.parentElement.children[0].childNodes[0].data;
              tempData = {
                queryString: text
              };
              console.log("TEMPDATA");
              var textArea = document.createElement("textarea");
              textArea.placeholder = "Enter your comment...";
              textArea.id = "textAreaID";
              var submit = document.createElement("button");
              submit.innerText = "submit comment";
              submit.id = "submitID";

              //append to the current div not the last updateArea.
              var parent = $(this).parent();
              console.log("update parent", parent);


              var query = parent[0].parentElement.parentElement.parentElement.children[1];
              console.log("Q", query);

              parent[0].parentElement.parentElement.parentElement.children[1].appendChild(textArea);
              parent[0].parentElement.parentElement.parentElement.children[1].appendChild(submit);

              submit.addEventListener("click", function(e){
                e.preventDefault();
                console.log("submit was pressed");
                var textVal = textArea.value;
                var data = {
                  name: text,
                  your_comment: textVal
                }
                console.log("data comment", data);
                put_places_favorites(data, text);
              })
            }); //end of update

            break;
          default:
        }
      }
    }
  }
/********************END OF FAV PLACE***********************/

/***********************FAV IMAGES*************************/
  favsImage.addEventListener("click", function(ev){
    console.log("########FAV IMAGES##############");
    ev.preventDefault();
    hideEverything();
    hideMVP();
    showFavImages();
    get_images_favorites();
  })

  function displayFavImages(response){
    hideAllImages();
    hideAllPlaces();
    hideFavPlaces();
    showFavImages();
    set_background("back4.jpg");
    console.log("IN DISPLAY FAV IMAGES");
    console.log("RES", response);
    var h3Container = document.createElement("div");
    var h3 = document.createElement("h3");
    h3Container.id = "imageH3";
    h3.innerHTML = "FAVORITE IMAGES:"
    h3Container.appendChild(h3);
    favImages.appendChild(h3Container);

    var favImagesContainer = document.createElement("div");
    favImagesContainer.id = "favImagesContainer";

    favImages.appendChild(favImagesContainer);

    var resLen = response.length;
    for(var i = 0; i < resLen; i++){
      console.log("i is", i);
      var resKey = response[i];
      for(var key in response[i]){
        if(key == "imgURL"){
          console.log("reskey[key]", resKey[key]);
          var imgContainer = document.createElement('div');
          imgContainer.id="img-containerID"
          favImagesContainer.appendChild(imgContainer)

          var img = document.createElement('img');
          var pic = resKey[key];
          img.src = pic;
          img.id = "img-id";

          var button = document.createElement("button");
          button.id = "makeBack";
          button.className = "glyphicon glyphicon-plus"
          button.innerText = "make back";

          var remove = document.createElement("button");
          remove.id = "delete";
          remove.className="glyphicon glyphicon-remove";
          remove.innerText = "delete"

          imgContainer.appendChild(img);
          imgContainer.appendChild(button);
          imgContainer.appendChild(remove);

          button.addEventListener("click", function(){
            console.log("BACKGROUND BUTTON WAS PRESSED");
            var parent = $(this).parent();
            var childImg = parent[0].children[0].src;
            set_background(childImg);
          }) //button listener

          remove.addEventListener("click", function(){
            var parent = $(this).parent();
            console.log("parent", parent);
            var dataImg = parent[0].children[0].currentSrc;
            var data= {
              imgURL: dataImg
            }
            delete_images_favorites(data);

          }); // end add btn
        }
      }
    }
  }
/***********************END FAV IMAGES*************************/

  function displayAllPlaces(response){
    console.log("displayAllPlaces", response);
    hideEverything();
    showAllPlaces();
    showAllImages();
    console.log(wrapper);
    for(var key in response){
      switch (key) {
        case "main":
        var main = document.createElement('div');
          main.innerHTML = "<b>Main:</b>";
          main.id="mainid";
          allPlaces.appendChild(main);
          var outerIndex = response[key];
            for(var inner in outerIndex){
              switch (inner) {
                case "temp":
                  main.innerHTML+="Temperature is: " + outerIndex[inner] + "˚<br>";
                  var temp = document.createElement("div");
                  temp.id = "tempid";
                  temp.innerHTML=outerIndex[inner] + "˚";
                  tempContainer.appendChild(temp);
                  flexMain.appendChild(tempContainer);
                  allPlaces.appendChild(flexMain);
                  break;
                case "temp_max":
                  main.innerHTML+="Max Temperature: " + outerIndex[inner] + "˚<br>";
                  break;
                case "temp_min":
                  main.innerHTML+="Min Temperature: " + outerIndex[inner] + "˚<br>";
                  break;
                case "humidity":
                  main.innerHTML+="Humidity: " + outerIndex[inner] + "˚<br>";
                  console.log("43 main is now", main);
                  break;
                default:
                  break;
              } //end switch
            } //end for
          break;

        case "name":
          var name = document.createElement('div');
          name.id="nameid";
          nameContainer.appendChild(name);
          flexMain.appendChild(nameContainer);
          allPlaces.appendChild(flexMain);
          name.innerHTML +=response[key];
          var add = document.createElement("button");
          add.id = "addWeather";
          add.className="glyphicon glyphicon-heart";
          add.innerText = "Favorite"
          flexMain.appendChild(add);

          add.addEventListener("click", function(){
            var parent = $(this).parent();
            locatName = parent[0].children[1].children[0].childNodes[0].data;
            console.log("locatName", locatName);

            var dataPlace = {
              name: locatName
            }

            post_places_favorites(dataPlace);
          });
          break;

        case "weather":
          var weather = document.createElement('div');
          weather.innerHTML = "<br>"+"<b>"+ "Description" + ":</b><br>";
          allPlaces.appendChild(weather);
          weather.id="weatherid";
          var outerIndex = response[key];
          var innerIndex = outerIndex[0];
            for(var inner in innerIndex){
              switch (inner) {
                case "description":
                    weather.innerHTML+=innerIndex[inner] + "<br>";
                  break;
                default:
                  break;
              } //end switch
            } //end for
          break; //end case weather
        default:
          break;
      } //end switch
    } //end for in loop
  } //end function

  //displays images
  function displayAllImages(response){
    set_background("back2.jpg");
    allImages.innerHTML = "";
    console.log("#########DETERMINING BACKGROUND###########");
    console.log("#RESPONSE", response, "#");
    console.log("#CHECK IF RESPONSE IS FAVORITED ITEM#");
    if(!response.hits || response.hits <1){
      console.log("#IT IS A FAVORITED ITEM");
    }
    else{
      var resHits = response.hits;
      var resHitsLen = resHits.length;
      highestLikes = 0;
      highestFavs = 0;
      if(response.totalHits < 1){
        allImages.innerHTML = "SORRY THERE ARE NO IMAGES WITH THAT CRITERIA, TRY AGAIN..."
      }
      else{
        for(var i = 0; i < resHitsLen; i++){
          if(resHits[i].likes > highestLikes){
            highestLikes = resHits[i].likes;
            highestLikesUrl = resHits[i].webformatURL;
          }
          if(resHits[i].favorites > highestFavs){
            highestFavs = resHits[i].favorites;
            highestFavsUrl = resHits[i].webformatURL;
          }

          var imgContainer = document.createElement('div');
          imgContainer.id="img-containerID"
          allImages.appendChild(imgContainer)

          var img = document.createElement('img');
          var pic = resHits[i].webformatURL;
          img.src = pic;
          img.id = "img-id";

          var button = document.createElement("button");
          button.id = "makeBack";
          button.className = "glyphicon glyphicon-plus"
          button.innerText = "Back"

          var add = document.createElement("button");
          add.id = "add";
          add.className="glyphicon glyphicon-heart";
          add.innerText = "Fav"

          imgContainer.appendChild(img);
          imgContainer.appendChild(button);
          imgContainer.appendChild(add);

          button.addEventListener("click", function(){
            console.log("BACKGROUND BUTTON WAS PRESSED");
            var parent = $(this).parent();
            var childImg = parent[0].children[0].src;
            set_background(childImg);
          }) //button listener

          add.addEventListener("click", function(){
            var parent = $(this).parent();
            var dataImg = parent[0].children[0].currentSrc;
            var data = {
              imgURL: dataImg
            }

            post_images_favorites(data);
          }); // end add btn

        } //end for loop
        set_background(highestLikesUrl);

      }//end else
    }

  } //end funx
  hideEverything();
}; // end window onload fxn
