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

    const sens = ["heartBeat", "blood presure", "spo2", "temp", "clucometre"];
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
        RocDate: "20/mar/2018",
        description: "hamid tagona",
        recommendations: [],
        dialogOpen: false,
        lastMesure: [
            { name: "heartBeat", value: h },
            { name: "blood presure", value: b },
            { name: 'spo2', value: s },
            { name: 'temp', value: t},
            { name: 'clucometre', value: c }
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
                title: "Ajouter une recomendations",
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
                                viewModel.recommendations = response;
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
                title: "La date" + tappedItem.date,
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
            viewModel.recommendations = response;
        })
        .catch((e) => {
            console.log(e);
        });

    return viewModel;
}

module.exports = HomeItemDetailViewModel;
