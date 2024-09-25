// /js/controlador.js
import { auth, signInWithEmailAndPassword } from "../firebase/firebase.js";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            console.log("Usuario iniciado:", user);
            window.location.href = '/ruta/del/dashboard.html'; // Redirige al dashboard o página principal
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('loginError').textContent = errorMessage;
        });
});
