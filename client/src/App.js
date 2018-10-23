import React, { Component } from "react";
import "./App.css";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AddLineItem from './Components/AddLineItem';
import Timesheet from './Components/AddTimesheet';


class App extends Component {
  constructor() {
    super();
    this.state = {
      lineItems: [],
      timesheets: [],
      selectedSheet: {
        description: 'Please create or select a timesheet',
      }
    }
    this.handleSheetSelection = this.handleSheetSelection.bind(this);
  }

  componentDidMount() {
    fetch('/all_timesheets')
    .then(response => response.json())
    .then(res => this.setState({timesheets: res}))
  }
  addLineItem = (newEntry) => {
    fetch('/save_line_item', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent_id: this.state.selectedSheet.id,
        minutes: newEntry.minutes,
        date: new Date(newEntry.date)
      })
    })
    .then(response => response.json())
    .then(res => {
      let newArray = this.state.lineItems.concat(res);
      this.setState({lineItems: newArray});
    })
  }
  addTimesheet = (newEntry) => {
    fetch('/save_timesheet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: newEntry.description,
        rate: newEntry.rate
      })
    })
    .then(response => response.json())
    .then(res => {
      let newArray = this.state.timesheets.concat(res);
      this.setState({timesheets: newArray});
    })
  }
  handleSheetSelection(event, sheet) {
    this.setState({selectedSheet: sheet});
    fetch(`/get_line_items?id=${sheet.id}`)
      .then(res => res.json())
      .then(response => this.setState({lineItems: response}))
  } 
  getFormattedDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;
    const year = date.getFullYear();
    const formattedDate = month + '/' + day + '/' + year;
    return formattedDate;
  }
  render() {
    return (
      <div className="App">
        <span>
            <Card className="timesheets-card">
              <CardHeader
                  title="Timesheets"
                />
              <Timesheet addTimesheet={this.addTimesheet}/>
              <div>
                <ul>
                  {this.state.timesheets.map(sheet => {
                    return <div key={sheet.id} onClick={(e) => this.handleSheetSelection(e, sheet)}>{sheet.description}</div>
                  })}
                </ul>
              </div>
            </Card>
          </span>
          <span>
            <Card className="line-item-card">
              <CardHeader
                title={this.state.selectedSheet.description}
                action={this.state.selectedSheet.rate ? ("Rate: " + this.state.selectedSheet.rate) : ''}
              />
               {this.state.selectedSheet.rate ? <div><AddLineItem addLineItem={this.addLineItem}/>
                <table className="line-item-table">
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>Minutes</th> 
                    </tr>
                      {this.state.lineItems.map(lineItem => {
                        return  <tr  key={lineItem.id}>
                                    <td>{this.getFormattedDate(new Date(lineItem.date))}</td>
                                    <td>{lineItem.minutes}</td>
                              </tr>


                      })}
                  </tbody>
                </table>
               </div> : null}
            </Card> 
          </span>    
      </div>
    );
  }
}

export default App;
