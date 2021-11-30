
import './App.css';
import SearchWrapper from './components/SearchWrapper';

function App() {
const vendors = [{key: 4, value:"none"}, {key: 0, value: "Platt"}, {key: 1, value: "Home Depot"}, {key: 2, value: "Bell Electric"}];
  return (
    <div className="App">
      <header className="App-header">
      <SearchWrapper vendors={vendors}/>
      </header>
    </div>
  );
}

export default App;
