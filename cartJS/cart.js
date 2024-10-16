let cart = [];

// Cargar el carrito desde localStorage
const loadCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart();
    }
};

// Renderizar el carrito en la página
const renderCart = () => {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = ''; // Limpiar la lista antes de renderizar
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity; // Calcular el total
        const itemDiv = document.createElement('div');
        itemDiv.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemDiv.innerHTML = `
            <div>
                <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
                <button class="btn btn-sm btn-light change-quantity" data-index="${index}" data-action="decrease">-</button>
                <span class="mx-2">Cantidad: ${item.quantity}</span>
                <button class="btn btn-sm btn-light change-quantity" data-index="${index}" data-action="increase">+</button>
            </div>
        `;
        cartList.appendChild(itemDiv);
    });

    cartTotal.textContent = total.toFixed(2); // Mostrar el total
};

// Manejo de eventos para cambiar la cantidad
document.getElementById('cart-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('change-quantity')) {
        const index = e.target.dataset.index;
        const action = e.target.dataset.action;

        if (action === 'increase') {
            cart[index].quantity += 1; // Aumentar la cantidad
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity -= 1; // Disminuir la cantidad
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
        renderCart(); // Volver a renderizar el carrito
    }
});

// Finalizar la compra
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    
    // Aquí podrías agregar lógica para finalizar la compra, como guardar en Firestore o similar.
    
    alert('Compra realizada con éxito!');
    cart = []; // Vaciar el carrito
    localStorage.removeItem('cart'); // Eliminar del localStorage
    renderCart(); // Actualizar la vista
});

// Cargar y mostrar el carrito al cargar la página
loadCart();
