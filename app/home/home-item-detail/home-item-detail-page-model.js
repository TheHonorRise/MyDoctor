const observableModule = require("tns-core-modules/data/observable");
const dialogs = require("tns-core-modules/ui/dialogs");
const ObservableArray = require("data/observable-array").ObservableArray;
const appSettings = require("tns-core-modules/application-settings");

async function HomeItemDetailViewModel(context) {
    const id = appSettings.getString("_id");
    let h = '-';
    let b = '-';
    let s = '-';
    let t = '-';
    let c = '-';

    let reco ;

    const sens = ["heartBeat", "Blood Pressure", "SPO2", "Temp", "Blood Sugar"];
    await fetch(`http://192.168.43.240:8080/mesure/${sens[0]}/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            h = response[0].value;
        })
        .catch((e) => {
            console.log(e);
        });
    await fetch(`http://192.168.43.240:8080/mesure/${sens[1]}/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            b = response[0].value;
        })
        .catch((e) => {
            console.log(e);
        });
    await fetch(`http://192.168.43.240:8080/mesure/${sens[2]}/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            s = response[0].value;
        })
        .catch((e) => {
            console.log(e);
        });
    await fetch(`http://192.168.43.240:8080/mesure/${sens[3]}/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            t = response[0].value;
        })
        .catch((e) => {
            console.log(e);
        });
    await fetch(`http://192.168.43.240:8080/mesure/${sens[4]}/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            c = response[0].value;
        })
        .catch((e) => {
            console.log(e);
        });


    const viewModel = observableModule.fromObject({
        firstName: context.firstName,
        lastName: context.lastName,
        patientId: context._id,
        image: context.image,
        idd: "",
        RocDate: "20/mar/2018",
        description: "hamid tagona",
        recommendations: [],
        header: "",
        dialogOpen: false,
        lastMesure: [
            { name: "heartBeat", value: h },
            { name: "Blood Pressure", value: b },
            { name: 'SPO2', value: s },
            { name: 'Temp', value: t},
            { name: 'Blood Sugar', value: c }
        ],
        calories_data: [
            {
                day: Date.now(),
                count: 204
            },
            {
                day: Date.now(),
                count: 204
            },
            {
                day: Date.now(),
                count: 204
            },
            {
                day: Date.now(),
                count: 204
            },
            {
                day: Date.now(),
                count: 210
            }
        ],
        showDialog: function (args) {
            this.dialogOpen = true;

            const tappedItem = args.object.id;
            this.header = tappedItem;
            fetch(`http://192.168.43.240:8080/mesure/${tappedItem}/${this.patientId}`, {
                method: "GET",
                headers: { "content-type": "application/json" }
            })
                .then((r) => r.json())
                .then((response) => {
                    console.log(response);
                    const data = [];
                    response.map((m) => {
                        const day = new Date(m.date);
                        data.push({
                            day: day,
                            count: m.value
                        });
                    });
                    this.calories_data = data;
                    console.log(this.calories_data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        closeDialog: function () {
            this.dialogOpen = false;
        },
        submenu: function () {
            dialogs.alert({
                title: "Silence is Golden",
                okButtonText: "OK"
            });
        },
        showPrompt: function () {
            dialogs.prompt({
                title: "Ajouter une recommendation",
                okButtonText: "Envoyer",
                defaultText: "Default text",
                inputType: dialogs.inputType.text
            }).then(function (r) {
                fetch("http://192.168.43.240:8080/recommendation", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        patientId: context._id,
                        doctorId: id,
                        content: r.text
                    })
                })
                    .then((r) => {
                        fetch(`http://192.168.43.240:8080/recommendations/${context._id}`, {
                            method: "GET",
                            headers: { "content-type": "application/json" }
                        })
                            .then((r) => r.json())
                            .then((response) => {
                                let data = [];
                                response.map( r => {
                                    let n = new Date(r.date);
                                    r.date = n.toDateString();
                                    data.push(r);
                                });
                                viewModel.recommendations = data;
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                        return r.json();
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            });
        },
        showRecoDialog: function (args) {
            const view = args.view;
            const tappedItem = view.bindingContext;
            dialogs.alert({
                title: "La date: " + tappedItem.date,
                message: tappedItem.content,
                okButtonText: "OK"
            });
        }
    });
    fetch(`http://192.168.43.240:8080/recommendations/${context._id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
    })
        .then((r) => r.json())
        .then((response) => {
            let data = [];
            response.map( r => {
                let n = new Date(r.date);
                r.date = n.toDateString();
                data.push(r);
            });
            viewModel.recommendations = data;
        })
        .catch((e) => {
            console.log(e);
        });

    return viewModel;
}

module.exports = HomeItemDetailViewModel;
