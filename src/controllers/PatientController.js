import {PatientSchema} from "../models/patientModel";
import mongoose from "mongoose";
const _ = require('lodash');
const Patient = mongoose.model('Patient', PatientSchema);

export const addNewPatient = (req, res) => {
    let newPatient = new Patient(req.body);

    newPatient.save((err, doctor) => {
        if (err) {
            res.send(err);
        }
        res.status(400).json(doctor);
    })
};

export const getPastientsByDocId = (req, res) =>{
    Patient.find({doctorId: req.params._id}, (err, patients) => {
        if (err){
            res.send(err);
        }
        res.json(patients);
    });
};

export const getPateintById = (req, res) => {
    Patient.findById(req.params._id, (err, patient) => {
        if (err) {
            res.send(err);
        }
        res.json(patient);
    });
};

export const getPastientsByDeptName = (req, res) => {
    Patient.find({doctorId: req.params._id, deptName: req.params.deptName}, (err, Patients) => {
        if (err) {
            res.send(err);
        }
        res.json(Patients);
    });
};

export const patientLogin = async (req, res) => {
    let user = await Patient.findOne({email: req.body.email });
    if (!user) return res.status(400).send({error : "invalid email or password"});
    let validPass = user.password == req.body.password;
    if (!validPass) {
        return res.status(400).send({error : "invalid email or password"});
    }
    console.log(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
    res.status(200).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
};
