import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import ArtistRoute from "../ArtistRoute";
import GlobalStyles from "../GlobalStyles";

import {
  receiveAccessToken,
  requestAccessToken,
  receiveAccessTokenError,
} from "../../action";

const DEFAULT_ARTIST_ID = "2uYWxilOVlUdk4oV9DvwqK";

const App = () => {
  const dispatch = useDispatch();

  dispatch(requestAccessToken());
  React.useEffect(() => {
    fetch("/spotify_access_token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveAccessToken(data.response.access_token));
      })
      .catch((err) => dispatch(receiveAccessTokenError()));
  }, []);
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
