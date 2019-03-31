const HomeItemDetailViewModel = require("./home-item-detail-page-model");
var frameModule = require("tns-core-modules/ui/frame");
var app = require("tns-core-modules/application");
var platform = require("platform");
var color = require("tns-core-modules/color");


async function onNavigatingTo(args) {
    const page = args.object;
    // console.log(args.context);
    page.bindingContext = await HomeItemDetailViewModel(args.context);


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

