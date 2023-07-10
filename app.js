const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");

searchBtn.addEventListener("click",()=>{
    const countryName = countryInp.value;
    //handle empty value
    const finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalUrl).then((response)=> response.json()).then((data)=>{
        console.log(data[0].capital[0]);
    })
});