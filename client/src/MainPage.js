import './App.css';
import React from 'react';



function MainPage() {
  const [history, setHistory] = React.useState(null);
  const [sum, setSum] = React.useState(null);
  const [newNumber, setNumber] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  
  // loads the history to the page, runs for all changes
  React.useEffect(() => {
    fetch("/getCurrentHistory")
    .then((res) => res.json())
    .then((history) => {setHistory(history.numbers)})
    .catch((err) => setHistory("An error occured getting the current history."))
  });

  // loads the current sum to the page, runs for all changes
  React.useEffect(() => {
    fetch("/getCurrentSum")
    .then((res) => res.json())
    .then((sum) => setSum(sum.sum))
    .catch((err) => setSum("Unable to find sum."))
  });

  // sends request to Node backend to get the current adding history
  function getHistory() {
    fetch("/getCurrentHistory")
    .then((res) => res.json())
    .then((history) => {setHistory(history.numbers)})
    .catch((err) => setHistory("An error occured getting the current history."))
  }

  // sends post request to Node backend to add the submitted number to local storage and update the sum
  function addNumber(e) {
    fetch("/postNewnumber", {
      method: 'POST',
      body: JSON.stringify(newNumber)
    }).then(res => res.json())
    // also update the sum here
    .then(json => {setSum(json.sum); console.log("Adding successful")})
    // handle the error as accordingly
    .catch(err => console.log("Error: " + err))
  }

  // sends post request to Node backend to save current history / sum to file and clear the history
  function saveToFile(e) {
    fetch("/postToLocalFile", {
      method: 'POST',
      body: JSON.stringify(filename)
    }).then(res => res.json())
    .then(json => {console.log("Saved to file. Local History wiped.")})
    .catch(err => console.log("Error: " + err))
  }

  return (
    <div className="App container-fluid p-0 m-0">
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <h1>Welcome to the Virtual Adding Machine</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <h3>Current sum: {!sum ? "Loading Sum..." : sum}</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#collapse1" onClick={getHistory()}>Click to view/hide your current history</a>
                </h4>
              </div>
              <div id="collapse1" class="panel-collapse collapse">
                <div class="panel-body">{!history ? "Loading History..." : history}</div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <form onSubmit={addNumber()}>
            <label>
              Number to add: 
              <input type="text" value={newNumber} onChange={setNumber} />
            </label>
            <input type="submit" value="Enter number" />
          </form>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <form onSubmit={saveToFile()}>
            <label>
            Save current History to file, enter filepath: 
              <input type="text" value={filename} onChange={setFilename} />
            </label>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
