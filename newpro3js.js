let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  alert(`${productName} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  alert('Item removed from cart!');
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your cart is empty.';
    cartItemsDiv.appendChild(emptyMessage);
    cartTotal.textContent = 'Total: ₦0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.textContent = `${item.name} - ₦${item.price} x ${item.quantity} = ₦${itemTotal}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeFromCart(index);
    cartItem.appendChild(removeButton);
    cartItemsDiv.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: ₦${total}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
  try {
    const name = document.getElementById('username').value.trim();
    const phone = document.getElementById('userphone').value.trim();

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const phoneRegex = /^(\+234|0)[7-9][0-1]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid Nigerian phone number');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const message = `Hello, I just placed an order:\n${cart
      .map((item) => `• ${item.name} - ₦${item.price} x ${item.quantity}`)
      .join('\n')}\n\nName: ${name}\nPhone: ${phone}\nTotal: ₦${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}\n\nI will send the payment receipt separately.`;

    const whatsappNumber = '+2348141609499';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank') || alert('Unable to open WhatsApp. Please check your connection.');

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } catch (error) {
    alert('An error occurred during checkout. Please try again.');
    console.error(error);
  }
}

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const responseDiv = document.getElementById('form-response');

  if (!name || !email || !message) {
    responseDiv.style.color = 'red';
    responseDiv.textContent = 'Please fill in all fields.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    responseDiv.style.color = 'red';
    responseDiv.textContent = 'Please enter a valid email address.';
    return;
  }

  responseDiv.style.color = 'green';
  responseDiv.textContent = `Thanks, ${name}! Your message has been sent.`;
  document.getElementById('contact-form').reset();
}

// Slider Functionality
let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const animationSelect = document.getElementById('animation-type');

function updateSlideAnimation() {
  const animationType = animationSelect.value;
  slides.forEach(slide => {
    slide.setAttribute('data-animation', animationType);
  });
}

function showSlide(slideIndex, direction = 'next') {
  if (slideIndex < 1) slideIndex = slides.length;
  if (slideIndex > slides.length) slideIndex = 1;
  
  const prevSlide = currentSlide;
  currentSlide = slideIndex;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');

  // Apply directional animation for slide
  if (animationSelect.value === 'slide') {
    slides[prevSlide - 1].style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
    slides[slideIndex - 1].style.transform = 'translateX(0)';
  }
}

function nextSlide() {
  showSlide(currentSlide + 1, 'next');
}

function prevSlide() {
  showSlide(currentSlide - 1, 'prev');
}

function goToSlide(slideIndex) {
  showSlide(slideIndex, slideIndex > currentSlide ? 'next' : 'prev');
}

// Event Listeners for Navigation
document.querySelector('.nav-prev').addEventListener('click', prevSlide);
document.querySelector('.nav-next').addEventListener('click', nextSlide);
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    goToSlide(slideIndex);
  });
});

// Animation Type Change
animationSelect.addEventListener('change', updateSlideAnimation);

// Initialize First Slide and Animation
updateSlideAnimation();
showSlide(currentSlide);
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your cart is empty.';
    emptyMessage.className = 'cart-empty';
    cartItemsDiv.appendChild(emptyMessage);
    cartTotal.textContent = 'Total: ₦0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    const itemDetails = document.createElement('span');
    itemDetails.textContent = `${item.name} - ₦${item.price} x ${item.quantity} = ₦${itemTotal}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeFromCart(index);
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(removeButton);
    cartItemsDiv.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: ₦${total}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}