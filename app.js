console.log("Let's get this party started!");

const apiKey = 'AFkYNpS3QrPyymUgOlzjhEcxIH04Q3sY';


const newSearch = document.getElementById("#search");

newSearch.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("event");
});

// const form = document.getElementById("#keyword-search");
// form.addEventListener("submit", function (e) {
//     e.preventDefault()
//     console.log('at event')
//     const input = document.querySelector('#keyword-seach')
//     getGif(input.value)
// })

async function getGif(keyword) {
    try {
        const url = `http://api.giphy.com/v1/gifs/search?q=${keyword} `;
        const res = await axios.get(url);
        createNewGif(res)

    } catch (e) {
        alert("Sorry, no gifs match your search. Please enter a different keyword.")
    }
}

createNewGif = (gif) => {
    const gifGallery = document.getElementById('gallery')
    const newDiv = document.createElement('div')
    newDiv.className += "col"
    const gitImg = document.createElement('img')
    gifImg.src = gif;
    gifImg.className += "img-thumbnail"
    newDiv.append(gifImg)
    gifGallery.append(newDiv)
}
