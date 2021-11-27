import React from "react";


export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    selectOptions(option) {
        console.log("option");
        return (<option className="list-item" key={option.key} value={option.value}>{option.value}</option>)
    }

    componentDidMount() {
        console.log("mounted");
    }

    render() {
        console.log(this.props);
        return (
        <div>
            <label htmlFor="vendorList">Vendor</label>
            <select name="vendorList" value={this.props.selectedVendor.value} onChange={this.props.handleVendorChange}>
                {this.props.vendorList.map(this.selectOptions)}
            </select>
            <label htmlFor="categoryList">Category</label>
            <select name="categroyList" value={this.props.selectedCategory.value} onChange={this.props.handleCatChange}>
                {this.props.categoryList.map(this.selectOptions)}
            </select>
            <label htmlFor="subCategoryOne">Sub Category</label>
            <select name="subCategoryOne" value={this.props.selectedSubCatOne.value} onChange={this.props.handleSubCatOneChange} >
                {this.props.subCatListOne.map(this.selectOptions)}
            </select>
            <label htmlFor="subCategoryTwo">Second Sub Category</label>
            <select name="subCategoryTwo" value={this.props.selectedSubCatTwo.value} onChange={this.props.handleSubCatTwoChange} >
                {this.props.subCatListTwo.map(this.selectOptions)}
            </select>
            <label htmlFor="subCategoryThree">Third Sub category</label>
            <select name="subCategoryThree" value={this.props.selectedSubCatThree.value} onChange={this.props.handleSubCatThreeChange} >
                {this.props.subCatListThree.map(this.selectOptions)}
            </select>
            <label htmlFor="nameSearch">Search</label>
            <input name="nameSearch" type="text" value={this.props.nameSearch} onChange={this.props.handleSearchChange} placeholder="Search term"></input>
            
        </div>
        );
    }
}