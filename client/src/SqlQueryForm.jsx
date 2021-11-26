export default QueryForm;

function QueryForm(props) {
    return (
        <div className="form queryForm">
            <p>{props.name}</p>
            <label htmlFor="sql-input">SQL Query</label>
            <p>only SELECT queries are valid <br/> usable tables: platt_products</p>
            <input name="sql-input" type="text" placeholder="SELECT * from platt_products"></input>
            <button type="submit"><span>Run Query</span></button>
        </div>
    )
}

