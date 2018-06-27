const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'shottracker',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);


// USER
// --------------------------------------------

// Get All Users
function getAllUsers() {
    return db.any('select * from Users');
};
// Get All Users by Id
function getAllUsersById(id) {
    return db.any('select * from Users where id=$1', [id]);
};
// Update User LastName
function setUserLastName(id, newTitle){
    return db.result("update User set LastName='$1#' where id=$2", [newTitle, id]);
};
// Update User Email
function setUserEmail(id, newTitle){
    return db.result("update User set Email='$1#' where id=$2", [newTitle, id]);
};
// Update User Height
function setUserHeight(id, newTitle){
    return db.result("update User set Height='$1#' where id=$2", [newTitle, id]);
};
// Update User Weight
function setUserWeight(id, newTitle){
    return db.result("update User set BodyWeight='$1#' where id=$2", [newTitle, id]);
};
// Update User Age
function setUserAge(id, newTitle){
    return db.result("update User set Age='$1#' where id=$2", [newTitle, id]);
};
// DELETE USER
function deleteUserById(id){
    return db.result('delete from User where id=$1', [id])
}
// ADD USER
function addUser(LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity){
    return db.one("insert into User (LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity) values ('$1#', '$2#', '$3#', '$4#', '$5#', '$6#', '$7#', '$8#') returning id", [LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity]);
};
// MED
// ----------------------------------------------

// Get All Medicine
function getAllMedicine() {
    return db.any('select * from Medicine');
};
// Get All Medicine by Id
function getAllMedicineById(MedId) {
    return db.any('select * from Medicine where id=$1', [MedId]);
};
// Get All Medicine by Name
function getMedsByName(searchString){
    return db.any("select * from Medicine where title ilike '%$1#%'", [searchString]);
};
// Update Medicine Name
function setMedName(MedId, newTitle){
    return db.result("update Medicine set MedName='$1#' where id=$2", [newTitle, MedId]);
};
// Update Medicine Amount
function setMedAmt(MedId, newTitle){
    return db.result("update Medicine set AmtAvail='$1#' where id=$2", [newTitle, MedId]);
};
// Update Medicine Lot#
function setMedLot(MedId, newTitle){
    return db.result("update Medicine set LotNum='$1#' where id=$2", [newTitle, MedId]);
};
// Update Medicine Exp Date
function setMedExpDate(MedId, newTitle){
    return db.result("update Medicine set ExpDate='$1#' where id=$2", [newTitle, MedId]);
};
// DELTE MEDS
function deleteMedById(MedId){
    return db.result('delete from Medicine where id=$1', [MedId])
}
// ADD MEDS
function addMed(MedName, id,  AmtAvail, LotNum, ExpDate){
    return db.one("insert into Medicine (MedName, id, AmtAvail, LotNum, ExpDate) values ('$1#', '$2#', '$3#', '$4#', '$5#') returning id", [MedName, id, AmtAvail, LotNum, ExpDate]);
};

// SHOTS
// ------------------------------------------------

// Get All Shot Records
function getAllShot(){
    return db.any('select * from Shot');
};
// Get All Shot Records By Med Id
function getMedShot(MedId){
    return db.any('select * from Shot where MedId=$1', [MedId]);
};
// Update Shot Time
function setShotTime(MedId, newTitle){
    return db.result("update Shot set ShotTime='$1#' where id=$2", [newTitle, MedId]);
};
// Update Shot Location
function setShotLocation(MedId, newTitle){
    return db.result("update Shot set ShotLocation='$1#' where id=$2", [newTitle, MedId]);
};
// Update Shot Notes
function setShotNotes(MedId, newTitle){
    return db.result("update Shot set Notes='$1#' where id=$2", [newTitle, MedId]);
};
// ADD NEW SHOT RECORD
// ADD MEDS
function addShot(MedId, ShotTime, ShotLocation, Notes){
    return db.one("insert into Shot (MedId, ShotTime, ShotLocation, Notes) values ('$1#', '$2#', '$3#', '$4#') returning id", [MedId, ShotTime, ShotLocation, Notes]);
};

// ADD
// ---------------------------------------------

module.exports = {
    getAllUsers,
    getAllUsersById,
    getAllMedicine,
    getAllMedicineById,
    getMedsByName,
    getAllShot,
    getMedShot,
    setUserLastName,
    setUserEmail,
    setUserHeight,
    setUserWeight,
    setUserAge,
    setShotTime,
    setShotLocation,
    setShotNotes,
    setMedName,
    setMedAmt,
    setMedLot,
    setMedExpDate,
    deleteMedById,
    deleteUserById,
    addUser,
    addMed,
    addShot
};
