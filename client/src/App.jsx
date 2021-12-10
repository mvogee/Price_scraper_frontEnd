
import './App.css';
import SearchWrapper from './components/SearchWrapper';

function App() {
const vendors = [{key: 0, value: "Platt"}];
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <SearchWrapper vendors={vendors}/>
    </div>
  );
}

export default App;
