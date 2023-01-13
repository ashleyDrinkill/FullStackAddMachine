import React from 'react';

function EditReport() {
  const [reports, setReports] = React.useState([]);
  const [newReportName, setNewReportName] = React.useState("");
  const [newReportNameError, setNewReportNameError] = React.useState("");
  const [newReportSuccess, setNewReportSuccess] = React.useState("");
  const [deleteSuccess, setDeleteSuccess] = React.useState("");

  // gets all the reports that currently are saved in the database
  React.useEffect(() => {
    fetch("http://localhost:3001/getReports")
      .then((res) => res.json())
      .then((reports) =>
        setReports(reports))
      .catch((err) => {
        console.log('Error in getReports: ' + err)
        let arr = new Array("An error occurred getting all of the reports.")
        console.log(arr)
        setReports(arr)
      });
  }, [newReportSuccess, deleteSuccess]);

  function deleteReport(id) {
    //Double check
    const confirmDelete = window.confirm(`Are you sure you wish to delete this report?`);
    if (!confirmDelete) {
      return;
    }
    setDeleteSuccess("");
    setNewReportSuccess("");
    const reqOps = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'id': `${id}`})
    };
    fetch("http://localhost:3001/removeReport", reqOps)
      .then((res) => res.json())
      .then(() => setNewReportSuccess(""))
      .then(() => {
        setDeleteSuccess("Report deleted.");
      })
      .catch((err) => {
        console.log("Error occurred while adding report: " + err);
        setNewReportNameError("Error occurred while adding report.");
      })
  }

  function createReport() {
    //VALIDATE
    if (!newReportName) {
      setNewReportNameError("Enter a report name.");
      return;
    }
    setDeleteSuccess("");
    setNewReportSuccess("");
    const reqOps = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": `${newReportName}` })
    };
    fetch("http://localhost:3001/addReport", reqOps)
      .then((res) => res.json())
      .then(() => {
        setNewReportSuccess(newReportName + " report created.");
      })
      .then(() => { setNewReportName(""); setNewReportNameError("") })
      .catch((err) => {
        console.log("Error occurred while adding report: " + err);
        setNewReportNameError("Error occurred while adding report.");
      })
  }


  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <h2>Current Reports</h2>
            </div>
          </div>
          <div className="row"><div className="col text-success">{ deleteSuccess }</div></div>
          <div className="row">
            <div className="col"><h4>Report Name</h4></div>
            <div className="col"><h4>Report Sum</h4></div>
            <div className="col"><h4>Date Created</h4></div>
            <div className="col"></div>
          </div>
          {!reports ? <option key='unknown' value='unknown'>'Loading reports.'</option> : (reports.length === 0 ? <option key='unknown' value='unknown'>'No reports available.</option> :
            reports.map((obj, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col mb-3">{obj.name}</div>
                  <div className="col mb-3">{obj.sum}</div>
                  <div className="col mb-3">{new Date(obj.createdAt).toLocaleDateString("en-us")}</div>
                  <div className="col mb-3"><button className="btn btn-danger" onClick={ () => deleteReport(obj.id) }>Delete Report</button></div>
                </div>
                )
            })
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div><h2>Create New Report</h2></div>
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="number">Report Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                reuqired="true"
                value={newReportName}
                onChange={(e) => setNewReportName(e.target.value)}
                name="name"
              />
            </div>
            <button onClick={createReport} className="btn btn-success">
              Create Report
            </button>
            <div className="text-danger">{newReportNameError}</div>
            <div className="text-success">{newReportSuccess}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReport;