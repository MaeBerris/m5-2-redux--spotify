# Redux async

---

Now that you've seen redux, hopefully this pattern looks familiar:

```js
const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(someAction());
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# A new scenario

I need to request some data from the server.

I want to show a spinner while it's fetching

---

Let's solve this together

```js
// My actions:
const startRequestingData = () => ({
  type: "START_REQUESTING_DATA",
});

const receiveData = (data) => ({
  type: "RECEIVE_DATA",
  data,
});

const failToRetrieveData = (error) => ({
  type: "FAIL_TO_RETRIEVE_DATA",
  error,
});

const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    fetch("/some-data")
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {});
  };

  return <button onClick={handleClick}>Do something</button>;
};

//solution

const startRequestingData = () => ({
  type: "START_REQUESTING_DATA",
});

const receiveData = (data) => ({
  type: "RECEIVE_DATA",
  data,
});

const failToRetrieveData = (error) => ({
  type: "FAIL_TO_RETRIEVE_DATA",
  error,
});

const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startRequestingData());

    fetch("/some-data")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveData());
      })
      .catch((err) => {
        dispatch(failedToReceiveData());
      });
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# Exercises

Dispatch the actions

---

<Timer />

```js
const receiveHockeyScores = (scores) => ({
  type: "RECEIVE_HOCKEY_SCORES",
  scores,
});
const receiveBaseballScores = (scores) => ({
  type: "RECEIVE_BASEBALL_SCORES",
  scores,
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch("/hockey")
      .then((res) => res.json())
      .then((scores) => {
        // TODO
      });

    fetch("/baseball")
      .then((res) => res.json())
      .then((scores) => {
        // TODO
      });
  }, []);

  return <Scores />;
};

//solution
const requestScores = () => ({
  type: "REQUEST_SCORES",
});

const receiveHockeyScores = (scores) => ({
  type: "RECEIVE_HOCKEY_SCORES",
  scores,
});
const receiveBaseballScores = (scores) => ({
  type: "RECEIVE_BASEBALL_SCORES",
  scores,
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestScores());

    fetch("/hockey")
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveHockeyScores(scores));
      });

    fetch("/baseball")
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveBaseballScores(scores));
      });
  }, []);

  return <Scores />;
};
```

---

# Extra Challenge

Update this example so that it dispatches an action when _both_ of the endpoints have completed

---

<Timer />

```js
const receiveAllScores = () => ({
  type: "RECEIVE_ALL_SCORES",
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed

    fetch("/hockey").then((scores) => {
      dispatch(receiveHockeyScores(scores));
    });

    fetch("/baseball").then((scores) => {
      dispatch(receiveBaseballScores(scores));
    });
  }, []);

  return <Scores />;
};

//solution

const receiveAllScores = (hockeyScores, baseballScores) => ({
  type: "RECEIVE_ALL_SCORES",
  hockeyScores,
  baseballScores,
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Dispatch `receiveAllScores` after BOTH fetches have completed

    const hockey = fetch("/hockey").then((scores) => {
      dispatch(receiveHockeyScores(scores));
    });

    const baseball = fetch("/baseball").then((scores) => {
      dispatch(receiveBaseballScores(scores));
    });

    Promise.all(hockey, baseball).then([hockeyScore, baseballScore] => {dispatch(receveilAllScores(hockeyScore, baseballScore))}
      );
  }, []);

  return <Scores />;
};
```

---
