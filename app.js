const searchBtn1 = document.getElementById("search-btn-1");
const searchBtn2 = document.getElementById("search-btn-2");
const searchBtn3 = document.getElementById("search-btn-3");
const searchBtn4 = document.getElementById("search-btn-4");
const btnContainer = document.querySelector('.btn-group');
const btns = document.querySelectorAll('.btn');
const searchQuery = document.querySelectorAll('.search-wrapper');

let feature = 'country';
btnContainer.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    feature = id;
    if (id) {
        btns.forEach((btn) => {
            btn.classList.remove("active");
        })
        e.target.classList.add("active");
        searchQuery.forEach((query) => {
            query.classList.remove("active");
        })
        const element = document.getElementById(id);
        element.classList.add("active");
    }
});

const result = document.querySelector(".result");

function fixedTemp(data, idx) {
    return `
    <img src="${data[idx].flags.svg}" alt="data[0].flags.alt" class="flag-img" />
    <h2>${data[idx].name.common}</h2>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${data[idx].capital[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${data[idx].continents[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${data[idx].population}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${data[idx].currencies[Object.keys(data[idx].currencies)[0]].name} - ${Object.keys(data[idx].currencies)[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(data[idx].languages).toString().split(',').join(', ')}</span>
        </div>
    </div>`;
}

searchBtn1.addEventListener("click", () => {
    const countryInp = document.getElementById("country-inp");
    const inputValue = countryInp.value;
    const finalUrl = `https://restcountries.com/v3.1/name/${inputValue}?fullText=true`;

    fetch(finalUrl).then((response) => response.json()).then((data) => {
        /*console.log(data[0].capital[0]);
        console.log(data[0].flags.png);
        console.log(Object.keys(data[0].currencies)[0]);
        console.log(Object.values(data[0].languages).toString().split(',').join(', '))*/

        let displayDet = fixedTemp(data, 0);
        result.innerHTML = displayDet;

    }).catch(() => {
        if (inputValue.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }

    })
});

searchBtn2.addEventListener("click", () => {
    const nameInp = document.getElementById("name-inp");
    const inputValue = nameInp.value;
    const finalUrl = `https://restcountries.com/v3.1/name/${inputValue}`;

    fetch(finalUrl).then((response) => response.json()).then((data) => {
        if (data.message) {
            throw "not found";
        }

        const countries = [];
        for (let i = 0; i < data.length && i < 50; i++) {
            countries.push(i);
        }
        const countryBtns = countries
            .map(function (country) {
                return `<button type="button" class="filter-btn" data-id=${country}>
            ${data[country].name.common}
          </button>`;
            })
            .join("");

        result.innerHTML = countryBtns;

        const filterBtns = result.querySelectorAll(".filter-btn");
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const category = e.currentTarget.dataset.id;
                const idx = parseInt(category);
                let displayDet = fixedTemp(data, idx);
                result.innerHTML = displayDet;
            })
        })



    }).catch(() => {
        if (inputValue.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }

    })
});

searchBtn3.addEventListener("click", () => {
    const regionInp = document.getElementById("region-inp");
    const inputValue = regionInp.value;
    const finalUrl = `https://restcountries.com/v3.1/region/${inputValue}`;

    fetch(finalUrl).then((response) => response.json()).then((data) => {
        if (data.message) {
            throw "not found";
        }

        const countries = [];
        for (let i = 0; i < data.length && i < 40; i++) {
            countries.push(i);
        }
        const countryBtns = countries
            .map(function (country) {
                return `<button type="button" class="filter-btn" data-id=${country}>
            ${data[country].name.common}
          </button>`;
            })
            .join("");

        result.innerHTML = countryBtns;

        const filterBtns = result.querySelectorAll(".filter-btn");
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const category = e.currentTarget.dataset.id;
                const idx = parseInt(category);
                let displayDet = fixedTemp(data, idx);
                result.innerHTML = displayDet;
            })
        })

    }).catch(() => {
        if (inputValue.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }

    })
});

searchBtn4.addEventListener("click", () => {
    const capitalInp = document.getElementById("capital-inp");
    const inputValue = capitalInp.value;
    const finalUrl = `https://restcountries.com/v3.1/capital/${inputValue}`;

    fetch(finalUrl).then((response) => response.json()).then((data) => {
        let displayDet = fixedTemp(data, 0);
        result.innerHTML = displayDet;

    }).catch(() => {
        if (inputValue.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }

    })
});

const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.classList.add("hide-preloader");
})