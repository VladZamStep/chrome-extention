// let myLeads = `['www.1.com', 'www.2.com', 'www.3.com']`;

let myLeads = [];

const inputAreaEl = document.getElementById('input-el');
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");

//Вытаскиваем из localStorage данные, что ввели перед перезагрузкой страницы
const leadsFromLocalStarage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStarage) {
    myLeads = leadsFromLocalStarage;
    render(myLeads);
}

// localStorage.setItem("Greetings", "Hello, Vlad")
// let greetings = localStorage.getItem("Greetings");
// console.log(greetings)

inputBtn.addEventListener("click", function () {
    myLeads.push(inputAreaEl.value);
    inputAreaEl.value = '';
    //Запихиваем новый элемент массива в localStorage
    //'myLeads' - ключ, JSON.stringify(myLeads) - значение
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads);
    console.log(localStorage.getItem('myLeads'))
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads);
    })

    // console.log(localStorage.getItem('tabs'))

    //console.log(tabs[0].url);  //value
    //console.log(tabs[0]);      //object
})


function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a href=${leads[i]} target='_blank'> ${leads[i]} </a></li>`;
    }
    ulEl.innerHTML = listItems;
}