import mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter first name'
    },
    lastName: {
        type: String,
        required: 'Enter last name'
    },
    doctorId: {
        type: String,
        required: 'Enter Doctor s Id'
    },
    deptName: {
        type: String,
        required: true
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
        default: Date.now()
    },
    height: {
        type: Number,
        required: 'Enter patient height'
    },
    weight: {
        type: Number,
        required: 'Enter patient weight'
    },
    phone: {
        type: Number,
        default: 1111
    },
    address:{
        type: String,
        default: 'hamid street'
    },
    password:{
        type: String,
        required: 'Enter Password'
    },
    image:{
        type: String,
        default: 'http://i.pravatar.cc/300'
    }
});

export const deptSchema = new Schema({
    deptName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});
