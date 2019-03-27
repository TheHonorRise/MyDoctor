const HomeItemsViewModel = require("./home-items-view-model");
const appSettings = require("tns-core-modules/application-settings");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new HomeItemsViewModel();

    const id = appSettings.getString("_id");
    fetch(`http://192.168.43.240:8080/patients/${id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            component.bindingContext.items = response;
        })
        .catch((e) => {
            console.log(e);
        });
}

function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;

    page.frame.navigate({
        moduleName: "home/home-item-detail/home-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
