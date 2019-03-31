import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const mesureSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    capteurId: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    value: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true
    }

});