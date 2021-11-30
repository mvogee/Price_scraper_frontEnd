import React from "react";
import ItemCard from "./ItemCard";
export default ResultViewer;

// getData should take a queryString and do a fetch request to the server to aquire data

function ResultViewer(props) {

    function item(item){
        return (
            <ItemCard
                // key={item.id} //! only effective once data is coming from database
                imageurl={item.img_link}
                headline={item.headline}
                category={item.category ? item.category : ""}
                subCatOne={item.subCategorys && item.subCategorys.length > 0 ? item.subCategorys[0] : ""}
                subCatTwo={item.subCategorys && item.subCategorys.length > 1 ? item.subCategorys[1] : ""}
                subCatThree={item.subCategorys && item.subCategorys.length > 2 ? item.subCategorys[2] : ""}
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