import "./ItemCard.css";
import React, { useState } from 'react';
export default ItemCard;


function ItemCard(props) {
    const [vissible, setVisible] = useState(false);
    return (
        <div className="ItemCard" onClick={() => setVisible(!vissible)}>
            <div className="heading">
                <img className="itemImg" src={props.imageurl} alt="productImage"/>
                <h3 className="itemHeadline">{props.headline}</h3>
            </div>
            <ul className={vissible ? "detailsShown" : "detailsHidden"}>
                <li className="categoryList"><span className="li_label">Categorys:</span> {props.category} {'>'} {props.subCatOne} {'>'} {props.subCatTwo} {'>'} {props.subCatThree}</li>
                <li className="itemManufacturer"><span className="li_label">Manufacturer:</span> {props.manufacturer}</li>
                <li className="itemPrice"><span className="li_label">Price:</span> {props.price}</li>
                <li className="itemId"><span className="li_label">Item id:</span> {props.itemId}</li>
                <li className="detailDescription"><span className="li_label">Description:</span> {props.detailDescription}</li>
                <li className="alsoKnownAs"><span className="li_label">Also known as:</span> {props.alsoKnownAs}</li>
                <li className="upc"><span className="li_label">upc:</span> {props.upc}</li>
                <li className="updatedDate"><span className="li_label">last updated:</span> {props.dateUpdated}</li>
            </ul>
        </div>
    )
}