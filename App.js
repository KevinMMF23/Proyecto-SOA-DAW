import React from "react";
import home from "./screens/home";
import login from "./screens/login";
import firebaseapp from "./firebase/credenciales";
import {getAuth,onAuthStateChanged}from "firebase/auth"
const auth = getAuth(firebaseapp);

function App() {

  const [user, setUser] = useState(null);
 
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null)
    }
  });

  return <>{user ? <Home /> : <Login />}</>;
}

export default App;
