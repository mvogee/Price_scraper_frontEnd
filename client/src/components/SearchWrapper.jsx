import React from "react";
import QueryForm from "./SqlQueryForm";
import Select from "./Select";
import ResultViewer from "./ResultViewer";



export default class SearchWrapper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedVendor: this.props.vendors[0].value,
            vendorList: this.props.vendors,

            selectedCategory: [{key: 0, value: "none"}],
            categoryList: [{key: 0, value: "select"}],

            selectedSubCatOne: {key: 0, value: "none"},
            subCatListOne: [{key: 0, value: "select"}],

            selectedSubCatTwo: {key: 0, value: "none"},
            subCatListTwo: [{key: 0, value: "select"}],

            selectedSubCatThree: {key: 0, value: "none"},
            subCatListThree: [{key: 0, value: "select"}],

            nameSearch: "",

            data: []
        };
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleSubCatOneChange = this.handleSubCatOneChange.bind(this);
        this.handleSubCatTwoChange = this.handleSubCatTwoChange.bind(this);
        this.handleSubCatThreeChange = this.handleSubCatThreeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleVendorChange(e) {
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
    }

    requestQueryData = async (queryInputs) => {
        const options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(queryInputs) // body data type must match "Content-Type" header
                };
        const response = await fetch("/search" , options);
        const body = await response.json();
        this.setState({data: body});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submit button was pressed.");
        const queryData = {
            vendor: this.state.selectedVendor,
            category: this.state.selectedCategory,
            subCat: this.state.selectedSubCatOne,
            subCatTwo: this.state.selectedSubCatTwo,
            subCatThree: this.state.selectedSubCatThree,
            nameSearch: this.state.nameSearch
        }
        //console.log(queryData);
        this.requestQueryData(queryData);
        // query database for results based off of these states. if a state is not set should be * in query
    }
    render() {
        console.log(this.props);
        return (
            <div className="searchWrapper">
            <form>
                <QueryForm name="Matthew Vogee"/>
                <Select
                    label="Vendor"
                    selectName="vendorList"
                    selected={this.state.selectedVendor}
                    onChange={this.handleVendorChange}
                    optionList={this.state.vendorList}
                />
                <Select
                    label="Category"
                    selectName="categoryList"
                    selected={this.state.selectedCategory}
                    onChange={this.handleCatChange}
                    optionList={this.state.categoryList}
                />
                <Select
                    label="Sub Category"
                    selectName="SubCategory"
                    selected={this.state.selectedSubCatOne}
                    onChange={this.handleSubCatOneChange}
                    optionList={this.state.subCatListOne}
                />
                <Select
                    label="Filter 1"
                    selectName="filterOne"
                    selected={this.state.selectedSubCatTwo}
                    onChange={this.handleSubCatTwoChange}
                    optionList={this.state.subCatListTwo}
                />
                <Select
                    label="filter 2"
                    selectName="filterTwo"
                    selected={this.state.selectedSubCatThree}
                    onChange={this.handleSubCatThreeChange}
                    optionList={this.state.subCatListThree}
                />
                 <label htmlFor="nameSearch">Search</label>
                <input name="nameSearch" type="text" value={this.state.nameSearch} onChange={this.handleSearchChange} placeholder="Search term"></input>
                <button type="submit" value="submit" onClick={this.handleSubmit}>Search</button>
            </form>
            <div className="results">
                <ResultViewer data={this.state.data} />
            </div>
            </div>
        )
    }
}