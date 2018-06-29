const dotenv = require('dotenv');
dotenv.config();


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
function getUserById(id) {
    return db.oneOrNone('select * from Users where id=$1', [id]);
};
// Get User by Github Id
function getUserGithubId(id) {
    return db.any('select * from Users where GithubId=$1', [id]);
};
// Update User By ID
function setUserById(id,LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity){
    return db.result("update Users set(LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity)=('$1#', '$2#', '$3#', '$4#', '$5#', '$6#', '$7#', '$8#') where id=$9", [LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity,id])
}
// setUserById(
    // '4',
    // 'bye',
    // 'bye',
    // 'bye@bye.com',
    // '54',
    // '145',
    // '34',
    // 'Female',
    // 'Asian'
// )
// .then(console.log)
// .catch(console.log)
// Update User LastName
function setUserLastName(id, newTitle){
    return db.result("update Users set LastName='$1#' where id=$2", [newTitle, id]);
};
// Update User Email
function setUserEmail(id, newTitle){
    return db.result("update Users set Email='$1#' where id=$2", [newTitle, id]);
};
// Update User Height
function setUserHeight(id, newTitle){
    return db.result("update Users set Height='$1#' where id=$2", [newTitle, id]);
};
// Update User Weight
function setUserWeight(id, newTitle){
    return db.result("update Users set BodyWeight='$1#' where id=$2", [newTitle, id]);
};
// Update User Age
function setUserAge(id, newTitle){
    return db.result("update Users set Age='$1#' where id=$2", [newTitle, id]);
};
// DELETE USER
function deleteUserById(id){
    return db.result('delete from Users where id=$1', [id])
};
// ADD USER
function addUser(GithubId, LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity){
    return db.one("insert into Users (GithubId, LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity) values ($1, '$2#', '$3#', '$4#', '$5#', '$6#', '$7#', '$8#', '$9#') returning id", [GithubId, LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity]);
};

// var userInfo = [
//    '2',
//    'Bobby',
//    'Ricky',
//    'gotfast@one.com',
//    '14',
//    '123',
//    '213',
//    'on',
//    'Caucasian' 
// ]
// addUser(userInfo)
// .then(console.log)
// .catch(console.log)

// MED
// ----------------------------------------------

// Get All Medicine
function getAllMedicine() {
    return db.any('select * from Medicine');
};
// Get All Medicine by Id
function getAllMedicineByUserId(UserId) {
    return db.any('select * from Medicine where UserId=$1', [UserId]);
};
// Get All Med By Med ID
function getMedicineByMedId(MedId) {
    return db.oneOrNone('select * from Medicine where MedId=$1', [MedId]);
};
// Get All Medicine by Name
function getMedsByName(searchString){
    return db.any("select * from Medicine where title ilike '%$1#%'", [searchString]);
};

// Update Medicine By ID
function setMedById(MedId, MedName,  AmtAvail, LotNum, ExpDate){
    return db.result("update Medicine set(MedName, AmtAvail, LotNum, ExpDate)=('$1#', '$2#', '$3#', '$4#') where MedId=$5", [MedName, AmtAvail, LotNum, ExpDate, MedId])
};
// Update Medicine Name
function setMedName(MedId, newTitle){
    return db.result("update Medicine set MedName='$1#' where MedId=$2", [newTitle, MedId]);
};
// Update Medicine Amount
function setMedAmt(MedId, newTitle){
    return db.result("update Medicine set AmtAvail='$1#' where MedId=$2", [newTitle, MedId]);
};
// Update Medicine Lot#
function setMedLot(MedId, newTitle){
    return db.result("update Medicine set LotNum='$1#' where MedId=$2", [newTitle, MedId]);
};
// Update Medicine Exp Date
function setMedExpDate(MedId, newTitle){
    return db.result("update Medicine set ExpDate='$1#' where MedId=$2", [newTitle, MedId]);
};
// DELTE MEDS
function deleteMedById(MedId){
    return db.result('delete from Medicine where MedId=$1', [MedId])
};
// ADD MEDS
function addMed(MedName, UserId,  AmtAvail, LotNum, ExpDate){
    return db.one("insert into Medicine (MedName, UserId, AmtAvail, LotNum, ExpDate) values ('$1#', '$2#', '$3#', '$4#', '$5#') returning MedId", [MedName, UserId, AmtAvail, LotNum, ExpDate]);
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

// Get Specific Shot Records By Shot Id
function getShotRecord(ShotId){
    return db.oneOrNone('select * from Shot where ShotId=$1', [ShotId]);
};
// Update Shot Records By ID
function setShotById(ShotId, ShotTime, ShotLocation, Notes){
    return db.result("update Shot set(ShotTime, ShotLocation, Notes)=('$1#', '$2#', '$3#') where ShotId=$4", [ShotTime, ShotLocation, Notes, ShotId])
};
// Update Shot Time
function setShotTime(MedId, newTitle){
    return db.result("update Shot set ShotTime='$1#' where MedId=$2", [newTitle, MedId]);
};
// Update Shot Location
function setShotLocation(MedId, newTitle){
    return db.result("update Shot set ShotLocation='$1#' where MedId=$2", [newTitle, MedId]);
};
// Update Shot Notes
function setShotNotes(MedId, newTitle){
    return db.result("update Shot set Notes='$1#' where MedId=$2", [newTitle, MedId]);
};
// ADD NEW SHOT RECORD
function addShot(MedId, ShotTime, ShotLocation, Notes){
    return db.one("insert into Shot (MedId, ShotTime, ShotLocation, Notes) values ('$1#', '$2#', '$3#', '$4#') returning ShotId", [MedId, ShotTime, ShotLocation, Notes]);
};
// DELETE SHOT RECORD
function deleteShotById(ShotId){
    return db.result('delete from Shot where ShotId=$1', [ShotId])
};

// -------------------------------
module.exports = {
    getAllUsers,
    getUserById,
    getUserGithubId,
    getAllMedicine,
    getAllMedicineByUserId,
    getMedicineByMedId,
    getMedsByName,
    getAllShot,
    getMedShot,
    getShotRecord,
    setUserById,
    setUserLastName,
    setUserEmail,
    setUserHeight,
    setUserWeight,
    setUserAge,
    setShotById,
    setShotTime,
    setShotLocation,
    setShotNotes,
    setMedById,
    setMedName,
    setMedAmt,
    setMedLot,
    setMedExpDate,
    deleteMedById,
    deleteUserById,
    deleteShotById,
    addUser,
    addMed,
    addShot
};