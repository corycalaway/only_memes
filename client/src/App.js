import React from "react";
import NavHeader from "./components/NavHeader";
import Aboutus from "./pages/Aboutus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

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
  return (
    <ApolloProvider client={client}>
      <main>
        <NavHeader />
        <Home />
        <Aboutus />
        <Signup />
        <Login />
      </main>
    </ApolloProvider>
  );
}

export default App;
