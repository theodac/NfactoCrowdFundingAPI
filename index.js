//import required module
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //post body handler
const Sequelize = require('sequelize'); //Database ORM
const { check, validationResult } = require('express-validator/check'); //form validation
const { matchedData, sanitize } = require('express-validator/filter'); //sanitize form params
const multer  = require('multer'); //multipar form-data
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
var multiparty = require('multiparty');

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//set static assets to public directory
app.use(express.static('public'));
const uploadDir = '/img/';
const storage = multer.diskStorage({
    destination: "./public"+uploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})

const upload = multer({storage: storage, dest: uploadDir });

//Set app config
const port = 3000;
const baseUrl = 'http://localhost:'+port;

//Connect to database
const sequelize = new Sequelize('androidproject', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

//Define models
const project = sequelize.define('project', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'id_user': Sequelize.INTEGER,
    'title': Sequelize.STRING,
    'description': Sequelize.STRING,
    'montant': Sequelize.INTEGER,
    'end_date': Sequelize.DATE,
    'picture': {
        type: Sequelize.STRING,
        //Set custom getter for project image using URL
        get(){
            const image = this.getDataValue('picture');
            return uploadDir+image;
        }
    },
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});

const user = sequelize.define('user', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'email': Sequelize.STRING,
    'password': Sequelize.STRING,
    'pseudo': Sequelize.STRING,
    'birthdate': Sequelize.DATE,
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});


const dons = sequelize.define('dons', {
    'User_id':  {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    'Project_id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    'montant': Sequelize.INTEGER,
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});

/**
 * Set Routes for CRUD
 */

//get all projects
app.get('/project/', (req, res) => {
    project.findAll().then(project => {
        res.json(project)
    })
})


//get book by isbn
app.get('/book/:isbn', (req, res) => {
    console.log('ok')
    book.findOne({where: {isbn: req.params.isbn}}).then(book => {
        res.json(book)
    })
})

//Insert operation
app.post('/project/add', [
    //File upload (karena pakai multer, tempatkan di posisi pertama agar membaca multipar form-data)
    upload.single('image'),

    //Set form validation rule
    check('title')
        .isLength({ min: 5 }

    ),
    check('montant')
        .isNumeric(),


],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ status: 'error', message:"Form error", data:null, errors: errors.mapped() });
    }
        var dateString = req.body.end_date; // Oct 23

        var dateParts = dateString.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    console.log(dateObject);

    project.create({
        title: req.body.title,
        montant: req.body.montant,
        end_date: dateObject,
        id_user: req.body.id_user,
        description: req.body.description,
        picture: req.file === undefined ? "" : req.file.filename
    }).then(newBook => {
        res.json({
            "status":"success",
            "message":"Project added",
            "data": newBook
        })
    })
})

app.get('/pinjam', (req, res) => {
    const sql = "SELECT Project_id, SUM(montant) as TOTAL_COSTS FROM dons WHERE Project_id = 2 GROUP BY Project_id";
    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    }).then(book => {
        res.json(book);
    })
})

app.post('/register',express.static('public'),(req,res) => {
    console.log('ok',req.body.password,req.body.email,req.body.pseudo,req.body.birthdate);
    console.log(req.body);
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        var password ;
        var dateString =  fields.birthday[0];

        var dateParts = dateString.split("/");

        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        console.log(dateObject);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(fields.password[0], salt, (err, hash) => {
                console.log(err);
                if (err) throw err;
                password = hash;
                user.create({
                    email: fields.username[0],
                    password: password,
                    pseudo:fields.pseudo[0],
                    birthdate: dateObject
                }).then(newBook => {
                    console.log('ok');
                    res.json({
                        "status":"success",
                        "message":"Project added",
                        "data": newBook
                    })
                })
            })
        });
        // fields fields fields
    });


})



app.post('/login',(req,res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        user.findOne({where: {email: fields.username[0]}}).then(book => {
            console.log(book.password);
            bcrypt.compare(fields.password[0], book.password)
                .then(function (result) {
                    console.log(result);
                    if(result  === true) {
                        console.log('ici');
                        res.json({
                            "status":"success",
                            "message":"Project added",
                            "data": book
                        })

                    } else {
                        return res.json({"status":"false",
                            "message":"Error",});
                    }
                })


        })
        // fields fields fields
    });


});

app.post('/dons',(req,res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        console.log(fields)
        dons.create({
            User_id: parseInt(fields.user_id[0]),
            Project_id: parseInt(fields.project_id[0]),
            montant: parseInt(fields.montant[0]),
        }).then(newBook => {
            res.json({
                "status":"success",
                "message":"Dons added",
                "data": newBook
            })
        })
    });

});

app.get('/find/dons/:id',(req,res) => {
    console.log('ok');
    const sql = "SELECT SUM(montant) as TOTAL_COSTS FROM dons WHERE Project_id = "+req.params.id+" GROUP BY Project_id";
    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    }).then(book => {
        console.log(book[0]);
        if(book[0] == undefined ){
            book[0] = {TOTAL_COSTS:'0'};
        }
        res.json(book[0]);
    })
});

app.listen(port, () => console.log("nfacto-raising-rest-api run on "+baseUrl ));
