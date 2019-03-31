import {addNewDoctor, getDoctorById, loginDoctor} from "../controllers/doctorController";
import {
    addNewPatient,
    getPastientsByDocId,
    getPateintById,
    getPastientsByDeptName,
    patientLogin
} from "../controllers/PatientController";
import {addNewMesure, getMesureById} from '../controllers/mesureController';
import {addNewReco, getRecosByPatientid} from "../controllers/recommendationController";
const routes = (app) => {
    app.route('/doctor')
        .post(addNewDoctor);

    app.route('/doctor/:_id')
        .get(getDoctorById);

    app.route('/patient')
        .post(addNewPatient);

    app.route('/patient/:_id')
        .post(getPateintById);

    app.route('/patients/:_id')
        .get(getPastientsByDocId);
    app.route('patients/:_id/:deptName')
        .get(getPastientsByDeptName);

    app.route('/mesure')
        .post(addNewMesure);

    app.route('/mesure/:id/:pat_id')
        .get(getMesureById);


    app.route('/login')
        .post(loginDoctor);
    app.route('/loginPatient')
        .post(patientLogin);


    app.route('/recommendations/:patId')
        .get(getRecosByPatientid);
    app.route('/recommendation')
        .post(addNewReco);


};

export default routes;
