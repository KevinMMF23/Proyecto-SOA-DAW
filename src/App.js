import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

import Home from "./screens/Home";
import Login from "./screens/Login";
import CartView from "./components/CartView";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });
//*
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
            {user && user.rol === "admin" && (
              <Nav.Link as={Link} to="/admin">Almacén</Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/user">Tienda</Nav.Link>
            )}
            {user && (
              <Nav.Link onClick={() => signOut(auth)}>Cerrar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Login />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/user" element={user ? <UserView user={user} /> : <Login />} />
        <Route path="/admin" element={user && user.rol === "admin" ? <AdminView /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
