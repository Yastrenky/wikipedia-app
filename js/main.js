$('.dropdown-toggle').dropdown()
const es = document.querySelector('.languageES')
const en = document.querySelector('.languageEN')

let language = "en"
const btn = document.querySelector('#searchButton');
const searchBox = document.querySelector('#searchBox');
const articlesContainer = document.querySelector('#articlesContainer');
const dropdownToggle = document.querySelector('#dropdown-toggle');

function toSpanish() {
  language = "es"
  btn.textContent = "BUSCAR"
  searchBox.placeholder = "Buscar en Wikipedia"
  articlesContainer.innerHTML = ''
  getArt(searchBox.value)

}

function toEnglish() {
  language = "en"
  btn.textContent = "SEARCH"
  searchBox.placeholder = "Search Wikipedia"
  articlesContainer.innerHTML = ''
  getArt(searchBox.value)

}
btn.addEventListener('click', function() {
  articlesContainer.innerHTML = ''
  getArt(searchBox.value)
})
searchBox.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    articlesContainer.innerHTML = ''
    getArt(searchBox.value)
  }
})
es.addEventListener('click', function() {
  toSpanish()
})
en.addEventListener('click', function() {
  toEnglish()
})

function getArt(search) {
  let url = "https://" + language + ".wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="
  $.ajax({
    url: url + search,
    dataType: "jsonp",
    method: 'get'
  }).done(function(response) {
    console.log(response);
    if (response.batchcomplete === "") {
      for (let i = 0; i < response.query.search.length; i++) {
        var div = document.createElement("div")
        let title = response.query.search[i].title
        let snippet = response.query.search[i].snippet
        div.innerHTML = articleMaker(title, snippet)


        articlesContainer.appendChild(div)

      }

    } else {
  //    alert("Empty Search...");
    }




    // use the articleMaker function here and then
    // append each article to the DOM using jquery's .append() method
  });

  function articleMaker(title, snippet) {
    var article = '';
    article += '<a target="_blank" rel="noopener" class="article" href="https://'+language+'.wikipedia.org/wiki/' + title + '">';
    article += '<h3>' + title + '</h3>';
    article += '<p>' + snippet + "...." + '</p>';
    article += '</a>';
    return article;
  }
  searchBox.value = search
  console.log(searchBox.value);
  if(language==="es"){
  document.querySelector('.resultSerch').textContent="Se muestran resultados de: "+searchBox.value

  }
  else{
  document.querySelector('.resultSerch').textContent="Are shown results of: "+searchBox.value
  }
}
