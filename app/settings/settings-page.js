const SettingsViewModel = require("./settings-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new SettingsViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
