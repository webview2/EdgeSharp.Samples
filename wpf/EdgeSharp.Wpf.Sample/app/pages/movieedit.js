async function loadMovie() {
    try {
        var query = '';
        if (tempData.urlQueryPart !== null) {
            query = tempData.urlQueryPart;
            tempData.urlQueryPart = null;
        }

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/movieedit/get' + query, null);

        if (result !== null) {
            var jsonData = JSON.parse(result);
            document.getElementById("editId").value = jsonData.Id;
            document.getElementById("editTitle").value = jsonData.Title;
            document.getElementById("editRating").value = jsonData.Rating;
            document.getElementById("editReleaseDate").valueAsDate = new Date(jsonData.ReleaseDate);
            document.getElementById("editGenre").value = jsonData.Genre;
            document.getElementById("editPrice").value = jsonData.Price;
        }

    } catch (err) {
        console.error(error);
    }
}

async function saveMovie() {
    try {

        var idstr = document.getElementById("editId").value;
        var id = parseInt(idstr);

        var movie = {};
        movie.Id = id;
        movie.Title = document.getElementById("editTitle").value;
        movie.Rating = document.getElementById("editRating").value;
        movie.ReleaseDate = document.getElementById("editReleaseDate").valueAsDate;
        movie.Genre = document.getElementById("editGenre").value;
        var priceStr = document.getElementById("editPrice").value;
        movie.Price = parseFloat(priceStr);

        var request = {};
        request.id = id;
        request.movie = movie;

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/movieedit/post', JSON.stringify(request));

        if (result === true || result === 'true') {
            navigateTo('/movies');
        }

    } catch (err) {
        console.error(error);
    }
}

loadMovie();
