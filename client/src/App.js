import React from "react";
import NavHeader from "./components/NavHeader";
import Aboutus from "./pages/Aboutus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <main>
      <NavHeader />
      <Aboutus />
      <Signup />
      <Login />
    </main>
  );
}

export default App;
