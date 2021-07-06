async function loadMovie() {
    try {
        var query = '';
        if (tempData.urlQueryPart !== null) {
            query = tempData.urlQueryPart;
            tempData.urlQueryPart = null;
        }

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/moviedelete/get' + query, null);

        if (result !== null) {
            var jsonData = JSON.parse(result);
            document.getElementById("delId").value = jsonData.Id;
            document.getElementById("delTitle").innerHTML  = jsonData.Title;
            document.getElementById("delReleaseDate").innerHTML  = jsonData.ReleaseDate;
            document.getElementById("delGenre").innerHTML  = jsonData.Genre;
            document.getElementById("delPrice").innerHTML  = jsonData.Price;
        }

    } catch (err) {
        console.error(error);
    }
}

async function deleteMovie() {
    try {

        var idstr = document.getElementById("delId").value;
        var id = parseInt(idstr);

        var request = {};
        request.id = id;

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/moviedelete/confirmed', JSON.stringify(request));

        if (result === true || result === 'true') {
            navigateTo('/movies');
        }

    } catch (err) {
        console.error(error);
    }
}

loadMovie();

