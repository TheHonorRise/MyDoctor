const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("application-settings");


function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "hamada@gmail.com",
        password: "Half.Blood.2491",
        _id : "",
        status : 1,
        error : "",
        submit(args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;

            fetch("http://192.168.43.240:8080/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
                .then((r) => {
                    console.log(r.headers.status);
                    this.status = r.status;

                    return r.json();
                })
                .then((response) => {
                    if (this.status == 400) {
                        this.error = response.error;
                    } else {
                        console.log(response);
                        appSettings.setString("_id", response._id);
                        appSettings.setBoolean("logged", true);
                        myFrame.navigate("tab-view");
                    }
                }).catch((e) => {
                console.log(e);
            });

        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
