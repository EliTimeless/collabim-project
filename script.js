function getValue(response) {
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push({
      title: response.data.items[i].title,
      link: response.data.items[i].link,
    });
  }

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

  resultElements.forEach((elementID, index) => {
    const resultElement = document.querySelector(`#${elementID}`);
    const { title, link } = results[index];
    resultElement.innerHTML = `${title}, <div> <a href="${link}" target="_blank">${link}</a> </div>`;
  });
  //přidat obrázky

  // Přidání tlačítka pro uložení
  const saveButton = document.getElementById("button");
  saveButton.addEventListener("click", () => saveResultsToFile(results));
  document.querySelector(".search-engine").appendChild(saveButton);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-keywords");
  searchGoogle(searchInput.value);
}

function searchGoogle(keywords) {
  let apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAS24ObvHc0y1rHtXTyu_59-kfA9MiaQCo&cx=66cd9a7c8106040bb&q=${keywords}`;
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
  let searchInput = document.querySelector("#input-keywords");

  // Nastavení výchozího hledaného slova
  let defaultKeyword = "collabim";
  searchInput.value = defaultKeyword;

  // Spuštění vyhledávání po načtení stránky s výchozím slovem
  searchGoogle(defaultKeyword);

  // Přidání posluchače pro změnu vstupu uživatele
  searchInput.addEventListener("input", function () {
    // Spuštění vyhledávání po každé změně vstupu
    searchGoogle(searchInput.value);
  });
});
