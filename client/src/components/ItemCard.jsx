export default ItemCard;

function ItemCard(props) {
    return (
        <div className="itemCard">
            <img className="itemImg" src={props.imageurl} alt="productImage"/>
            <h3 className="itemHeadline">{props.headline}</h3>
            <p className="categoryList">{props.category} > {props.subCatOne} > {props.subCatTwo} > {props.subCatThree}</p>
            <p className="itemManufacturer">{props.manufacturer}</p>
            <p className="itemPrice">{props.price}</p>
            <p className="itemId">{props.itemId}</p>
            <p className="detailDescription">{props.detailDescription}</p>
            <p className="alsoKnownAs">{props.alsoKnownAs}</p>
            <p className="upc">{props.upc}</p>
            <p className="updatedDate">{props.dateUpdated}</p>
        </div>
    )
}