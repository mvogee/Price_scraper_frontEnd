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
        this.setState({
            data: [{
                headline: "Unistrut P1212     EG Universal Conduit Clamp 3/4 ' ",
                category: 'Fittings',
                subCategorys: [
                    'Strut - Fittings & Support',
                    'Pipe & Conduit Clamps',
                    'Strut Conduit Clamps - Universal'
                ],
                manufacturer: 'Unistrut',
                price: 'Call for Price800-257-5288Email Live Help',
                detailDescription: 'Universal Strut Strap, Diameter: 3/4 in, Material: Steel, Finish: Electro-Galvanized. For Rigid/Thinwall Conduit.   ',
                plattItemId: '0060060',
                date_updated: "2021-11-29T18:36:25.178Z",
                img_link: 'https://rexel-cdn.com/Products/StrutConduitClamps-Universal/Unistrut/P1212EG.jpg?i=D0B84F12-3A57-4914-93B5-4C2A526C1EF3&f=150',
                alsoKnownAs: 'Also known as: 786364121215, UNSP1212EG, Unistrut, P1212     EG, Strut Conduit Clamps - Universal, Pipe & Conduit Clamps, Strut - Fittings & Support, Fittings',
                upc: '786364121215'
            }]
        });
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