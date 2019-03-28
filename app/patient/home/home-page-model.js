const observableModule = require("tns-core-modules/data/observable");
const dialogs = require("tns-core-modules/ui/dialogs");

async function HomePageModel(context) {
    let h = '-';
    let b = '-';
    let s = '-';
    let t = '-';
    let c = '-';

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
        description: "hamid tagona",
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
        }
    });


    return viewModel;
}

module.exports = HomePageModel;
