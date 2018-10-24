import React, { Component } from "react";
import "./App.css";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AddLineItem from './Components/AddLineItem';
import Timesheet from './Components/AddTimesheet';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

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
  handleSheetSelection(sheet) {
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
  deleteSheet(sheet) {
    fetch('/delete_timesheet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       sheet_id: sheet.id
      })
    }).then(response => {
      let array = this.state.timesheets;
      let i = 0;
      array.forEach(element => {
        if (element.id === sheet.id) {
          array.splice(i, 1);
        } else {
          i++;
        }
      });
      this.setState({timesheets: array}); 
    })
  }
  deleteLineItem(lineItem) {
    fetch('/delete_line_item', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItem_id: lineItem.id
      })
    }).then(response => {
      let array = this.state.lineItems;
      let i = 0;
      array.forEach(element => {
        if (element.id === lineItem.id) {
          array.splice(i, 1);
        } else {
          i++;
        }
      });
      this.setState({lineItems: array}); 
    })
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
                    return <div key={sheet.id} >
                            <span className="sheet-name">
                              <span
                                onClick={() => this.handleSheetSelection(sheet)}>{sheet.description}
                              </span>
                            </span>
                            <span>      
                              <Button onClick={() => this.deleteSheet(sheet)}>
                                <DeleteIcon />
                              </Button>
                            </span>
                          </div>
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
                      <th></th>
                    </tr>
                      {this.state.lineItems.map(lineItem => {
                        return  <tr  key={lineItem.id}>
                                    <td>{this.getFormattedDate(new Date(lineItem.date))}</td>
                                    <td>{lineItem.minutes}</td>
                                    <td>      
                                      <Button onClick={() => this.deleteLineItem(lineItem)}>
                                        <DeleteIcon />
                                      </Button>
                                    </td>
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
