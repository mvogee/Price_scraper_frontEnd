
import './App.css';
import FormWrapper from './components/FormWrapper';

function App() {
const vendors = [{key: 4, value:"select"}, {key: 0, value: "platt"}, {key: 1, value: "Home Deport"}, {key: 2, value: "Bell Electric"}];
const categorys = [{key: 0, value: "cat 1"}, {key: 1, value: "cat 2"}, {key: 2, value: "cat 3"}];
  return (
    <div className="App">
      <header className="App-header">
      <FormWrapper vendors={vendors} categorys={categorys}/>
      </header>
    </div>
  );
}

export default App;
