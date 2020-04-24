console.log("Let's get this party started!");


const newSearch = document.getElementById('search');
const deleteGifs = document.getElementById("deleteBtn");
const currentParty = document.getElementById("gallery");
const deleteCheck = document.getElementById("delete-party");




newSearch.addEventListener("click", function (e) {
  e.preventDefault()
  const input = document.querySelector('#keyword-seach').value
  getGif(input)
  
});

async function gitTrending() {
    const res = axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY&limit=20&rating=G");
}

async function getGif(keyword) {
    const api_key = "AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY";
    const q=`${keyword}`

    // const res = await axios.get('http//api.giphy.com/v1/gifs/search', {params: {api_key, q}})

    // try {
        const res = await axios.get("https://api.giphy.com/v1/gifs/search?api_key="+api_key+"&q="+q+"&limit=200&offset=0&rating=G&lang=en")
        .then(function (response){
            const ranGif = Math.floor(Math.random() * 200) +1
            createNewGif(JSON.parse(response.request.response).data[ranGif].images["preview_webp"]["url"])
        })
            // console.log(JSON.parse(res.request.response))
        // const res = await axios.get("https://api.giphy.com/v1/gifs/search?api_key="+api_key+"&q="+q)
        // .then(function(response) {
        //     console.log(response.data.url)
        // })

        //   console.log(res.value);
            // console.log(res.data.message)
            // console.log(res.headers)
            // console.log(JSON.parse(this.responseText));
            // console.log(JSON.parse(res));
            // console.log()
            // console.log(res.json())
        //   let url = await JSON.parse(res)
        //   let url = await res.data.url;
        //   let url = res[0].url
        //  let url = res.data.request.response.url
        //   let url = res.data.reponse.url
        //   console.log(url)

        //   createNewGif(url)

    // } catch (e) {
    //     alert("Sorry, no gifs match your search. Please enter a different keyword.")
    // }

         // const res = await axios.get('http//api.giphy.com/v1/gifs/search', {params: {api_key, q}})

        // const res = await axios.get(`"https//api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}"`);

        // const url = `http://api.giphy.com/v1/gifs/search?q=${keyword} `;
        // const res = await axios.get(url);
        // console.log(url)
        // createNewGif(res)

}


createNewGif = (gif) => {

    const gifGallery = document.getElementById('gallery')
    const newDiv = document.createElement('div')
    console.log(newDiv)
    newDiv.className += "col col-4 col-md-3"
    const gifImg = document.createElement('img')
    gifImg.src = gif;
    gifImg.className += "img-thumbnail img-fluid";
    newDiv.append(gifImg)
    gifGallery.append(newDiv)
}

deleteGifs.addEventListener('click', function(e) {
    e.preventDefault()
    verifyDelete()    
})

const verifyDelete = () => {
    if (deleteCheck.checked) {
        deleteParty()
    } else {
        alert('To end your current party, please select the delete party checkbox')
    }
}

const deleteParty = () => {
    partyArr = []
    var img = currentParty.firstElementChild
    while (img) {
        img.remove()
        img = currentParty.firstElementChild
    }
}