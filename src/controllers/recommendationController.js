import mongoose from 'mongoose';
import {recoSchema} from "../models/recommendationModel";

const _ = require('lodash');


const Recommendation = mongoose.model('Recommendation', recoSchema);

export const getRecosByPatientid = (req, res) =>{
    Recommendation.find({ patientId: req.params.patId }, (err, recos) => {
        if (err) {
            res.send(err);
        }
        recos.reverse();
        for (let i = 0; i<recos.length; i++){
            recos[i].num = i + 1;
            console.log(recos[i]);
        }
        res.json(recos);
    });
};

export const addNewReco = (req, res) =>{
    let newReco = new Recommendation(req.body);
    newReco.save((err, reco) => {
        if (err){
            res.send(err);
        }
        res.status(500).json(reco);
    });
}
