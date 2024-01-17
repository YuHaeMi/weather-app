import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from './page/SearchPage';
import ResultPage from './page/ResultPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
