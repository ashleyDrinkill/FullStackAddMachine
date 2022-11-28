const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const cors = require('cors');
const { captureRejectionSymbol } = require("events");

/*
    Purpose: allows for resource sharing between the front and backend
*/
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));


app.get("/api", (req, res) => {
    res.json({ hello: "Welcome!" });
});


/*
    Purpose: add the new number to the browsers local storage
    Input: the new number coming from the client side (user input)
*/
app.post("/postNewnumber", (req, res) => {
    let currNumbers = JSON.parse(localStorage.getItem('listOfNumbers'));
    currNumbers['listOfNumbers'].push({newNumber});
    localStorage.setItem(JSON.stringify(currNumbers));
    // catch any error and throw error back to frontend to relay to user
    let newSum = updateSum(newNumber);
    res.json({ sum: newSum });
});


/*
    Purpose: updates the stored current sum to reflect the newly added number
    Input: number to add to the current sum
    Throws: QuotaExceededError if setItem could not be completed
*/
function updateSum(numToAdd) {
    let currSum = parseInt(localStorage.getItem('sum'));
    let newSum = currSum + numToAdd;
    localStorage.setItem('sum', newSum);
    return newSum;
};


/*
    Purpose: gets the current history stored in the browser and returns to front end for viewing
    Output: the current number history of adding machine
*/
app.get("/getCurrentHistory", (req, res) => {
    let result = localStorage.getItem('listOfNumbers');
    if (result = null) {result = "No data recorded."}
    res.json({ numbers: result});
});

/*
    Purpose: grabs the currently saved sum of numbers stored in browser and returns to front end for viewing
    Output: currently saved sum of numbers in local history
*/
app.get("/getCurrentSum", (req, res) => {
    let sum = localStorage.getItem('sum');
    if (sum = null) {sum = 0}
    res.json({ sum: sum});
});

/*
    Purpose: grabs the current data (entries) located in local storage and writes it to a
        user-chosen file
    Throws: NodeJS.ErrnoException if there is no existing temp file
    Input: req holds the json filename to send the temp data to
*/
app.post("/postToLocalFile", (req, res) => {
    fs.open(req.body.filename, "w", (err, file) => {
        if (err) throw err;
        let result = localStorage.getItem('listOfNumbers');
        if (result = null) {result = "Nothing saved."};
        fs.writeFile(file, result, (err) => {
            if (err) throw err;
            clearHistory();
            console.log("File writing complete.");
        })
    })

});

/*
    Purpose: clears sum and currently saved list of entries
    Throws: QuotaExceededError if set cannot occur
*/
function clearHistory() {
    localStorage.setItem('sum', '0');
    localStorage.setItem('listOfNumbers', {});
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});