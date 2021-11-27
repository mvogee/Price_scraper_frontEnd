import React from "react";
import QueryForm from "./SqlQueryForm";
import SearchForm from "./SearchForm";



export default class FormWrapper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedVendor: this.props.vendors[0].value,
            vendorList: this.props.vendors,

            selectedCategory: [{key: 0, value: "none"}],
            categoryList: ([{key: 0, value: "select"}]),

            selectedSubCatOne: ({key: 0, value: "none"}),
            subCatListOne: ([{key: 0, value: "select"}]),

            selectedSubCatTwo: ({key: 0, value: "none"}),
            subCatListTwo: ([{key: 0, value: "select"}]),

            selectedSubCatThree: ({key: 0, value: "none"}),
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
        console.log(this.props);
        return (
            <form>
                <QueryForm name="Matthew Vogee"/>
                <SearchForm
                    selectedVendor={this.state.selectedVendor}
                    vendorList={this.state.vendorList}
                    handleVendorChange={this.handleVendorChange}

                    selectedCategory={this.state.selectedCategory}
                    categoryList={this.state.categoryList}
                    handleCatChange={this.handleCatChange}
                    
                    selectedSubCatOne={this.state.selectedSubCatOne}
                    subCatListOne={this.state.subCatListOne}
                    handleSubCatOneChange={this.handleSubCatOneChange}
                    
                    selectedSubCatTwo={this.state.selectedSubCatTwo}
                    subCatListTwo={this.state.subCatListTwo}
                    handleSubCatTwoChange={this.handleSubCatTwoChange}
                    
                    selectedSubCatThree={this.state.selectedSubCatThree}
                    subCatListThree={this.state.subCatListThree}
                    handleSubCatThreeChange={this.handleSubCatThreeChange}
                    />
                <button type="submit" value="submit" onClick={this.handleSubmit}>Search</button>
            </form>
        )
    }
}