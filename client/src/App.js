import { useState, useEffect } from "react";
import { AdminHome } from "./components/AdminHome";
import Login from "./components/Login/Login";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? (
        <AdminHome setloggedIn={setloggedIn} />
      ) : (
        <Login setloggedIn={setloggedIn} />
      )}
    </div>
  );
}

export default App;

// TODO tabs
// TODO today Fine, Pending Fine, All Fine this year
//TODO ModelBox
