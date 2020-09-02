import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";

//pages

//components

export default () => {
    <Router>
        <Layout />
        <Switch>
            <Route path="" component={Page}/>
        </Switch>
    </Router>
}