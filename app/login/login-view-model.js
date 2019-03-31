const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("application-settings");


function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "chci@gmail.com",
        password: "amada",
        isDoctor: false,
        _id : "",
        status : 1,
        error : "",
        submit(args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;
            if (this.isDoctor) {
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
                            appSettings.setBoolean("isDoctor", true);
                            myFrame.navigate("tab-view");
                        }
                    }).catch((e) => {
                    console.log(e);
                });
            }else {
                fetch("http://192.168.43.240:8080/loginPatient", {
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
                            appSettings.setBoolean("isDoctor", false);
                            myFrame.navigate("hamid-patient");
                        }
                    }).catch((e) => {
                    console.log(e);
                });
            }
        },
        toSignUp: function (args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;
            myFrame.navigate("signup/signup");
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
