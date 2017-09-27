var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');
var flag = $('#country-flag');

$('#search').click(searchCountries);
$(document).keypress(function (enter) {
    if(enter.which == 13) {
        searchCountries();
    }
});

//funkcja do wyszukiwania krajów
function searchCountries() {
    var countryName = $('#country-name').val();
    console.log(countryName);
    if(!countryName.length) countryName = 'Poland';
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList,
        error: showError
    });
}

function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function(item){
        $('<li>').text(item.name + ', ' + 'capital: ' + item.capital).appendTo(countriesList);
        $('<img>').attr('src', item.flag).appendTo(countriesList);
    });
}

function showError(err) {
    //$('h2').remove('h2');
    countriesList.empty();
    $('<p>').text('Oooops! Something went wrong! Status: ' + err.responseJSON.status + '; ' + err.responseJSON.message + '!').appendTo(countriesList);
    //$('<p>').text('Status: ' + err.responseJSON.status + '; ' + err.responseJSON.message + '!').appendTo(countriesList);
    console.log(err);
}