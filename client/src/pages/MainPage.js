import React from 'react';
import Logo from '../Logo.png';


function MainPage() {

  return (
    <div className="App container-fluid p-0 m-0">
      <div className="row" style={{'margin-bottom': "120px", 'margin-top': "75px"}}>
        <div className="col">
          <div className="d-flex justify-content-center">
            <img src={Logo} alt="logo" />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <h1>Welcome to the Virtual Adding Machine</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col d-flex justify-content-center">
          <div className="d-flex text-center">This application is to assist with managing and adding simple numerical reports. Use the 'Manage Reports' tab to overview, create and remove reports. Use the 'Edit Reports'
            tab to build the report and save to your local machine.</div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default MainPage;
