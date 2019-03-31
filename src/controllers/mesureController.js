import mongoose from 'mongoose';
import {mesureSchema} from '../models/mesureModel'






const Mesure = mongoose.model('Mesure', mesureSchema);

export const addNewMesure = (req, res) => {
    let newMesure = new Mesure(req.body);
    newMesure.save((err, mesure) => {
        if (err){
            res.send(err);
        }
        res.status(500).json(mesure);
    });
};

export const getMesureById = (req, res) => {
    Mesure.find({capteurId: req.params.id, patientId: req.params.pat_id}, (err, mesure) => {
        if (err) {
            res.send(err);
        }
        mesure.reverse();
        res.send(mesure);
    });
};
