const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const setupAuth = require('./auth');
const ensureAuthenticated = require('./auth').ensureAuthenticated;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const ShotTracker = require('./db');


const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

setupAuth(app);

// LOGIN PAGE/NAV
app.get('/', (req, res) => {
    res.render('homepage', {
        isLoggedIn: req.session.passport && req.session.passport.user
    });
});

// USER ROUTES-------------------------------------------------------------------------------

// LIST ALL USER INFO
app.get('/info', (req, res) => {
    ShotTracker.getUserById(req.session.passport.user)
        .then((data) => {
            console.log(data);
            res.render('infopage', data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// CREATE NEW USER
app.get('/newinfo', ensureAuthenticated, (req, res) => {
    ShotTracker.getUserById(req.session.passport.user)
    .then((data) => {
        console.log(data);
        res.render('info-create-page', data);
    })
    .catch((error) =>{
        console.log(error)
    });
});

app.post('/newinfo', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')
 
    ShotTracker.updateUser(
    req.body.LastName,
    req.body.FirstName,
    req.body.Email,
    req.body.Age,
    req.body.Height,
    req.body.Weight,
    req.body.Gender,
    req.body.Ethnicity)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/info`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// EDIT USER INFO BY ID
app.get('/:id/info', (req, res) =>{
    ShotTracker.getUserById(req.session.passport.user)
        .then((data) =>{
            console.log(data);
            res.render('info-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.post('/:id/info', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setUserById(
        req.params.id, 
        req.body.LastName, 
        req.body.FirstName, 
        req.body.Email, 
        req.body.Height, 
        req.body.BodyWeight, 
        req.body.Age, 
        req.body.Gender, 
        req.body.Ethnicity)
    .then((data) => {
        console.log(data);
        res.redirect(`/info`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// DELETE USER INFO
app.get('/:id/deleteinfo', (req, res) => {
    ShotTracker.getUserById(req.session.passport.user)
    .then((data) => {
        console.log(data);
        res.render('info-delete-page', data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/:id/deleteinfo', (req, res) => {
        ShotTracker.deleteUserById(req.session.passport.user)
        .then((data) => {
            console.log(data);
            res.render('infopage');
            })
        .catch((error) =>{
            console.log(error);
        })
});

// MED ROUTES-------------------------------------------------------------------------------


// LIST ALL MEDS
app.get('/med', (req, res) => {
    ShotTracker.getAllMedicineByUserId(req.session.passport.user)
        .then((data) => {
            console.log(data);
            res.render('medpage', {
                Medicine: data,
                // isLoggedIn: req.isAuthenticated()
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

// CREATE NEW MED
app.get('/newmed', (req, res) => {
    console.log('This is the /newmed route');
    res.render('med-create-page');
});

app.post('/newmed', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')

    ShotTracker.addMed(
    req.body.MedName,
    req.session.passport.user,
    req.body.AmtAvail,
    req.body.LotNum,
    req.body.ExpDate)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/med`);
    })
});

// EDIT MED INFO
app.get('/:medid/med', (req, res) =>{
    ShotTracker.getMedicineByMedId(req.params.medid)
        .then((data) =>{
            console.log(data);
            res.render('med-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.post('/:medid/med', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setMedById(
        req.params.medid, 
        req.body.MedName,   
        req.body.AmtAvail, 
        req.body.LotNum, 
        req.body.ExpDate)
    .then((data) => {
        console.log(data);
        res.redirect(`/med`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// DELETE MED INFO
app.get('/:medid/deletemed', (req, res) => {
    ShotTracker.getMedicineByMedId(req.params.medid)
    .then((data) => {
        console.log(data);
        res.render('med-delete-page', data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/:medid/deletemed', (req, res) => {
        ShotTracker.deleteMedById(req.params.medid)
        .then((data) => {
            console.log(data) 
            res.redirect('/med');
            })
        .catch((error) =>{
            console.log(error);
        });
    });

// SHOT ROUTES-------------------------------------------------------------------------------


// LIST ALL SHOT RECORDS
app.get('/record/:medid', (req, res) => {
    ShotTracker.getMedShot(req.params.medid)
        .then((data) => {
            console.log(data);
            res.render('recordpage', {
                Shot: data,
                medid: req.params.medid
                // isLoggedIn: req.isAuthenticated()
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

// CREATE NEW SHOT RECORD
app.get('/newrecord/:medid', (req, res) => {
    console.log('This is the /newrecord route');
    res.render('shot-create-page', {
        medid: req.params.medid
    });
});

app.post('/newrecord/:medid', (req, res) => {
    console.log(req.body);
    console.log(req.params.medid);
    // res.send('hey you submitted the form')
    ShotTracker.addShot(
    req.params.medid,
    req.body.ShotTime,
    req.body.ShotLocation,
    req.body.Notes)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/record/${req.params.medid}`);
    })
});

// EDIT SHOT RECORDS
app.get('/record/:medid/:shotid', (req, res) =>{
    ShotTracker.getShotRecord(req.params.shotid)
        .then((data) =>{
            console.log(data);
            res.render('shot-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});
console.log('WHAT UP')
app.post('/record/:medid/:shotid', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setShotById(
        req.params.shotid, 
        req.body.ShotTime, 
        req.body.ShotLocation, 
        req.body.Notes) 
    .then((data) => {
        console.log(data);
        res.redirect(`/record/${req.params.medid}`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// DELETE SHOT INFO
app.get('/deleterecord/:medid//:shotid', (req, res) => {
    ShotTracker.getShotRecord(req.params.shotid)
    .then((data) => {
        console.log(data);
        data.shotid=req.params.shotid;
        res.render('shot-delete-page', data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/deleterecord/:medid/:shotid', (req, res) => {
        ShotTracker.deleteShotById(req.params.shotid)
        .then((data) => {
            console.log(data) 
            res.redirect(`/record/${req.body.medid}`);
            })
        .catch((error) =>{
            console.log(error);
        });
    });


// LISTEN FOR LOCALHOST SERVER

app.listen(3000, () => {
    console.log('Your server is running!');
});