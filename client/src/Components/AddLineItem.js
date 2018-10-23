import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import "./AddLineItem.css";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

class AddLineItem extends Component {
    constructor() {
        super()
        this.state = {
            minutes: 0,
            date: new Date()
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleAddLineItem = this.handleAddLineItem.bind(this);
    }
    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddLineItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.addLineItem(this.state);
    }
    render() {
        return (
            <div className="time-entry">
            <form  onSubmit={this.handleAddLineItem}>
                <span>
                    <TextField
                    required
                    name="minutes"
                    label="Time in Mins"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.minutes}
                    onChange={this.handleInput}>
                    </TextField>
                </span>
                <span>
                    <TextField
                    required
                    name="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.date}
                    onChange={this.handleInput}>
                    </TextField>
                </span>
                <span>
                    <IconButton type="submit">
                        <AddIcon/>
                    </IconButton>
                </span>
            </form>
            </div>
        );
    }

}

export default AddLineItem;
