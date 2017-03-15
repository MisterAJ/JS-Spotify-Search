$('form').submit(function (evt) {
    evt.preventDefault();
    let $searchField = $('#search');
    let $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val('searching...');


    let spotifyAPI = "https://api.spotify.com/v1/search";
    let searchTerm = encodeURI($search.val());
    let data = {q: searchTerm};
    function displayAlbum() {




        $searchField.prop("disabled", false);
        $submitButton.attr("disabled", false);
    }

    $.getJSON(spotifyAPI,data,displayAlbum);
});