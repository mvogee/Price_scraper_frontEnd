import React from "react";
import ItemCard from "./ItemCard";
export default ResultViewer;

// getData should take a queryString and do a fetch request to the server to aquire data

function ResultViewer(props) {

    function item(item){
        return (
            <ItemCard
                key={item.id} //! only effective once data is coming from database
                imageurl={item.img_link}
                headline={item.headline}
                category={item.category ? item.category : ""}
                subCatOne={item.sub_category_one ? item.sub_category_one : ""}
                subCatTwo={item.sub_category_two ? item.sub_category_two : ""}
                subCatThree={item.sub_category_three ? item.sub_category_three : ""}
                manufacturer={item.manufacturer}
                price={item.price}
                itemId={item.plattItemId}
                detailDescription={item.detailDescription}
                alsoKnownAs={item.alsoKnownAs}
                upc={item.upc}
                dateUpdated={item.date_updated}
            />
        )
    }

    return (
        <div className="resultViewer">
            {props.data.map(item)}
            {/* should make a way to only display up to 50 results on one page at a time for large datasets */}
        </div>
    )
}