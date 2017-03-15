$('form').submit(function (evt) {
    evt.preventDefault();
    let $searchField = $('#search');
    let $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val('searching...');


    let spotifyAPI = "https://api.spotify.com/v1/search";
    let searchTerm = $searchField.val();
    let data = {q: searchTerm,
                type: "album"};
    console.log(data);

    let displayAlbumHTML = '';
    function displayAlbum(spotifyResponse) {
        $('.desc').remove();
        $.each(spotifyResponse.albums.items, function (i,item) {
            displayAlbumHTML += `
	    			<li>
	    				<a href="${item.external_urls.spotify}" id=${i}>
	    					<div class="album-wrap">
	    						<img class="album-art" src="${item.images[0].url}">
	    					</div>
		    				<span class="album-title">${item.name}</span>
		    				<span class="album-artist">${item.artists[0].name}</span>
	    				</a>
	    			</li>
    			`;
        });

        $searchField.prop("disabled", false);
        $submitButton.attr("disabled", false);
        $('#albums').html(displayAlbumHTML);
    }

    $.getJSON(spotifyAPI,data,displayAlbum);
});