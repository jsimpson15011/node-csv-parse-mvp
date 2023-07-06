const express = require('express');
const router = express.Router();
const csv=require('csvtojson');
const crypto = require('crypto');


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
          normalizedRow[updatedKey].id = crypto.randomUUID();
        }
        normalizedRow.id = crypto.randomUUID();
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
