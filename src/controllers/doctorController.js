import mongoose from 'mongoose';
import {DoctorSchema} from '../models/doctorModel';
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const Cryptr = require('cryptr');

const cryptr = new Cryptr('hamid');


const Doctor = mongoose.model('Doctor', DoctorSchema);

export const addNewDoctor = async (req, res) => {

    let newDoctor = new Doctor(req.body);
    newDoctor.password = await cryptr.encrypt(newDoctor.password);

    newDoctor.save((err, doctor) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(201).json(doctor);
    })
};

export const getDoctorById = (req, res) => {
    Doctor.findById(req.params._id, (err, doctor) =>{
        if (err) {
            res.send(err);
        }
        res.json(doctor);
    })
};

export const loginDoctor = async (req, res) => {
    console.log(req.body);
    let user = await Doctor.findOne({email: req.body.email });
    if (!user) return res.status(400).send({error : "invalid email or password"});
    let pass = cryptr.decrypt(user.password);
    let validPass = pass == req.body.password;
    if (!validPass) {
        return res.status(400).send({error : "invalid email or password"});
    }

    const token = jwt.sign({_id: user._id}, 'hamid');



    console.log(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
    res.status(200).header('access_token',token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
};
