var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 

router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM vehiculos ORDER BY idvehiculos desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('vehiculos',{data:''});   
        } else {
            res.render('vehiculos',{data:rows});
        }
    });
});

router.get('/add', function(req, res, next) {    
    res.render('vehiculos/add', {
        modelo: '',
        linea: ''        
    })
})


router.post('/add', function(req, res, next) {    

    let modelo = req.body.modelo;
    let linea = req.body.linea;
    let errors = false;

    if(modelo.length === 0 || linea.length === 0) {
        errors = true;
        req.flash('error', "Please enter modelo and linea");
        res.render('vehiculos/add', {
            modelo: modelo,
            linea: linea
        })
    }

    if(!errors) {

        var form_data = {
            modelo: modelo,
            linea: linea
        }

        dbConn.query('INSERT INTO vehiculos SET ?', form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('vehiculos/add', {
                    modelo: form_data.modelo,
                    linea: form_data.linea                    
                })
            } else {                
                req.flash('success', 'Vehicle successfully added');
                res.redirect('/vehiculos');
            }
        })
    }
})


router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM vehiculos WHERE idvehiculos = ' + id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Vehicle not found with id = ' + id)
            res.redirect('/vehiculos')
        }
        else {
            res.render('vehiculos/edit', {
                title: 'Edit Vehicle', 
                idvehiculos: rows[0].idvehiculos,
                modelo: rows[0].modelo,
                linea: rows[0].linea
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let modelo = req.body.modelo;
    let linea = req.body.linea;
    let errors = false;

    if(modelo.length === 0 || linea.length === 0) {
        errors = true;
        req.flash('error', "Please enter modelo and linea");
        res.render('vehiculos/edit', {
            id: req.params.id,
            modelo: modelo,
            linea: linea
        })
    }

    if( !errors ) {   
 
        var form_data = {
            modelo: modelo,
            linea: linea
        }
        dbConn.query('UPDATE vehiculos SET ? WHERE idvehiculos = ' + id, form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('vehiculos/edit', {
                    id: req.params.id,
                    modelo: form_data.modelo,
                    linea: form_data.linea
                })
            } else {
                req.flash('success', 'Vehicle successfully updated');
                res.redirect('/vehiculos');
            }
        })
    }
})
   
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
    
    dbConn.query('DELETE FROM vehiculos WHERE idvehiculos = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/vehiculos')
        } else {
            req.flash('success', 'Vehicle successfully deleted! ID = ' + id)
            res.redirect('/vehiculos')
        }
    })
})

module.exports = router;