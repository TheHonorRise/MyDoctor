const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
const dialogs = require("tns-core-modules/ui/dialogs");
function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        items: [],
    });
    // appSettings.setString("_id", "5c86354ddece193114a52438");

    return viewModel;
}

module.exports = HomeItemsViewModel;
