document.addEventListener("DOMContentLoaded", function () {
  const trendingGallery = document.getElementById("trending");
  class GifGallery {
    constructor(trendingURL) {
      this.src = trendingURL;
      this.className = "img-thumbnail d-block w-100";
    }
  }

  function addTrending(trendingArr) {
    var imgs = [];

    for (let i = 0; i < trendingArr.length; i++) {
      var trendingImg = document.createElement("img");
      g = new GifGallery(trendingArr[i]);
      imgs.push(g);
    }
    const c0 = document.getElementById("c0");
    c0.src = imgs[0].src;
    const c1 = document.getElementById("c1");
    c1.src = imgs[1].src;
    const c2 = document.getElementById("c2");
    c2.src = imgs[2].src;
    const c3 = document.getElementById("c3");
    c3.src = imgs[3].src;
    const c4 = document.getElementById("c4");
    c4.src = imgs[4].src;
  }

  async function getTrending() {
    const resT = await axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY&limit=&rating=G"
      )
      .then(function (response) {
        let respData = response.data.data;
        let urlsArr = [];
        for (let i = 0; i < respData.length; i++) {
          urlsArr.push([respData[i]["images"].downsized.url]);
        }
        addTrending(urlsArr);
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
