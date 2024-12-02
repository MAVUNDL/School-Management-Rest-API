const pool = require("../../db"); // create database object
const queries = require("./queries"); // create object to access queries

// get all schools from database
const getSchools = (req, res) => {
    pool.query(queries.getAllSchools, (err, results) => {
        try{
            res.status(200).json(results.rows);
        } catch(err){
            console.log("Error can't get schools from database");
        }
        
    });
};

// add a school to the database
const addSchool = (req, res) => {
    // destructuring
    const {natemis, datayear, provincecd, province, institution_name, status, sector,
        typedoe, phase, specialization, ownerland, ownerbuild, ownership, exdept,
        paypointno, componentno, examno, examcentre, gis_longitude, gis_latitude,
        gissource, magisterial_district, dmunname, lmunname, ward_id, eiregion,
        eidistrict, eicircuit, addressee, township_village, suburb, town_city,
        streetaddress, postaladdress, telephone, facsimile, section21, section21_funct,
        quintile, nas, nodalarea, registrationdate, nofeeschool, allocation,
        urban_rural, open_boarding_school, educator_number_2017, learner_number_2017
        } = req.body;

        if (!natemis || !institution_name || !status || !sector || !type_doe || !phase || !specialization || !ownerland) {
            return res.status(400).send("Missing required fields");
        }
        
        // check is school with emis number already exist
        pool.query(queries.checkEmisNumber, [natemis], (err, results) => {
            if(results.rows.length){
                res.send("School with this emis number arealdy exits");
            };

            // add school
            pool.query(queries.addSchool, [natemis, datayear, provincecd, province, institution_name, status, sector,
                typedoe, phase, specialization, ownerland, ownerbuild, ownership, exdept,
                paypointno, componentno, examno, examcentre, gis_longitude, gis_latitude,
                gissource, magisterial_district, dmunname, lmunname, ward_id, eiregion,
                eidistrict, eicircuit, addressee, township_village, suburb, town_city,
                streetaddress, postaladdress, telephone, facsimile, section21, section21_funct,
                quintile, nas, nodalarea, registrationdate, nofeeschool, allocation,
                urban_rural, open_boarding_school, educator_number_2017, learner_number_2017
                ], (err, results) => {
                    res.status(201).send("School successfully added");
                });
        });
};

// get school by emis numner
const getSchoolbyEmis = (req, res) => {
    const natemis = parseInt(req.params.natemis);
    pool.query(queries.getSchoolByEmis, [natemis], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
};
// Update number of teachers
const updateTeachersNumber = (req, res) => {
    const natemis = parseInt(req.params.natemis);
    const { educator_number_2017 } = req.body;

    pool.query(queries.getSchoolByEmis, [natemis], (err, results) => {
        if (err) return res.status(500).send("Error fetching school data");

        if (!results.rows.length) {
            return res.status(404).send("School with that EMIS number does not exist");
        }

        pool.query(queries.updateSchoolTeacherNo, [educator_number_2017, natemis], (err, results) => {
            if (err) return res.status(500).send("Error updating number of teachers");

            res.status(200).send("Number of teachers updated successfully");
        });
    });
};

// Update number of learners
const updateLeanersNumber = (req, res) => {
    const natemis = parseInt(req.params.natemis);
    const { learner_number_2017 } = req.body;

    pool.query(queries.getSchoolByEmis, [natemis], (err, results) => {
        if (err) return res.status(500).send("Error fetching school data");

        if (!results.rows.length) {
            return res.status(404).send("School with that EMIS number does not exist");
        }

        pool.query(queries.updateSchoolLeanersNo, [learner_number_2017, natemis], (err, results) => {
            if (err) return res.status(500).send("Error updating number of learners");

            res.status(200).send("Number of learners updated successfully");
        });
    });
};


module.exports = {
    getSchools,
    addSchool,
    getSchoolbyEmis,
    updateLeanersNumber,
    updateTeachersNumber,
}