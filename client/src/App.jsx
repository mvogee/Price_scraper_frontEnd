
import './App.css';

import QueryForm from './SqlQueryForm';
import SearchForm from './SearchForm';

function App() {
  let vendors = [{key: 4, value:"select"} ,{key: 0, value: "platt"}, {key: 1, value: "Home Deport"}, {key: 2, value: "Bell Electric"}];
  let categorys = [{key: 0, value: "cat 1"}, {key: 1, value: "cat 2"}, {key: 2, value: "cat 3"},];
  return (
    <div className="App">
      <header className="App-header">
        <QueryForm name="Matthew Vogee"/>
        <SearchForm vendors={vendors} categorys={categorys}/>
      </header>
    </div>
  );
}

export default App;
