window.onload = function isChrome(){
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    if(is_chrome)
    {
        document.getElementById("chromeLog").innerHTML = "This is Chrome!";
    }

    if(!is_chrome)
    {
        document.getElementById("chromeLog").innerHTML = "Warning! This page is only tested with the Chrome browser.";
    }
}
function refreshPage() {
    var production = document.getElementsByName("production"); //or document.forms[0].elements;
    var removeFromProd = "";
    var queryElement = document.getElementById('query');
    var query = queryElement.textContent || queryElement.innerText;
    var oldRank = "";
    var rankString = "";

    for (var i = 0; i < production.length; i++) {
      if (production[i].type == "checkbox") {
        if (!production[i].checked) {
          removeFromProd += production[i].value + " ";
        }
      }
    }
    var non_production = document.getElementsByName("non-production"); //or document.forms[0].elements;
    var addToProd = "";
    for (var i = 0; i < non_production.length; i++) {
      if (non_production[i].type == "checkbox") {
        if (non_production[i].checked) {
          addToProd += non_production[i].value + " ";
        }
      }
    }
    var table = document.getElementById('prodTable');
    for (var i = 1; i < table.rows.length; i++) {
        oldRank = table.rows[i].cells[0].innerHTML;
        oldRank = $.trim(oldRank);
        if (parseInt(oldRank,10) != i){
            rankString += table.rows[i].id + "-" + i + " ";
        }
    }
    $.getJSON('http://localhost:5000/_refresh', {
        add_to_prod: addToProd,
        remove_from_prod: removeFromProd,
        update_rank: rankString,
        query: query
    })
    .done(function(data) { 
        if (!data.success){
            alert('HTTP method failed: ' + data.failedMethod); 
        }
    });
}

function openNewTab(Id, prod) {
    document.getElementById(Id).style.backgroundColor = '#85C2A3';

    var suggestionId = 'prod-sugg-' + Id;
    if (prod == 0){
        suggestionId = 'cand-sugg-' + Id;
    }

    var suggestion = document.getElementById(suggestionId).innerHTML;
    var query = encodeURIComponent(suggestion.replace(/&amp;/g, '&')); //or document.forms[0].elements;
    var url = "https://www.google.com/#q=" + query
    var win = window.open(url, '_blank');
}

function recountCheckboxes(Id) {
    var production = document.getElementsByName("production"); //or document.forms[0].elements;
    var count = 0;
    var currentID;

    for (var i = 0; i < production.length; i++) {
      if (production[i].type == "checkbox") {
        currentId = production[i].value;

        if (production[i].checked){
            count = count + 1;
        }
      }
    }
    document.getElementById("total-accepted").innerHTML = "Number checked: " + count;
    
    if (Id) {
        document.getElementById(Id).style.backgroundColor = '#ADC2FF';
    }
}

function clearHighlighting() {
    var table = document.getElementById('prodTable');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].style.backgroundColor = '#FFFFFF';
    }
}

function checkAll() {
    var production = document.getElementsByName("production"); //or document.forms[0].elements;

    for (var i = 0; i < production.length; i++) {
      if (production[i].type == "checkbox") {
        production[i].checked = true;
      }
    }
    // location.reload();
}

function uncheckAll() {
    var production = document.getElementsByName("production"); //or document.forms[0].elements;

    for (var i = 0; i < production.length; i++) {
      if (production[i].type == "checkbox") {
        production[i].checked = false;
      }
    }
    // location.reload();
}

function addSuggestionFunc() {
    var queryElement = document.getElementById('query');
    var query = queryElement.textContent || queryElement.innerText;
    var suggestion = document.getElementById("add_sugg").value; //or document.forms[0].elements;

    // Do something with suggestion
    $.getJSON('http://localhost:5000/_add_suggestion', {
        suggestion: suggestion,
        query: query
    });
    document.getElementById("add_sugg").value = "";
    //location.reload();
}
function validateForm() {
    var letters = /^[0-9a-zA-Z]+$/;  
    var x = document.forms["queryForm"]["query"].value;
    if (x == null || x == "") {
        alert("Cannot have empty search!");
        return false;
    }
    for (var i = 0; i < x.length; i++){
        if (!x.charAt(i).match(letters)) {  
            alert('Query can only contain numbers and letters!');  
            return false;  
        } 
    }
}