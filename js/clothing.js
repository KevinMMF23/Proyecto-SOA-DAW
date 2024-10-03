// clothing.js
import { db } from '../firebase/firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { renderItems } from './main.js';

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

document.getElementById('clothing-list').addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id;
        const newName = prompt('Nuevo nombre:');
        const itemRef = doc(db, "clothing", id);
        await updateDoc(itemRef, { name: newName });
        renderItems('clothing');
    } else if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        await deleteDoc(doc(db, "clothing", id));
        renderItems('clothing');
    }
});

renderItems('clothing');
