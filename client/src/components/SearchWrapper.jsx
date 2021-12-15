import React from "react";
//import QueryForm from "./SqlQueryForm";
import Select from "./Select";
import ResultViewer from "./ResultViewer";
import "./SearchWrapper.css"



export default class SearchWrapper extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedVendor: this.props.vendors[0].value,
            vendorList: this.props.vendors,

            selectedCategory: "none",
            categoryList: [],

            selectedSubCatOne: "none",
            subCatListOne: [],

            selectedSubCatTwo: "none",
            subCatListTwo: [],

            selectedSubCatThree: "none",
            subCatListThree: [],

            nameSearch: "",
            
            sqlSearch: "",

            data: {numResults: 0, results: []},
            resultPage: 1,
            lastSubmittedReq: {
                searchType: "form",
                resultPage: 1
            },
            resultsPerPage: 50,
            includeDiscontinued: false,
            includeUnpriced: true
        };
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleSubCatOneChange = this.handleSubCatOneChange.bind(this);
        this.handleSubCatTwoChange = this.handleSubCatTwoChange.bind(this);
        this.handleSubCatThreeChange = this.handleSubCatThreeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSqlChange = this.handleSqlChange.bind(this);
        this.handleSqlSubmit = this.handleSqlSubmit.bind(this);
        this.nextResults = this.nextResults.bind(this);
        this.prevResults = this.prevResults.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    serverDataRequest = async (route, queryInputs, setStateFunc) => {
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
        const response = await fetch(route , options);
        const body = await response.json();
        if (body.message) {
            alert("the search you just tried to perform failed.\n" + body.message + "\n" + body.error);
            return ;
        }
        setStateFunc(body);
    }

    handleVendorChange(e) {
        const searchData = {selectedVendor: e.target.value}
        this.serverDataRequest("/vendorSelect", searchData,
            (data) => {
                const formattedData = data.map((item, idx) => {
                    return {key: idx, value: item.category};
                });
                this.setState({categoryList: formattedData});
            }
        );
        this.setState({
            selectedVendor: e.target.value,
            selectedCategory: "none",
            selectedSubCatOne: "none",
            subCatListOne: [],
            selectedSubCatTwo: "none",
            subCatListTwo: [],
            selectedSubCatThree: "none",
            subCatListThree: [],
        });
    }
    handleCatChange(e) {
        const searchData = {
            selectedVendor: this.state.selectedVendor,
            selectedCategory: e.target.value
            };
        this.serverDataRequest("/categorySelect", searchData,
            (data) => {
                const formattedData = data.map((item, idx) => {
                    return ({key: idx, value: item.sub_category_one});
                });
                this.setState({subCatListOne: formattedData});
            }
        );
        this.setState({
            selectedCategory: e.target.value,
            selectedSubCatOne: "none",
            subCatListOne: [],
            selectedSubCatTwo: "none",
            subCatListTwo: [],
            selectedSubCatThree: "none",
            subCatListThree: [],
        });
    }
    handleSubCatOneChange(e) {
        const searchData = {
            selectedVendor: this.state.selectedVendor,
            selectedCategory: this.state.selectedCategory,
            selectedSubCategory: e.target.value
        }
        this.serverDataRequest("/subCatSelect", searchData,
            (data) => {
                const formattedData = data.map((item, idx) => {
                    return ({key: idx, value: item.sub_category_two});
                });
                this.setState({subCatListTwo: formattedData});
            }
        );
        this.setState({
            selectedSubCatOne: e.target.value,
            selectedSubCatTwo: "none",
            selectedSubCatThree: "none",
            subCatListThree: [],
            //subCatListTwo: [{key: 0, value: "sub2 1"}, {key: 1, value: "sub2 2"}, {key: 2, value: "sub2 3"}, {key: 3, value: "sub2 4"}]
        });
    }
    handleSubCatTwoChange(e) {
        const searchData = {
            selectedVendor: this.state.selectedVendor,
            selectedCategory: this.state.selectedCategory,
            selectedSubCategory: this.state.selectedSubCatOne,
            selectedSubCatTwo: e.target.value
        }
        this.serverDataRequest("/filterOneSelect", searchData,
            (data) => {
                const formattedData = data.map((item, idx) => {
                    return ({key: idx, value: item.sub_category_three});
                });
                this.setState({subCatListThree: formattedData});
            }
        );
        this.setState({
            selectedSubCatTwo: e.target.value,
            //subCatListThree: [{key: 0, value: "sub3 1"}, {key: 1, value: "sub3 2"}, {key: 2, value: "sub3 3"}, {key: 3, value: "sub3 4"}]
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

    handleCheckBoxChange(e) {
        const value = e.target.checked;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSqlChange(e) {
        this.setState({
            sqlSearch: e.target.value
        });
    }

    handleSqlSubmit(e) {
        e.preventDefault();
        const queryData = {
            searchType: "sql",
            sqlInput: this.state.sqlSearch,
            resultPage: 1,
            resultsPerPage: this.state.resultsPerPage
        };
        this.setState({
            resultPage: 1,
            lastSubmittedReq: queryData
        });
        this.serverDataRequest("/sqlQuery", queryData, (data) => {this.setState({data: data})});
    }

    handleSubmit(e) {
        e.preventDefault();
        const queryData = {
            searchType: "form",
            vendor: this.state.selectedVendor,
            category: this.state.selectedCategory,
            subCat: this.state.selectedSubCatOne,
            subCatTwo: this.state.selectedSubCatTwo,
            subCatThree: this.state.selectedSubCatThree,
            nameSearch: this.state.nameSearch,
            resultPage: 1,
            resultsPerPage: this.state.resultsPerPage,
            discontinued: this.state.includeDiscontinued,
            unpriced: this.state.includeUnpriced
        }
        this.setState({
            resultPage: 1,
            lastSubmittedReq: queryData
        });
        
        this.serverDataRequest("/search", queryData, (data) => {this.setState({data: data})});
        // query database for results based off of these states. if a state is not set should be * in query
    }

    prevResults() {
        this.setState((prevState) => ({resultPage: prevState.resultPage - 1}));
        let searchData = Object.assign({}, this.state.lastSubmittedReq);
        searchData.resultPage = this.state.resultPage - 1;
        if (this.state.lastSubmittedReq.searchType === "form") {
            this.serverDataRequest("/search", searchData, (data) => {this.setState({data: data})});
        }
        else {
            this.serverDataRequest("/sqlQuery", searchData, (data) => {this.setState({data: data})});
        }
    }
    nextResults() {
        this.setState((prevState) => ({resultPage: prevState.resultPage + 1}));
        let searchData = Object.assign({}, this.state.lastSubmittedReq);
        searchData.resultPage = this.state.resultPage + 1;
        if (this.state.lastSubmittedReq.searchType === "form") {
            this.serverDataRequest("/search", searchData, (data) => {this.setState({data: data})});
        }
        else {
            this.serverDataRequest("/sqlQuery", searchData, (data) => {this.setState({data: data})});
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div className="SearchWrapper">
                {/* <form>
                    <QueryForm sql={this.state.sqlSearch} onChange={this.handleSqlChange}/>
                    <button type="submit" onClick={this.handleSqlSubmit}><span>Run Query</span></button>
                </form> */}
                <form>
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
                        label="Filter"
                        selectName="filterOne"
                        selected={this.state.selectedSubCatTwo}
                        onChange={this.handleSubCatTwoChange}
                        optionList={this.state.subCatListTwo}
                    />
                    <Select
                        label="Sub Filter"
                        selectName="filterTwo"
                        selected={this.state.selectedSubCatThree}
                        onChange={this.handleSubCatThreeChange}
                        optionList={this.state.subCatListThree}
                    />
                    <label className="nameSeachLabel" htmlFor="nameSearch">Search term</label>
                    <input name="nameSearch" type="text" value={this.state.nameSearch} onChange={this.handleSearchChange} placeholder="20 Amp"></input>
                    <div className="checkboxes">
                        <input name="includeDiscontinued" type="checkbox" checked={this.state.includeDiscontinued} onChange={this.handleCheckBoxChange}></input>
                        <label className="checkboxLabel" htmlFor="includeDiscontinued"> Include discontinued products</label>
                        <br/>
                        <input name="includeUnpriced" type="checkbox" checked={this.state.includeUnpriced} onChange={this.handleCheckBoxChange}></input>
                        <label className="checkboxLabel" htmlFor="includeUnpriced"> Include unpriced products</label>
                    </div>
                    <button className="submit_btn" type="submit" value="submit" onClick={this.handleSubmit}>Search</button>
                </form>
                <div className="results-info">
                        {this.state.data.numResults ?
                        <p><span className="resultnumStart">{(this.state.resultsPerPage * this.state.resultPage) - this.state.resultsPerPage} - {this.state.resultsPerPage * this.state.resultPage < this.state.data.numResults ?
                        this.state.resultsPerPage * this.state.resultPage : this.state.data.numResults}</span>
                        / <span className="resultnumEnd">{this.state.data.numResults}</span></p> : ""}
                        <div className="nextPrevBtns">
                            {this.state.resultPage > 1 ?
                            <button className="previousResultsButton" onClick={this.prevResults}>back</button> : ""}
                            {this.state.data.numResults - (this.state.resultsPerPage * this.state.resultPage) > 0 ?
                            <button className="nextResultsButton" onClick={this.nextResults}>next {'>'}</button> : ""}
                        </div>
                    </div>
                <div className="results">
                    <ResultViewer data={this.state.data} />
                </div>
                {this.state.data.numResults > 0 ? <button className="topBtn" onClick={this.scrollToTop}>^ back to top ^</button> : ''}
            </div>
        )
    }
}