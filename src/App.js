import { Route,Routes,BrowserRouter } from "react-router-dom";
import HomePage from "./component/HomePage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
             <Routes>
                <Route path="/" element={<HomePage/>}/>
                   
                
             </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
