import React, { Component } from "react";
import "./AddTimesheet.css";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

class AddTimesheet extends Component {
    constructor() {
        super()
        this.state = {
            description: '',
            rate: 0
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleAddTimesheet = this.handleAddTimesheet.bind(this);
    }
    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddTimesheet(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.addTimesheet(this.state);
    }
    render() {
        return (
            <div className="timesheet">
                <form  onSubmit={this.handleAddTimesheet}>
                    <div className="add-timesheet">
                        <span>
                            <TextField
                            className="description"
                            name="description"
                            label="Timesheet Description"
                            type="string"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.props.description}
                            onChange={this.handleInput}>
                            </TextField>
                        </span>
                        <span>
                            <TextField
                            className="rate"
                            name="rate"
                            label="Rate"
                            type="number"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.props.rate}
                            onChange={this.handleInput}>
                            </TextField>
                        </span>
                        <span>
                            <IconButton type="submit">
                                <AddIcon/>
                            </IconButton>
                        </span>
                    </div>
                </form>
            </div>
        );
    }

}

export default AddTimesheet;
