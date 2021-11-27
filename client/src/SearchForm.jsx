import React from "react";


export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVendor: this.props.vendors[0].value,
            vendorsList: this.props.vendors.map(this.selectOptions),

            selectedCategory: [{key: 0, value: "none"}],
            categoryList: ([{key: 0, value: "select"}]),

            selectedSubCatOne: ([{key: 0, value: "none"}]),
            subCatListOne: ([{key: 0, value: "select"}]),

            selectedSubCatTwo: ([{key: 0, value: "none"}]),
            subCatListTwo: ([{key: 0, value: "select"}]),

            selectedSubCatThree: ([{key: 0, value: "none"}]),
            subCatListThree: ([{key: 0, value: "select"}]),

            nameSearch: ""
        };
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleSubCatOneChange = this.handleSubCatOneChange.bind(this);
        this.handleSubCatTwoChange = this.handleSubCatTwoChange.bind(this);
        this.handleSubCatThreeChange = this.handleSubCatThreeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({
            selectedCategory: e.target.value,
            subCatListOne: [{key: 0, value: "sub 1"}, {key: 1, value: "sub 2"}, {key: 2, value: "sub 3"}, {key: 3, value: "sub 4"}]
            // here depending on the category chosen will query the database for this list.
        });
    }
    handleSubCatOneChange(e) {
        this.setState({
            selectedSubCatOne: e.target.value,
            subCatListTwo: [{key: 0, value: "sub2 1"}, {key: 1, value: "sub2 2"}, {key: 2, value: "sub2 3"}, {key: 3, value: "sub2 4"}]
        });
    }
    handleSubCatTwoChange(e) {
        this.setState({
            selectedSubCatTwo: e.target.value,
            subCatListThree: [{key: 0, value: "sub3 1"}, {key: 1, value: "sub3 2"}, {key: 2, value: "sub3 3"}, {key: 3, value: "sub3 4"}]
        });
    }
    handleSubCatThreeChange(e) {
        this.setState({
            selectedSubCatThree: e.target.value
        });
    }
    handleSearchChange(e) {
        this.setState({
            nameSearch: e.target.value
        });
        console.log(this.state.nameSearch);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submit button was pressed.");
        console.log(this.state.selectedVendor);
        console.log(this.state.selectedCategory);
        console.log(this.state.selectedSubCatOne);
        console.log(this.state.selectedSubCatTwo);
        console.log(this.state.selectedSubCatThree);
        console.log(this.state.nameSearch);
        // query database for results based off of these states. if a state is not set should be * in query
    }
    render() {
        return (
        <div>
            <form>
                <label htmlFor="vendorList">Vendor</label>
                <select name="vendorList" value={this.state.selectedVendor.value} onChange={this.handleVendorChange}>
                    {this.state.vendorsList}
                </select>
                <label htmlFor="categoryList">Category</label>
                <select name="categroyList" value={this.state.selectedCategory.value} onChange={this.handleCatChange}>
                    {this.state.categoryList.map(this.selectOptions)}
                </select>
                <label htmlFor="subCategoryOne">Sub Category</label>
                <select name="subCategoryOne" value={this.state.selectedSubCatOne.value} onChange={this.handleSubCatOneChange} >
                    {this.state.subCatListOne.map(this.selectOptions)}
                </select>
                <label htmlFor="subCategoryTwo">Second Sub Category</label>
                <select name="subCategoryTwo" value={this.state.selectedSubCatTwo.value} onChange={this.handleSubCatTwoChange} >
                    {this.state.subCatListTwo.map(this.selectOptions)}
                </select>
                <label htmlFor="subCategoryThree">Third Sub category</label>
                <select name="subCategoryThree" value={this.state.selectedSubCatThree.value} onChange={this.handleSubCatThreeChange} >
                    {this.state.subCatListThree.map(this.selectOptions)}
                </select>
                <label htmlFor="nameSearch">Search</label>
                <input name="nameSearch" type="text" value={this.state.nameSearch} onChange={this.handleSearchChange} placeholder="Search term"></input>
                <button type="submit" value="submit" onClick={this.handleSubmit}>Search</button>
            </form>
        </div>
        );
    }
}