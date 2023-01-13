const db = require('../config/database');
const Report = db.reports;
const Number = db.numbers;
const Sequelize = require('sequelize');
const fs = require("fs");


/*
 * Purpose: Create a new Report and save to database
 * Incoming: POST request with name in body
 * Outgoing: 200 success message if report created
 * Throws: 400 error if params not given, 500 error if error while creating report
 */
exports.create = (req, res) => {
  // Validate
  if (!req.body.name) {
    res.status(400).send({
      message: 'A name must be provided.'
    });
    return;
  }

  // Create Report
  const report = {
    name: req.body.name
  };

  // Save report to database
  Report.create(report)
    .then(res.status(200).send({ message: 'New report created.'}))
    .catch(err => { res.status(500).send({ message: err + 'Error occurred while creating the report.'}) })
};

/*
 * Purpose: Get all reports from the database
 * Incoming: GET request
 * Outgoing: All the reports found
 * Throws: 500 error if an error occurs while getting the reports
 */
exports.findAll = (req, res) => {
  console.log(req.method + '    ' + req.header);
  Report.findAll()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err + 'Error occurred while grabbing all reports.' });
    });
};

/*
 * Purpose: Get specific report from the database
 * Incoming: POST request with Id in body
 * Outgoing: The report if found
 * Throws: 500 error if an error occurs while getting the report
 */
exports.findByPk = (req, res) => {
  //Validate
  if (!req.body.id) {
    res.status(400).send({
      message: 'A report must be provided.'
    });
    return;
  }

  const id = req.body.id;
  Report.hasMany(Number, { foreignKey: 'ReportId' });
  Number.belongsTo(Report)

  Report.findOne(
    {
      where: { 'id': id },
      include: [{ model: Number, attributes: ['number'] }] 
    })
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err + `Error occurred while grabbing report with id=${id}.` });
    });
};

/*
 * Purpose: Remove a report from the database
 * Incoming: POST request with Id in body
 * Outgoing: 200 success message
 * Throws: 500 error if an error occurs while removing the report
 */
exports.delete = (req, res) => {
  //Validate
  if (!req.body.id) {
    res.status(400).send({
      message: 'A report must be provided.'
    });
    return;
  }

  const id = req.body.id;
  Report.hasMany(Number, { foreignKey: 'ReportId' });
  Number.belongsTo(Report)

  Report.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).send({ message: 'Report has been removed.' });
      } else {
        res.send({ message: `Cannot remove report with id=${id}` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Error removing report with id=${id}` });
    })
};

/*
 * Purpose: Update a report in the database
 * Incoming: POST request with Id, currSum, and newNum in body
 * Outgoing: 200 success message
 * Throws: 500 error if an error occurs while updating the report sum or inserting new number into database
 */
exports.update = (req, res) => {
  
  //Validate
  if (!req.body.reportId || req.body.sum === null || !req.body.number === null) {
    res.status(400).send({
      message: 'All data items must be provided.'
    });
    return;
  }

  const id = req.body.reportId;
  // parse these to numbers
  var sum = parseInt(req.body.sum);
  const newNum = parseInt(req.body.number);
  console.log("Id: " + id + "  Sum: " + sum + "  newNum: " + newNum);

  // update the sum by adding the new number to it
  sum = sum + newNum;

  // create Number
  const number = {
    'number': newNum,
    'ReportId': id
  };

  // Insert number
  Number.create(number)
    .catch(err => {
      res.status(500).send({ message: err + 'Error occurred while saving the new number.' })
    });

  // update sum in the Reports table
  Report.update({ sum: sum }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Sum has been updated.' });
      } else {
        res.send({ message: `Cannot update sum for report with id=${id}` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Error updating sum for report with id=${id}` });
    })
};

exports.export = (req, res) => {
  //VALIDATE



  //GET INFO
  const filename = req.body.filename;
  const id = req.body.id;
  var report = "";

  Report.hasMany(Number, { foreignKey: 'ReportId' });
  Number.belongsTo(Report)

  Report.findOne(
    {
      where: { 'id': id },
      include: [{ model: Number, attributes: ['number'] }],
      //raw: true
    }
  )
    .then((data) => {
      try {
        //Create user-friendly report
        report += `${data.name}\n\n`;
        
        for (var x = 0; x < data.Numbers.length; x++) {
          report += data.Numbers[x].number + '\n';
        };

        report += `\nTotal Sum: ${data.sum}`;

        //SEND TO FILE
        fs.open(filename, 'w', (err, file) => {
          if (err) throw err;
          fs.writeFile(file, report, (err) => {
            if (err) throw err;
          });
          fs.close(file)
        });
        res.status(200).send({ message: "Saved to file." });
      } catch (err) {
        res.status(500).send({ message: err + " Error occurred while writing to file." })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err + `Error occurred while grabbing report with id=${id}.` });
    });
};