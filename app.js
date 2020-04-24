document.addEventListener("DOMContentLoaded", function () {

  class GifGallery {
      constructor (trendingURL) {
        this.src = trendingURL;
        this.className = "img-thumbnail d-block w-100";  
      }  
  }

  function addTrending(trendingArr) {
    const trendingGallery = document.getElementById("trending");
    var carouselDiv = document.createElement("div");


    for (let i = 0; i < trendingArr.length; i++) {
      var trendingImg = document.createElement("img");
      // var carouselDiv = document.createElement("div");
      carouselDiv.className += "carousel-item";
      g = new GifGallery(trendingArr[i]);
      trendingImg.src = g.src
      trendingImg.className = g.className
      carouselDiv.append(trendingImg);
      trendingGallery.append(carouselDiv);
         
      // create GIF class
      // trendingImg.src = g.src
      // trendingImg.className = g.className
      // carouselDiv.append(trendingImg);
      // trendingGallery.append(carouselDiv);
    }

  };  

 
  async function getTrending() {
    const resT = await axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY&limit=5&rating=G"
      )
      .then(function (response) {
         let respData = response.data.data
         let urlsArr = [];
         for (let i=0; i < respData.length; i++) {
           urlsArr.push([respData[i]["images"].downsized.url]);
         }
         // create class images and append to carousel
        addTrending(urlsArr)
      });

  }

  window.onload = getTrending();


  const newSearch = document.getElementById("search");
  const deleteGifs = document.getElementById("deleteBtn");
  const currentParty = document.getElementById("gallery");
  const deleteCheck = document.getElementById("delete-party");

  newSearch.addEventListener("click", function (e) {
    e.preventDefault();
    const input = document.querySelector("#keyword-seach").value;
    getGif(input);
  });


  async function getGif(keyword) {
    const api_key = "AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY";
    const q = `${keyword}`;

    const res = await axios
      .get(
        "https://api.giphy.com/v1/gifs/search?api_key=" +
          api_key +
          "&q=" +
          q +
          "&limit=200&offset=0&rating=G&lang=en"
      )
      .then(function (response) {
        const ranGif = Math.floor(Math.random() * 200) + 1;
        createNewGif(
          JSON.parse(response.request.response).data[ranGif].images[
            "preview_webp"
          ]["url"]
        );
      }); 
    }
    

  createNewGif = (gif) => {
    const gifGallery = document.getElementById("gallery");
    const newDiv = document.createElement("div");
    newDiv.className = "col col-4 col-md-3";
    const gifImg = document.createElement("img");
    gifImg.src = gif;
    gifImg.className = "img-thumbnail img-fluid m-3 mx-auto d-block";
    newDiv.append(gifImg);
    gifGallery.append(newDiv);
  };


  deleteGifs.addEventListener("click", function (e) {
    e.preventDefault();
    verifyDelete();
  });

  const verifyDelete = () => {
    if (deleteCheck.checked) {
      deleteParty();
      deleteCheck.checked = false;
    } else {
      alert(
        "To end your current party, please select the delete party checkbox"
      );
    }
  };

  const deleteParty = () => {
    var img = currentParty.firstElementChild;
    while (img) {
      img.remove();
      img = currentParty.firstElementChild;
    }
  };
});
