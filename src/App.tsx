import { Route, Routes, BrowserRouter } from "react-router-dom";
import Details from "./component/Details";
import React from "react";
import { Provider } from "react-redux";
import store from "./component/store";
import Tabs from "./component/Tabs";
import Authentication from "./component/Login";
const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/homepage" element={<Tabs />} />
            <Route path="/:firstName/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
