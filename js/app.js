$('form').submit(function (evt) {
    // Prevent form from submitting
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
        // Removes Description Place Holder
        $('.desc').remove();
        // Log Response for debugging
        console.log(spotifyResponse);
        // Iterate through list and append to displayAlbumHTML variable
        $.each(spotifyResponse.albums.items, function (i,album) {
            displayAlbumHTML += `
	    			<li>
	    				<a href="${album.external_urls.spotify}" target="_blank" id=${i}>
	    					<div class="album-wrap">
	    						<img class="album-art" src="${album.images[0].url}">
	    					</div>
		    				<span class="album-title">${album.name}</span>
		    				<span class="album-artist">${album.artists[0].name}</span>
	    				</a>
	    			</li>
    			`;
        });

        $searchField.prop("disabled", false);
        $submitButton.attr("disabled", false);

        // If no results are found there will be nothing appended to the displayAlbumHTML variable
        // This notifies the user than no results were found
        if(displayAlbumHTML === '') {
            displayAlbumHTML = `
            <li class='no-albums'>
                <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${searchTerm}
            </li>`
        }
        // and the displayAlbumHTML to DOM
        $('#albums').html(displayAlbumHTML);

    }

    // Get request to Spotify
    $.getJSON(spotifyAPI,data,displayAlbum);
});