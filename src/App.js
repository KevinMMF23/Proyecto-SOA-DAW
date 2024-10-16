import React from "react";
import home from "../../Proyecto-SOA-DAW/screens/home";
import login from "../../Proyecto-SOA-DAW/screens/login";
import firebaseapp from "../../Proyecto-SOA-DAW/firebase/credenciales";
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
