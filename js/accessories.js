// accessories.js
import { db } from '../firebase/firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { renderItems } from './main.js';

// Manejo del formulario de agregar accesorio
document.getElementById('add-accessory-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "accessory"), {
        name: e.target.name.value,
        price: e.target.price.value,
        description: e.target.description.value
    });
    e.target.reset();
    renderItems('accessory'); // Renderizar la lista actualizada
});

// Manejo de la lista de accesorios
document.getElementById('accessory-list').addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id;
        const newName = prompt('Nuevo nombre:');
        if (newName) {
            const itemRef = doc(db, "accessory", id);
            await updateDoc(itemRef, { name: newName });
            renderItems('accessory'); // Renderizar la lista actualizada
        }
    } else if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        await deleteDoc(doc(db, "accessory", id));
        renderItems('accessory'); // Renderizar la lista actualizada
    }
});

// Llama a renderItems cuando se carga la página
renderItems('accessory'); // Esto debería funcionar para cargar los accesorios
