const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const result = document.querySelector(".result");

searchBtn.addEventListener("click", () => {
    const countryName = countryInp.value;
    const finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalUrl).then((response) => response.json()).then((data) => {
        console.log(data[0].capital[0]);
        /*console.log(data[0].flags.png);
        console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
        console.log(Object.values(data[0].languages).toString().split(',').join(', '))*/

        let displayDet = `
        <img src="${data[0].flags.svg}" alt="data[0].flags.alt" class="flag-img" />
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).toString().split(',').join(', ')}</span>
            </div>
        </div>`

        result.innerHTML = displayDet;

    }).catch(() => {
        if (countryName.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
          } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
          }
        
    })
});