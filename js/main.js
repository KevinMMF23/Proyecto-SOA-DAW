import { db } from '../firebase/firebase.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Función para renderizar los ítems desde la colección de Firestore
export const renderItems = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const itemList = document.getElementById(`${collectionName}-list`);
    if (!itemList) return; // Verifica si el elemento existe antes de proceder
    itemList.innerHTML = ''; // Limpiar la lista antes de renderizar

    querySnapshot.forEach(doc => {
        const item = doc.data();
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${item.name}</p>
            <p><strong>Precio:</strong> $${item.price}</p>
            <p><strong>Descripción:</strong> ${item.description}</p>
            <button class="edit" data-id="${doc.id}">Editar</button>
            <button class="delete" data-id="${doc.id}">Eliminar</button>
        `;
        itemList.appendChild(itemDiv);
    });
};

// Manejo de eventos para el formulario de añadir nuevo item
export const setupAddItemForm = (formId, collectionName) => {
    const form = document.getElementById(formId);
    if (!form) return; // Verifica si el formulario existe antes de agregar el listener
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addDoc(collection(db, collectionName), {
            name: e.target.name.value,
            price: e.target.price.value,
            description: e.target.description.value
        });
        e.target.reset();
        renderItems(collectionName); // Renderizar la lista actualizada
    });
};

// Manejo de eventos de editar y eliminar
export const setupItemList = (listId, collectionName) => {
    const itemList = document.getElementById(listId);
    if (!itemList) return; // Verifica si la lista existe antes de agregar el listener
    itemList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const newName = prompt('Nuevo nombre:');
            if (newName) {
                const itemRef = doc(db, collectionName, id);
                await updateDoc(itemRef, { name: newName });
                renderItems(collectionName); // Renderizar la lista actualizada
            }
        } else if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteDoc(doc(db, collectionName, id));
            renderItems(collectionName); // Renderizar la lista actualizada
        }
    });
};

// Inicializar eventos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const pathArray = window.location.pathname.split('/');
    const collectionName = pathArray[pathArray.length - 1].split('.')[0]; // Obtener el nombre de la colección desde el nombre del archivo
    renderItems(collectionName);
    setupAddItemForm(`add-${collectionName}-form`, collectionName); // Configurar el formulario de añadir
    setupItemList(`${collectionName}-list`, collectionName); // Configurar la lista de ítems
});
