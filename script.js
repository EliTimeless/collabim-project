function getValue(response) {
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push({
      title: response.data.items[i].title,
      link: response.data.items[i].link,
    });
  }

  const resultContainer = document.getElementById("results");
  resultContainer.innerHTML = ""; // Vyprázdnění obsahu před novým vyplněním

  results.forEach(({ title, link }, index) => {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `${title},<div> <a href="${link}" target="_blank">${link}</a><div>`;
    resultContainer.appendChild(resultElement);
  });

  // Přidání tlačítka pro uložení
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => saveResultsToFile(results));
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-keywords");
  searchGoogle(searchInput.value);
}

function searchGoogle(keywords) {
  let apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAJuUAzCc-i0wHsJ4qtr1MFI0NDeWiTWHE&cx=46b24d08240f446e3&q=${keywords}`;
  axios.get(apiUrl).then(getValue);
}

function saveResultsToFile(results) {
  if (results.length > 0) {
    // Vytvoření JSON souboru s výsledky
    const jsonData = JSON.stringify(results, null, 2);

    // Vytvoření Blobu a otevření dialogu pro stažení souboru
    const blob = new Blob([jsonData], {
      type: "application/json;charset=utf-8",
    });
    const fileName = "vyhledane_vyrazy.json";

    // Použití FileSaver.js pro stažení souboru
    saveAs(blob, fileName);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", submitSearch);

  let searchInput = document.querySelector("#input-keywords");
  searchInput.value = "collabim";
  searchGoogle(searchInput.value);
});
