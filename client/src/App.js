import React from "react";
import NavHeader from "./components/NavHeader";
import Aboutus from "./pages/Aboutus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Store from "./pages/Store";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Success from "./pages/Success";
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <NavHeader className="monster" />
          {/* <Profile /> */}
          {/* <Home /> */}
          {/* <Aboutus /> */}
          {/* <Signup /> */}
          {/* <Login /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/aboutus" component={Aboutus} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/community" component={Community} />
            <Route exact path="/success" component={Success} />
            {/* <Route exact path="/products/:id" component={Detail} />
            <Route exact path="/success" component={Success} /> */}
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
