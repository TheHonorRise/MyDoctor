const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
function BrowseViewModel() {
    const id = appSettings.getString("_id");
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        address: "",
        tele: 212,
        status : 1,
        error : "",
        submit(args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;

            fetch("http://192.168.43.240:8080/patient", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    doctorId: id,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    phone: this.tele,
                    birthday: this.birth
                })
            })
                .then((r) => {
                    console.log(r.headers.status);
                    this.status = r.status;
                    myFrame.navigate("home/home-items-page");
                    return r.json();
                })
                .catch((e) => {
                console.log(e);
            });
        }
    });

    return viewModel;
}

module.exports = BrowseViewModel;
