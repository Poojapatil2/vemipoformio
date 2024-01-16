import "./App.css";
import { Formio, Components } from "@formio/react";
import FormioContrib from "@formio/contrib";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowFormList from "./components/ShowFormList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';
import Builder from "./components/Builder";
import EditBuilder from "./components/EditBuilder";
import DisplayForm from "./components/DisplayForm";


function App() {

  return (
    <div className="App">
      {/* <Navigation /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route  path='/form-list' element={<ShowFormList />}></Route>
          <Route path="/form-edit" element={<EditBuilder />} />
          <Route exact path="/" element={<Builder />}></Route>
          <Route path="/show-form" element={<DisplayForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
