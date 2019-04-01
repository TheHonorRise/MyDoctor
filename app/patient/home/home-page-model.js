const observableModule = require("tns-core-modules/data/observable");
const dialogs = require("tns-core-modules/ui/dialogs");

async function HomePageModel(context) {
    let h = '-';
    let b = '-';
    let s = '-';
    let t = '-';
    let c = '-';

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
        description: "hamid tagona",
        dialogOpen: false,
        recommendations: [],
        mesureId: "",
        unit: "",
        value: "",
        RocDate: "2-mar",
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

            const tappedItem = args.object.id;
            const tappedItem1 = args.object.idd;
            this.mesureId = tappedItem;
            this.unit = tappedItem1;
            dialogs.prompt({
                title: "envoyer une mesure",
                okButtonText: "Envoyer",
                defaultText: "Default text",
                inputType: dialogs.inputType.text
            }).then( r => {
                fetch("http://192.168.43.240:8080/mesure", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        patientId: this.patientId,
                        capteurId: this.mesureId,
                        value: r.text,
                        unit: this.unit
                    })
                })
                    .catch((e) => {
                        console.log(e);
                    });
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

module.exports = HomePageModel;
