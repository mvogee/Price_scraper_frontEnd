import React from "react";
import "./Select.css";

export default class Select extends React.Component {

    selectOptions(option, idx) {
        if (!option.value) {
            return ;
        }
        return (<option className="list-item" key={idx} value={option.value}>{option.value}</option>)
    }

    render() {
        return (
            <div className="Select">
                <label htmlFor={this.props.selectName}>{this.props.label}</label>
                <select name={this.props.selectName} value={this.props.selected.value} onChange={this.props.onChange}>
                    <option className="list-item defualt" value="none" default>none</option>
                    {this.props.optionList ? this.props.optionList.map(this.selectOptions) : null}
                </select>
            </div>
        )
    }
}