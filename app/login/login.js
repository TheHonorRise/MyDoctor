const LoginViewModel = require("./login-view-model");
const appSettings = require("application-settings");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new LoginViewModel();

    const logged = appSettings.getBoolean("logged");
    if (logged) {
        const page = component.page;
        const myFrame = page.frame;
        myFrame.navigate("tab-view");
    }

}


// exports.submit = args => {

// }


exports.onNavigatingTo = onNavigatingTo;
