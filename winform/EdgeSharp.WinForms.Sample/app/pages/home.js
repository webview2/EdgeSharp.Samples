function getInfo_postMessage() {
    window.external.Execute('/info' )
        .then(function (response) {
            var jsonData = JSON.parse(response);
            $('#sdkVersion').html(jsonData.sdk);
            $('#runtimeVersion').html(jsonData.runtime);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function getInfo_httpClient() {
    axios.get('http://edgesharp.com/info')
        .then(response => {
            if (response.status == 200) {
                $('#sdkVersion').text(response.data.sdk);
                $('#runtimeVersion').text(response.data.runtime);
            }
            else {
                console.log(response);
            }
        })
        .catch(error => {
            console.log(error)
        });
}


async function getInfo_hostObject() {
    try {

        let remObject = await window.chrome.webview.hostObjects.execute;
        let result = await remObject.Send('/info', null);

        var jsonData = JSON.parse(result);
        $('#sdkVersion').html(jsonData.sdk);
        $('#runtimeVersion').html(jsonData.runtime);

    } catch (err) {
        console.error(err);
    }
}

function getInfo() {
    if (tempData.selectedIpcOption === 'httpclient') {
        getInfo_httpClient();
    } else if (tempData.selectedIpcOption === 'postmessage') {
        getInfo_postMessage();
    } else {
        getInfo_hostObject();
    }
}

getInfo();
