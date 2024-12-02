// query to add schoo
const addSchool =  `
INSERT INTO schools (
    natemis, datayear, provincecd, province, institution_name, status, sector,
    typedoe, phase, specialization, ownerland, ownerbuild, ownership, exdept,
    paypointno, componentno, examno, examcentre, gis_longitude, gis_latitude,
    gissource, magisterial_district, dmunname, lmunname, ward_id, eiregion,
    eidistrict, eicircuit, addressee, township_village, suburb, town_city,
    streetaddress, postaladdress, telephone, facsimile, section21, section21_funct,
    quintile, nas, nodalarea, registrationdate, nofeeschool, allocation,
    urban_rural, open_boarding_school, educator_number_2017, learner_number_2017
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, $14, 
    $15, $16, $17, $18, $19, $20, 
    $21, $22, $23, $24, $25, $26, 
    $27, $28, $29, $30, $31, $32, 
    $33, $34, $35, $36, $37, $38, 
    $39, $40, $41, $42, $43, $44, 
    $45, $46, $47, $48
)
`;
// query to get all schools
const getAllSchools = "select * from schools order by natemis ASC";

// query to get school by Emis number
const getSchoolByEmis = "select * from schools  where natemis =$1"

// query to remove schools from database by emis number
const removeSchool = "delete from schools where natemis =$1"

// query to update school information
const updateSchoolTeacherNo = "update schools set educator_number_2017 =$1 where natemis =$2";
const updateSchoolLeanersNo = "update schools set learner_number_2017 =$1 where natemis =$2";

// query to check if school with emis number already exist
const checkEmisNumber = "select s from schools s where s.natemis =$1";

module.exports = {
    addSchool,
    getAllSchools,
    getSchoolByEmis,
    removeSchool,
    checkEmisNumber,
    updateSchoolLeanersNo,
    updateSchoolTeacherNo,
}