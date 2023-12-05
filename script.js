function getValue(response) {
  // Vytvoření pole objektů pro usnadnění práce se záznamy
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push({
      title: response.data.items[i].title,
      link: response.data.items[i].link,
    });
  }

  // Pole s ID příslušných HTML prvků
  const resultElements = [
    "result1",
    "result2",
    "result3",
    "result4",
    "result5",
    "result6",
    "result7",
    "result8",
    "result9",
    "result10",
  ];

  // Použití forEach smyčky pro aktualizaci HTML prvků
  resultElements.forEach((elementID, index) => {
    const resultElement = document.querySelector(`#${elementID}`);
    const { title, link } = results[index];
    resultElement.innerHTML = `${title}, <a href="${link}" target="_blank">${link}</a>`;
  });
}
// resultElement.innerHTML = `${title}</a>`;

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-keywords");
  searchGoogle(searchInput.value);
}

function searchGoogle(keywords) {
  let apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAS24ObvHc0y1rHtXTyu_59-kfA9MiaQCo&cx=66cd9a7c8106040bb&q=${keywords}`;
  axios.get(apiUrl).then(getValue);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", submitSearch);

/*
function exportToWord() {
  // Získání obsahu, který chcete vložit do dokumentu Word
  var content = document.getElementById("content").innerHTML;

  // Vytvoření šablony s použitím docxtemplater
  var doc = new Docxtemplater();
  doc.loadZip(new JSZip(docxtemplater(templaterSettings)));

  // Nahrazení šablonovatelných míst v dokumentu obsahem
  doc.setData({
    content: content,
  });

  // Generování dokumentu
  doc.render();

  // Uložení dokumentu ve formátu Word
  var out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  // Stáhnutí souboru
  saveAs(out, "document.docx");
}
/*
        <button type="button" onclick="searchGoogle()">Vyhledat</button>

 <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>


            <div id="content">
        <h1>Hello, World!</h1>
        <p>This is the content you want to export to Word.</p>
      </div>

      <button onclick="exportToWord()">Export to Word</button>

*/
