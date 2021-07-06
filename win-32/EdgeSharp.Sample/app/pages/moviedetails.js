async function loadMovie() {
    try {
        var query = '';
        if (tempData.urlQueryPart !== null) {
            query = tempData.urlQueryPart;
            tempData.urlQueryPart = null;
        }

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/moviedetails/get' + query, null);

        if (result !== null) {
            var jsonData = JSON.parse(result);
            document.getElementById("detTitle").innerHTML = jsonData.Title;
            document.getElementById("detReleaseDate").innerHTML = jsonData.ReleaseDate;
            document.getElementById("detGenre").innerHTML = jsonData.Genre;
            document.getElementById("detPrice").innerHTML = jsonData.Price;
        }

    } catch (err) {
        console.error(error);
    }
}

loadMovie();
