import { db } from '../firebase/firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { renderItems } from './main.js'; // Asegúrate de que estás importando renderItems

// Manejo del formulario de agregar accesorio
document.getElementById('add-accessory-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "accessories"), { // Cambiado a "accessories"
        name: e.target.name.value,
        price: e.target.price.value,
        description: e.target.description.value
    });
    e.target.reset();
    renderItems('accessories'); // Renderizar la lista actualizada
});

// Manejo de la lista de accesorios
document.getElementById('accessories-list').addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id;
        const newName = prompt('Nuevo nombre:');
        const newPrice = prompt('Nuevo precio:');
        const newDescription = prompt('Nueva descripción:');
        const itemRef = doc(db, "accessories", id); // Cambiado a "accessories"
        
        await updateDoc(itemRef, {
            name: newName,
            price: newPrice,
            description: newDescription
        });
        renderItems('accessories'); // Renderizar la lista actualizada
    } else if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        await deleteDoc(doc(db, "accessories", id)); // Cambiado a "accessories"
        renderItems('accessories'); // Renderizar la lista actualizada
    } else if (e.target.classList.contains('add-to-cart')) { // Agregar al carrito
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = e.target.dataset.price;
        addToCart(id, name, price); // Llamar a la función para agregar al carrito
        window.location.href = 'cart.html'; // Redirigir al carrito
    }
});

// Cargar los elementos al cargar la página
renderItems('accessories'); // Esto debería funcionar para cargar los accesorios
