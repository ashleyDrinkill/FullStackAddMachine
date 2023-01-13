const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require("fs");
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./config/database')

/*
    Purpose: allows for resource sharing between the front and backend
*/
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


// TEST database connection
db.db.authenticate()
  .then(() => console.log('Connected to database...'))
  .catch(err => console.log('Error: ' + err));

// SYNC database
db.db.sync().then(() => { console.log('Database synced.') }).catch((err) => console.log('Error syncing database. ' + err));

// not creating correct alter script (Executing (default): ALTER TABLE [Reports] ALTER COLUMN [name] NVARCHAR(255) NOT NULL UNIQUE;)
//db.reports.sync({alter: true}).then(() => { console.log('Reports table synced.') }).catch((err) => console.log('Error syncing reports table. ' + err));

app.get('/', (req, res) => {
    res.send('INDEX')
});



// forwards to getReports page
app.use('/getReports', require('./routes/getReports'));
// forwards to getCurrentReportNumbers page
app.use('/getCurrentReport', require('./routes/getCurrentReport'));
// forwards to removeReport page
app.use('/removeReport', require('./routes/removeReport'));
// forwards to addReport page
app.use('/addReport', require('./routes/addReport'));
// forwards to updateReport page
app.use('/updateReport', require('./routes/updateReport'));
// forwards to saveReport page
app.use('/saveReport', require('./routes/saveReport'));


// ENSURES server stays listening for requests
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
