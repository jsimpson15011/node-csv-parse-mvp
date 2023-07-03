var express = require('express');
var router = express.Router();
const fs = require("fs");
const csv=require('csvtojson')


/* Upload csv and get back a JSON representation */
router.post('/', function(req, res, next) {
  try{
    csv({delimiter:"auto"}).fromFile(req.files.files.tempFilePath).then((jsonObj) =>{
      const normalizedArray = [];

      jsonObj.forEach((row,i) => {
        const normalizedRow = {};
        for(const [key, value] of Object.entries(row)){
          const updatedKey = key.replaceAll(" ","_");
          normalizedRow[updatedKey] = value;
        }
        normalizedArray[i] = normalizedRow;
      });

      res.send(normalizedArray);
    });
  } catch (e){
    res.status(400);
    res.send(e.message);
    next(e);
  }
});

module.exports = router;
