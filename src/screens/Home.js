import React from "react";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div>
      <h1>
        {user.rol === "admin" ? `¡Hola Admin ${user.email}!` : `¡Hola User ${user.email}!`}
      </h1>
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
    </div>
  );
}

export default Home;
