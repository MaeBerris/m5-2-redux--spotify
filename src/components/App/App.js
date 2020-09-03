import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ArtistRoute from "../ArtistRoute";
import GlobalStyles from "../GlobalStyles";

const DEFAULT_ARTIST_ID = "2uYWxilOVlUdk4oV9DvwqK";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
