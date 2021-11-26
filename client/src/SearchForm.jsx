import React from "react";


export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVendor: this.props.vendors[0].value,
            vendorsList: this.props.vendors.map(this.selectOptions),
            selectedCategory: [{key: 0, value: "select"}],
            categoryList: ([{key: 0, value: "select"}])
        };
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
    }
    selectOptions(option) {
        console.log("option");
        return (<option className="list-item" key={option.key} value={option.value}>{option.value}</option>)
    }
    componentDidMount() {
        console.log("mounted");
    }
    handleVendorChange(e) {
        console.log(e);
        console.log(e.target.value);
        this.setState({
            selectedVendor: e.target.value,
            categoryList: [{key: 0, value: "new 1"}, {key: 1, value: "new 2"}, {key: 2, value: "new 3"}, {key: 3, value: "new 4"}]
            // here depending on the vendor chosen go to database and get all categorys for that vendor.
        });
    }
    handleCatChange(e) {
        console.log(e);
        console.log("category changed");
    }
    render() {
        return (
            <div>
            <label htmlFor="vendorList">Vendor</label>
                <select name="vendorList" value={this.state.selectedVendor.value} onChange={this.handleVendorChange}>
                    {this.state.vendorsList}
                </select>
                <select name="categroyList" value={this.state.selectedCategory.value} onChange={this.handleCatChange}>
                    {this.state.categoryList.map(this.selectOptions)}
                </select>
            </div>
        );
    }
}