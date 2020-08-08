var url = "https://gateway.marvel.com:443/v1/public/characters";
var publicKey = "4c79b78a1bd230f32789909fa07c5df1";
var privateKey = "6ae614935615968b6217b4960d2cbc69c25ab20b";

let listCharacters = $('.content')
function renderCharacter(item) {
    let result = ''
    for (let i = 0; i < item.data.results.length; i++) {
        let characters = item.data.results[i]
        let heroID = item.data.results[i].id
        result = result + `       
       
        <div class="characters">
        <a href="detail.html?">
            <img src="${characters.thumbnail.path + '.' + characters.thumbnail.extension}" alt="">
            <p>${characters.name}</p>
            <p>${'Number of comics: ' + characters.comics.available}</p>
        </a>
        </div>
       `
        
        console.log(characters)
        listCharacters.html(result)
    }
}

async function fetchCharacter() {
    var key = marvelKey(privateKey, publicKey);
    var fullUrl = `${url}?${key}`
    let data = await fetch(fullUrl)
    let item = await data.json()
    renderCharacter(item)
}

function setupEvents() {
    var btnSearch = $('#btn_search');
    btnSearch.on("click", function (e) {
        var searchBar = $('#search_bar');
        var searchString = searchBar.val();
        var key = marvelKey(privateKey, publicKey);
        var fullUrl = `${url}?${key}`;
        if (searchString != "") {
            fullUrl += `&nameStartsWith=${searchString}`;
        }
        async function sendGetRequest() {
            let data = await fetch(fullUrl);
            let item = await data.json();
            renderCharacter(item);
        }
        sendGetRequest();
    })
}
fetchCharacter();
setupEvents();


