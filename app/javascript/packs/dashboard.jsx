import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const stateoptions = [
	['AL', 'ALABAMA'], ['AK', 'ALASKA'], ['AS', 'AMERICAN SAMOA'], ['AZ', 'ARIZONA'], ['AR', 'ARKANSAS'], ['AA', 'ARMED FORCES AMERICAS'], ['AE', 'ARMED FORCES EUROPE / CANADA / MIDDLE EAST / AFRICA'], ['AP', 'ARMED FORCES PACIFIC'], ['CA', 'CALIFORNIA'], ['CO', 'COLORADO'], ['CT', 'CONNECTICUT'], ['DE', 'DELAWARE'], ['DC', 'DISTRICT OF COLUMBIA'], ['FM', 'FEDERATED STATES OF MICRONESIA'], ['FL', 'FLORIDA'], ['GA', 'GEORGIA'], ['GU', 'GUAM'], ['HI', 'HAWAII'], ['ID', 'IDAHO'], ['IL', 'ILLINOIS'], ['IN', 'INDIANA'], ['IA', 'IOWA'], ['KS', 'KANSAS'], ['KY', 'KENTUCKY'], ['LA', 'LOUISIANA'], ['ME', 'MAINE'], ['MP', 'MARIANA ISLANDS, NORTHERN'], ['MH', 'MARSHALL ISLANDS'], ['MD', 'MARYLAND'], ['MA', 'MASSACHUSETTS'], ['MI', 'MICHIGAN'], ['MN', 'MINNESOTA'], ['MS', 'MISSISSIPPI'], ['MO', 'MISSOURI'], ['MT', 'MONTANA'], ['NE', 'NEBRASKA'], ['NV', 'NEVADA'], ['NH', 'NEW HAMPSHIRE'], ['NJ', 'NEW JERSEY'], ['NM', 'NEW MEXICO'], ['NY', 'NEW YORK'], ['NC', 'NORTH CAROLINA'], ['ND', 'NORTH DAKOTA'], ['OH', 'OHIO'], ['OK', 'OKLAHOMA'], ['OR', 'OREGON'], ['PA', 'PENNSYLVANIA'], ['PR', 'PUERTO RICO'], ['RI', 'RHODE ISLAND'], ['SC', 'SOUTH CAROLINA'], ['SD', 'SOUTH DAKOTA'], ['TN', 'TENNESSEE'], ['TX', 'TEXAS'], ['UT', 'UTAH'], ['VT', 'VERMONT'], ['VI', 'VIRGIN ISLANDS'], ['VA', 'VIRGINIA'], ['WA', 'WASHINGTON'], ['WV', 'WEST VIRGINIA'], ['WI', 'WISCONSIN'], ['WY', 'WYOMING']
]

class Dashboard extends Component {

  constructor(props) {
    super(props);

	this.state = {
      first_name: '',
      last_name: '',
      state: '',
      autoCompleteResults: [],
      doctorSelected: {},
      showDoctorSelected: false
    };

    $.getJSON('/search?first_name=' + this.state.first_name + '&last_name=' + this.state.last_name + '&state=' + this.state.state).then(response => this.setState({ autoCompleteResults: response.doctors }))
  }

  getAutoCompleteResults(e){
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      $.getJSON('/search?first_name=' + this.state.first_name + '&last_name=' + this.state.last_name + '&state=' + this.state.state).then(response => this.setState({ autoCompleteResults: response.doctors }))
    });
  }

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response, index) => {
      return (
      <div className="card card_wrapper" key={index}>
          <div className="card-header">
            <h5>{response.first_name} {response.last_name}</h5>
          </div>
          <div className="card-body">
            <span><h6 className="card-title inline-title">NPI number: &nbsp;</h6>{response.number}</span>

            <span><h6 className="card-subtitle mb-2">Practice Location Address: </h6>
              <p>
                {response.practice_location_address_1}
                <br />
                {response.practice_location_city}, {response.practice_location_state}
              </p>
            </span>

            <span><h6 className="card-subtitle mb-2">Billing Address: </h6>
              <p>
                {response.billing_address_1}
                <br />
                {response.billing_city}, {response.billing_state}
              </p>
            </span>
          </div>
      </div>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="input-group mb-3 col-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">First Name</span>
            </div>
            <input ref={ (input) => { this.searchBar = input } } name="first_name" value={ this.state.first_name } onChange={ this.getAutoCompleteResults.bind(this) } type='text' />
          </div>

          <div className="input-group mb-3 col-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Last Name</span>
            </div>
            <input ref={ (input) => { this.searchBar = input } } name="last_name" value={ this.state.last_name } onChange={ this.getAutoCompleteResults.bind(this) } type='text' />
          </div>
       
          <div className="input-group mb-3 col-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">State</span>
            </div>
            <select className="select-filter" ref={ (input) => { this.searchBar = input } } name="state" onChange={ this.getAutoCompleteResults.bind(this) }>
              <option value="">All</option>
              {stateoptions.map((x) => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
            </select>
          </div> 
        </div>

        <div className="card-columns">
          { autoCompleteList }
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dashboard />,
    document.getElementById("dashboard_form").appendChild(document.createElement('div')),
  )
});