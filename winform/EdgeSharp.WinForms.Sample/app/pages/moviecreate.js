async function createMovie() {
    try {
        var movie = {};
        movie.Title = document.getElementById("createTitle").value;
        movie.Rating = document.getElementById("createRating").value;
        movie.ReleaseDate = document.getElementById("createReleaseDate").valueAsDate;
        movie.Genre = document.getElementById("createGenre").value;
        var price = document.getElementById("createPrice").value;
        movie.Price = parseFloat(price);

        var request = {};
        request.movie = movie;

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/moviecreate/post', JSON.stringify(request));

        if (result === true || result === 'true') {
            navigateTo('/movies');
        }

    } catch (err) {
        console.error(error);
    }
}


