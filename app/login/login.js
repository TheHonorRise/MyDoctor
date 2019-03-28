const LoginViewModel = require("./login-view-model");
const appSettings = require("application-settings");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new LoginViewModel();

    const logged = appSettings.getBoolean("logged");
    const isDoctor = appSettings.getBoolean("isDoctor");
    if (logged) {
        const page = component.page;
        const myFrame = page.frame;
        if (isDoctor){
            myFrame.navigate("tab-view");
        }else {
            myFrame.navigate("hamid-patient");
        }
    }
}
// exports.submit = args => {

// }


exports.onNavigatingTo = onNavigatingTo;
