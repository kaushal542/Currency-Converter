let currencies = ["INR","USD","AUD","EUR","JPY","BZD"];
let apiUrl = "https://api.exchangerate-api.com/v4/latest/";

function selectOptions(){

    let selects = document.querySelectorAll("select");
    
    selects.forEach((select) => {
     console.log(select)
     currencies.map((curr) => {
        console.log(curr);
        select.innerHTML += `<option value=${curr}>${curr}</option>`;
     });
    })
}

async function currencyRates(amount, fromCurrency, toCurrency){
  try{
    let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    console.log(response);
    let data = await response.json();
    console.log(data);
    return (amount * data.rates[toCurrency]).toFixed(2);
  } catch {
    alert("Conversion failed");
  }
}

let turnArrow = 0;

async function convertCurrency(event){
    //prevents auto form submit 
    event.preventDefault();

    let amount = document.getElementById("input").value;
    console.log(amount);
    let fromCurrency = document.getElementById("from").value;
    console.log(fromCurrency);
    let toCurrency = document.getElementById("to").value;
    console.log(toCurrency)
    let result = document.getElementById("output");
    let icon = document.getElementById("arrowIcon");


    if(amount =="" || amount <= 0){
        alert("Enter a valid amount");
        return;
    }
    result.value = await currencyRates(amount, fromCurrency, toCurrency);

    turnArrow += 180;
    icon.style.transform = `rotate(${turnArrow}deg)`;
    icon.style.transition = "transform 0.5s"
}

selectOptions();
