const HomePatientModel = require("./home-page-model");
var frameModule = require("tns-core-modules/ui/frame");
var app = require("tns-core-modules/application");
var platform = require("platform");
var color = require("tns-core-modules/color");
const appSettings = require("application-settings");

async function onNavigatingTo(args) {
    const page = args.object;
    // console.log(args.context);
    var context ;

    const id = appSettings.getString("_id");

    await fetch(`http://192.168.1.103:8080/patient/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            console.log(response);
            context = response;
        })
        .catch((e) => {
            console.log(e);
        });

    page.bindingContext = await HomePatientModel(context);

    if (app.ios) {
        frameModule.topmost().ios.controller.navigationBar.barStyle = 1;
    }

    if (app.android && platform.device.sdkVersion >= '21') {
        var View = android.view.View;
        const window = app.android.foregroundActivity.getWindow();
        window.setStatusBarColor(new color.Color("#25325c").android);
    }
}

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;

