import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const recoSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: Date.now()
    },
    date: {
        type: Date,
        default: Date.now()
    },
    num: {
        type: Number,
        default: 1
    }
});
