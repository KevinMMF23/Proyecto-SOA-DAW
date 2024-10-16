import React from 'react'
import firebaseApp from './firebase/credenciales'
import firebaseApp from "firebase/auth";

function home() {
  return (
    <div>home
      <button onClick= {()=> signOut(auth)}>cerrar sesion
      </button>
    </div>
  )
}

export default home