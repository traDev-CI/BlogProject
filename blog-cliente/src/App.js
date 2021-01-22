import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/Routes';
import AuthProvider from './provider/AuthProvider';
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return <RouteWithSubRoutes key={index} {...route} />
          })}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
function RouteWithSubRoutes(route) {
  return (
    <Route path={route.path} exact={Router.exact} render={props => <route.component routes={route.routes} {...props} />} />
  )
}
export default App;
