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

        if(displayAlbumHTML === '') {
            displayAlbumHTML = `
            <li class='no-albums'>
                <i class='material-icons icon-help'>help_outline</i>No albums found that match: [search form value].
            </li>`
        }

        $('#albums').html(displayAlbumHTML);

    }


    $.getJSON(spotifyAPI,data,displayAlbum);
});