var db = require('../lib/db');

// constructor
function Vehicle(vehicle) {
  // this.idvehiculos = vehicle.idvehiculos;
  this.descripcion = vehicle.descripcion;
  // this.marca = vehicle.marca;
  // this.modelo = vehicle.modelo;
  // this.linea = vehicle.linea;
  // this.color = vehicle.color;
  // this.motor = vehicle.motor;
  // this.tipo = vehicle.tipo;
  // this.uso = vehicle.uso;
  // this.transmision = vehicle.transmision;
  // this.kilometraje = vehicle.kilometraje;
  // this.puertas = vehicle.puertas;
  // this.conbustible = vehicle.conbustible;
  // this.traccion = vehicle.traccion;
  // this.danios_accidente = vehicle.danios_accidente;
  // this.condiciones_actuales = vehicle.condiciones_actuales;
  // this.idfotos = vehicle.idfotos;
  this.ubicacion = vehicle.ubicacion;
  this.principal = vehicle.principal;

}

const tableName = "vehiculos";

// get all customers
Vehicle.getAll = (result) => {
  const sql = `SELECT * FROM ${tableName} ORDER BY idvehiculos desc`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};


// get all customers
Vehicle.getAllArray = (result) => {
  const sql = `SELECT descripcion, ubicacion,principal FROM ${tableName} LEFT JOIN fotos  ON vehiculos.idvehiculos = fotos.idvehiculos`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    var array = res;



    let nuevoObjeto = {}
    array.forEach(x => {
      if (!nuevoObjeto.hasOwnProperty(x.descripcion)) {
        nuevoObjeto[x.descripcion] = {
          imagenes: []
        }
      }

      nuevoObjeto[x.descripcion].imagenes.push({
        ubicacion: x.ubicacion,
        principal: x.principal
      })

    })


    let nObject = [nuevoObjeto];

    result(null, nObject);
  });
};

// get all customers
Vehicle.getAllJson = (result) => {
  const sql = `SELECT 
                  vehiculos.idvehiculos, descripcion, ubicacion
                FROM
                ${tableName}
                      LEFT JOIN
                  fotos ON vehiculos.idvehiculos = fotos.idvehiculos
                WHERE
                  principal = 1 `;

  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};


// get all customers
Vehicle.findById = (id, result) => {
  const sql = `SELECT 
                descripcion, ubicacion, principal
              FROM
              ${tableName}
                    LEFT JOIN
                fotos ON vehiculos.idvehiculos = fotos.idvehiculos
              WHERE
                vehiculos.idvehiculos = ${id}`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    var array = res;

    let nuevoObjeto = {}
    array.forEach(x => {
      if (!nuevoObjeto.hasOwnProperty(x.descripcion)) {
        nuevoObjeto[x.descripcion] = {
          imagenes: []
        }
      }

      nuevoObjeto[x.descripcion].imagenes.push({
        ubicacion: x.ubicacion,
        principal: x.principal
      })

    })

    let nObject = [nuevoObjeto];

    result(null, nObject);
  });
};


module.exports = Vehicle;