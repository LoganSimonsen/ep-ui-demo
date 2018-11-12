import React from "react";
import { Switch, Route } from "react-router-dom";
import Purchase from './Purchase'
import App from "./App";


export default (
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/purchase" component={Purchase} />

        <Route
            path="*"
            render={() => (
                <div>
                    <p>Not Found</p>
                </div>
            )}
        />
    </Switch>
);