import { db } from '../firebase/firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { renderItems } from './main.js';

// Manejo del formulario de agregar prenda
document.getElementById('add-clothing-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "clothing"), {
        name: e.target.name.value,
        price: e.target.price.value,
        description: e.target.description.value
    });
    e.target.reset();
    renderItems('clothing');
});

// Manejo de la lista de ropa
document.getElementById('clothing-list').addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id;
        const newName = prompt('Nuevo nombre:');
        const newPrice = prompt('Nuevo precio:');
        const newDescription = prompt('Nueva descripción:');
        const itemRef = doc(db, "clothing", id);
        
        await updateDoc(itemRef, {
            name: newName,
            price: newPrice,
            description: newDescription
        });
        renderItems('clothing');
    } else if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        await deleteDoc(doc(db, "clothing", id));
        renderItems('clothing');
    }
});

// Cargar los elementos al cargar la página
renderItems('clothing');
