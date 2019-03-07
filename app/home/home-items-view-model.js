const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        items: []
    });
    const id = appSettings.getString("_id");
    fetch("http://192.168.43.240:8080/patients/5c6d6f13d13eea03a474819a", {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
        console.log(e);
    });


    return viewModel;
}

module.exports = HomeItemsViewModel;
