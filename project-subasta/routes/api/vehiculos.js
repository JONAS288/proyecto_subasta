var express = require('express');
var router = express.Router();
var dbConn = require('./../../lib/db');
const vehicles = require("./../../controllers/vehiculos-controllers");


// router.get('/', function (req, res) {
//     dbConn.query('SELECT * FROM vehiculos ORDER BY idvehiculos desc',function(err,rows)     {
//         if (error) throw error;
//         return res.send({ error: false, data: rows, message: 'Successfully added' });
//     });
// });

// retrieve all customers
router.get("/vehiculos", vehicles.findAll);
router.get("/vehiculosArray", vehicles.findAllArray);
router.get("/vehiculosArray/:id", vehicles.findOne);
router.get("/vehiculosJsonText", vehicles.findAllJsonText);

module.exports = router;