import React from 'react';
import ReactDOM from "react-dom";
import Converter from "./converter.jsx"
import ChartsPage from "./chart.jsx"
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(<Converter/>, document.getElementById("root"));
// ReactDOM.render(<ChartsPage/>, document.getElementById("secondroot"));