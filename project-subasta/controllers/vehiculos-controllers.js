const Vehicle = require("../models/vehiculos-model");

// retrieve all customers from the database
exports.findAll = (req, res) => {
  Vehicle.getAll((err, data) => {
      if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });
  
      res.send(data);
    });
  };
  
  // retrieve all customers from the database
exports.findAllArray = (req, res) => {
  Vehicle.getAllArray((err, data) => {
      if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });
  
      res.send(data);
    });
  };
  
  exports.findAllJsonText = (req, res) => {
    Vehicle.getAllJson((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });
    
        res.send(data);
      });
    };
  
    exports.findOne = (req, res) => {
      const { id } = req.params;
      Vehicle.findById(id, (err, data) => {
          if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });
          res.send(data);
        });
      }; 
    
  