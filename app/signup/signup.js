const SignUpViewModel = require("./signup-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new SignUpViewModel();
}
// exports.submit = args => {

// }


exports.onNavigatingTo = onNavigatingTo;
