import React from "react";
import ItemCard from "../itemCard/itemCard";
import "./ResultViewer.css";
export default ResultViewer;

// getData should take a queryString and do a fetch request to the server to aquire data

function ResultViewer(props) {

    function item(item){
        return (
            <ItemCard
                key={item.id}
                imageurl={item.img_link}
                headline={item.headline}
                category={item.category ? item.category : ""}
                subCatOne={item.sub_category_one ? item.sub_category_one : ""}
                subCatTwo={item.sub_category_two ? item.sub_category_two : ""}
                subCatThree={item.sub_category_three ? item.sub_category_three : ""}
                manufacturer={item.manufacturer}
                price={item.price}
                itemId={item.platt_id}
                detailDescription={item.description}
                alsoKnownAs={item.also_known_as}
                upc={item.upc}
                dateUpdated={item.date_updated}
            />
        )
    }

    return (
        <div className="ResultViewer">
            {props.data.results.map(item)}
        </div>
    )
}