const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("application-settings");


function SignUpViewModel() {
    const viewModel = observableModule.fromObject({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        address: "",
        tele: 212,
        birth: Date.now(),
        status : 1,
        error : "",
        submit(args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;

            fetch("http://192.168.43.240:8080/doctor", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
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

                    return r.json();
                })
                .then((response) => {
                    if (this.status == 400) {
                        this.error = response.error;
                    } else {
                        myFrame.navigate("login/login");
                    }
                }).catch((e) => {
                console.log(e);
            });
        },
        toLogin: function (args) {
            const button = args.object;
            const page = button.page;
            const myFrame = page.frame;
            myFrame.navigate("login/login");
        }
    });

    return viewModel;
}

module.exports = SignUpViewModel;
