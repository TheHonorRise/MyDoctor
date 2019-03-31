import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DoctorSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter first name'
    },
    lastName: {
        type: String,
        required: 'Enter last name'
    },
    email: {
        type: String,
        required: 'Enter Email'
    },
    sex: {
        type: Boolean,
        default: true
    },
    birthday: {
        type: Date,
    },
    phone: {
        type: Number
    },
    address:{
        type: String
    },
    password:{
        type: String,
        required: 'Enter Password'
    }
});
