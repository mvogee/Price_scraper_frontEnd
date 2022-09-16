export default QueryForm;

function QueryForm(props) {
    return (
        <div className="form queryForm">
            <label htmlFor="sqlInput">SQL Query</label>
            <p>only SELECT queries are valid <br/> usable tables: platt_products</p>
            <textarea name="sqlInput" type="textarea" onChange={props.onChange} value={props.sql} placeholder="SELECT * from platt_products"></textarea>
        </div>
    )
}

