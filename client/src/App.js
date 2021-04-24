import React from "react";
import NavHeader from "./components/NavHeader";
import Aboutus from "./pages/Aboutus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Cardpack from "./components/Cardpack";

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
        <Aboutus />
        <Signup />
        <Login />
        <Cardpack />
      </main>
    </ApolloProvider>
  );
}

export default App;
