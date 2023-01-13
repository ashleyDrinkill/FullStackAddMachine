import React from 'react';

function EditReport() {
  const [reports, setReports] = React.useState([]);
  const [currentReportId, setCurrentReportId] = React.useState(0);
  const [currentReport, setCurrentReport] = React.useState(null);
  const [newNumber, setNewNumber] = React.useState(0);
  const [newFile, setNewFile] = React.useState("");
  const [newNumberSuccess, setNewNumberSuccess] = React.useState("");
  const [numberError, setNumberError] = React.useState("");
  const [filenameError, setFilenameError] = React.useState("");
  const [saveSuccess, setSaveSuccess] = React.useState("");

  // gets all the reports that currently are saved in the database
  React.useEffect(() => {
    fetch("http://localhost:3001/getReports")
      .then((res) => res.json())
      .then((reports) => {
        setReports(reports)
      })
      .catch((err) => {
        console.log('Error in getReports: ' + err)
        let arr = new Array("An error occurred getting all of the reports.")
        console.log(arr)
        setReports(arr)
      });
  }, []);

  React.useEffect(() => {
    console.log('Id = ' + currentReportId)
    if (!currentReportId == 0) { loadReport(); }

    function loadReport() {
      const reqOps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id": `${currentReportId}` })
      };
      fetch("http://localhost:3001/getCurrentReport", reqOps)
        .then((res) => res.json())
        .then((report) => {
          setCurrentReport(report)
        })
        .catch((err) => console.log("Error in loadReport: " + err));
    };
  }, [currentReportId, newNumberSuccess]);

  /**
   * Purpose
   * 
   * */
  function saveNumber() {
    //VALIDATE
    if (isNaN(newNumber)) {
      setNumberError("Input must be numerical."); return;
    } else if (!currentReport) {
      setNumberError("Select a report to edit."); return;
    }
    //Create request object to send
    const reqOps = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "sum": `${currentReport.sum}`, "number": `${newNumber}`, "reportId": `${currentReport.id}` })
    };
    console.log(reqOps);
    fetch("http://localhost:3001/updateReport", reqOps)
      .then((res) => res.json())
      .then((report) => {
        console.log("Report updated: " + JSON.stringify(report));
        setNewNumberSuccess(newNumber + " added successfully.");
        setNewNumber(0);
      })
      .catch((err) => {
        console.log("Error in updateReport: " + err);
        setNumberError("Error occurred while updating report.");
        setNewNumber(0);
      });
  };

  function saveToFile() {
    //VALIDATE
    if (!newFile) {
      setFilenameError("Must include a filepath."); return;
    } else if (!currentReportId) {
      setFilenameError("Must select a report to save."); return;
    }
    const tempfile = newFile.slice(-3);
    if (!(tempfile.valueOf() == "txt") && !(tempfile.valueOf() == "csv")) {
      setFilenameError("Must be a .txt or a .csv file."); return;
    }

    //Add extra / to the string
    var fileToSave = newFile
    fileToSave = fileToSave.replaceAll('/', '//');
    fileToSave = fileToSave.replaceAll('\\', '\\\\');
    console.log("file to send: " + fileToSave);
    
    //Create request object to send
    const reqOps = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "filename": `${fileToSave}`, "id": `${currentReportId}` })
    };

    fetch("http://localhost:3001/saveReport", reqOps)
      .then((res) => res.json())
      .then((message) => {
        setSaveSuccess("Saved to file.");
      })
      .catch((err) => {
        console.log('Error occurred while saving report. ' + err)
      })
  }

  return (
    <div className="container-fluid">
      <div className='row mb-5'>
        <div className='col'>
          <div className='row'>
            <div className='col d-flex justify-content-center'>
              Select a report below to edit:
            </div>
          </div>
          <div className="row">
            <div className='col d-flex justify-content-center'>
              <select onChange={(e) => setCurrentReportId(e.target.value)}>
                <option key='Blank'></option>
                {!reports ? <option key='unknown' value='unknown'>'No reports available.'</option> : (reports.length === 0 ? <option key='unknown' value='unknown'>'No reports available.</option> :
                  reports.map((obj, index) => {
                    return (<option key={index} value={obj.id}>{obj.name}</option>)
                  })
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-4">
          <h3>Current report numbers</h3>
        </div>
        <div className="col-4 mt-2">
          <div className="row overflow-auto" style={{ height: '250px' }}>
            <div className="d-flex flex-column">
              {!currentReport ? <div></div> : (currentReport.length == 0 ? <div></div> :
                currentReport.Numbers.map((nums, index) => {
                  return (<div key={index}>{nums.number}</div>)
                }))
              }
            </div>
          </div>
        </div>
        <div className="col-2 ">
          <div className="row"><div className="col d-flex justify-content-center"><b>CURRENT SUM</b></div></div>
          {!currentReport ? <div></div> : (currentReport.length == 0 ? <div></div> :
            <div className="row"><div className="col d-flex justify-content-center">{currentReport.sum}</div></div>
            )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row"><div><h3>Actions</h3></div></div>
          <div className="row"><div><h5>Add a new number { !currentReport ? '' : 'to ' + currentReport.name }</h5></div></div>
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="number">Number to Add</label>
              <input
                type="text"
                className="form-control"
                id="number"
                reuqired="true"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                name="number"
              />
            </div>
            <button onClick={saveNumber} className="btn btn-success">
              Add Number
            </button>
            <div className="text-danger">{numberError}</div>
            <div className="text-success">{newNumberSuccess}</div>
          </div>
          <div className="row mt-5"><div><h5>Save {!currentReport ? '' : currentReport.name } to a file</h5></div></div>
          <div className="submit-form">
            {/*<div className="form-group">*/}
            {/*  <label htmlFor="number"> choose existing file (.txt or .csv):</label>*/}
            {/*  <input*/}
            {/*    type="file"*/}
            {/*    className="form-control"*/}
            {/*    id="filename"*/}
            {/*    reuqired="false"*/}
            {/*    value={newFile}*/}
            {/*    onChange={(e) => setNewFile(e.target.value)}*/}
            {/*    name="filename"*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div>OR</div>*/}
            <div className="form-group">
              <label htmlFor="number"> enter new full file path (.txt or .csv):</label>
              <input
                type="text"
                className="form-control"
                id="filenamenew"
                reuqired="false"
                value={newFile}
                onChange={(e) => setNewFile(e.target.value)}
                name="filenamenew"
              />
            </div>
            <button onClick={saveToFile} className="btn btn-success">
              Save to File
            </button>
            <div className="text-danger">{filenameError}</div>
            <div className="text-success">{saveSuccess}</div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default EditReport;