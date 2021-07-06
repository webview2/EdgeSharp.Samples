function loadMovies_postMessage() {
    $('#moviesTable tbody').empty();

    window.external.Execute('/movies' + queryPath())
        .then(function (response) {
            var jsonData = JSON.parse(response);
            for (var i = 0; i < jsonData.Movies.length; i++) {
                var row = "<tr>";

                row += "<td>" + jsonData.Movies[i].Title + "</td>";
                row += "<td>" + jsonData.Movies[i].ReleaseDate + "</td>";
                row += "<td>" + jsonData.Movies[i].Genre + "</td>";
                row += "<td>" + jsonData.Movies[i].Price + "</td>";
                row += "<td>" + jsonData.Movies[i].Rating + "</td>";

                row += "<td>"
                    + "<a class=\"btn btn-info btn-sm\"     role=\"button\" href =\"#movieedit\"    onclick=\"action('/movieedit', " + jsonData.Movies[i].Id + "); return false;\">Edit</a>    &ensp;"
                    + "<a class=\"btn btn-success btn-sm\"  role=\"button\" href =\"#moviedetail\"  onclick=\"action('/moviedetails', " + jsonData.Movies[i].Id + "); return false;\">Details</a> &ensp;"
                    + "<a class=\"btn btn-danger btn-sm\"   role=\"button\" href =\"#moviedelete\"  onclick=\"action('/moviedelete', " + jsonData.Movies[i].Id + "); return false;\">Delete</a>"
                    + "</td>";

                row += "</tr>";
                $('#moviesTable tbody').append(row);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadMovies_httpClient() {
    $('#moviesTable tbody').empty();

    axios.get('http://edgesharp.com/movies' + queryPath())
        .then(response => {
            if (response.status == 200) {
                for (var i = 0; i < response.data['Movies'].length; i++) {
                    var row = "<tr>";

                    row += "<td>" + response.data['Movies'][i].Title + "</td>";
                    row += "<td>" + response.data['Movies'][i].ReleaseDate + "</td>";
                    row += "<td>" + response.data['Movies'][i].Genre + "</td>";
                    row += "<td>" + response.data['Movies'][i].Price + "</td>";
                    row += "<td>" + response.data['Movies'][i].Rating + "</td>";

                    row += "<td>"
                        + "<a class=\"btn btn-info btn-sm\"     role=\"button\" href =\"#movieedit\"    onclick=\"action('/movieedit', " + response.data['Movies'][i].Id + "); return false;\">Edit</a>    &ensp;"
                        + "<a class=\"btn btn-success btn-sm\"  role=\"button\" href =\"#moviedetail\"  onclick=\"action('/moviedetails', " + response.data['Movies'][i].Id + "); return false;\">Details</a> &ensp;"
                        + "<a class=\"btn btn-danger btn-sm\"   role=\"button\" href =\"#moviedelete\"  onclick=\"action('/moviedelete', " + response.data['Movies'][i].Id + "); return false;\">Delete</a>"
                        + "</td>";

                    row += "</tr>";
                    $('#moviesTable tbody').append(row);
                }
            }
            else {
                console.log(response);
            }
        })
        .catch(error => {
            console.log(error)
        });
}


async function loadMovies_hostObject() {
    $('#moviesTable tbody').empty();

    try {

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/movies' + queryPath(), null);

        var jsonData = JSON.parse(result);
        for (var i = 0; i < jsonData.Movies.length; i++) {
            var row = "<tr>";

            row += "<td>" + jsonData.Movies[i].Title + "</td>";
            row += "<td>" + jsonData.Movies[i].ReleaseDate + "</td>";
            row += "<td>" + jsonData.Movies[i].Genre + "</td>";
            row += "<td>" + jsonData.Movies[i].Price + "</td>";
            row += "<td>" + jsonData.Movies[i].Rating + "</td>";

            row += "<td>"
                + "<a class=\"btn btn-info btn-sm\"     role=\"button\" href =\"#movieedit\"    onclick=\"action('/movieedit', "       + jsonData.Movies[i].Id + "); return false;\">Edit</a>    &ensp;"
                + "<a class=\"btn btn-success btn-sm\"  role=\"button\" href =\"#moviedetail\"  onclick=\"action('/moviedetails', "    + jsonData.Movies[i].Id + "); return false;\">Details</a> &ensp;"
                + "<a class=\"btn btn-danger btn-sm\"   role=\"button\" href =\"#moviedelete\"  onclick=\"action('/moviedelete', "     + jsonData.Movies[i].Id + "); return false;\">Delete</a>"
                + "</td>";

            row += "</tr>";
            $('#moviesTable tbody').append(row);
        }

    } catch (err) {
        console.error(error);
    }
}

function queryPath() {
    var selElement = document.getElementById("movieGenre");
    var movieGenre = selElement.options[selElement.selectedIndex].value;
    if (movieGenre === null)
        movieGenre = '';

    var searchString = document.getElementById("searchString").value
    if (searchString === null)
        searchString = '';

    return '?movieGenre=' + movieGenre + '&searchString=' + searchString;
}

function action(pathname, id) {
    tempData.urlQueryPart = "?id=" + id + "";
    tempData.content = null;
    navigateTo(pathname);
}

function loadMovies() {
    if (tempData.selectedIpcOption === 'httpclient') {
        loadMovies_httpClient();
    } else if (tempData.selectedIpcOption === 'postmessage') {
        loadMovies_postMessage();
    } else {
        loadMovies_hostObject();
    }
}

tempData.urlQueryPart = null;
tempData.content = null;

loadMovies();
