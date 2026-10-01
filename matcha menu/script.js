let cart = {};

        function addToCart(itemName, price) {
            if (!cart[itemName]) {
                cart[itemName] = { price: price, quantity: 1 };
            } else {
                cart[itemName].quantity++;
            }
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            let total = 0;

            for (const item in cart) {
                const { price, quantity } = cart[item];
                total += price * quantity;

                const li = document.createElement('li');
                li.innerHTML = `
                    ${item}
                    <br/>
                    ₱${price.toFixed(2)} 
                    <div class="quantity-controls">
                        <button onclick="adjustQuantity('${item}', -1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="adjustQuantity('${item}', 1)">+</button>
                    </div>
                `;
                cartItems.appendChild(li);
            }
            document.getElementById('total').textContent = total.toFixed(2);
            // Ensure the cart stays visible
            document.getElementById('cart').style.display = 'block';
        }

        function adjustQuantity(itemName, change) {
            if (cart[itemName]) {
                cart[itemName].quantity += change;
                if (cart[itemName].quantity <= 0) {
                    delete cart[itemName];
                }
                updateCart();
            }
        }

        function toggleCart() {
            const cartElement = document.getElementById('cart');
            cartElement.style.display = (cartElement.style.display === 'none' || cartElement.style.display === '') ? 'block' : 'none';
        }

        function checkout() {
            if (Object.keys(cart).length > 0) {
                alert(`Thank you for your order! Your total is ₱${document.getElementById('total').textContent}`);
                cart = {};
                updateCart();
                toggleCart();
            } else {
                alert('Your cart is empty!');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('cart').style.display = 'none';
        });