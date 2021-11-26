let cartData = [];

function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement("button", "item__add", "Adicionar ao carrinho!")
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector("span.item__sku").innerText;
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart-data", JSON.stringify(cartData));
}

function updateCartPrice() {
  const totalPrice = cartData.reduce((acc, curr) => {
    const itemPrice = curr.salePrice;
    return acc + itemPrice;
  }, 0);
  document.querySelector(".total-price").textContent =
    Math.round(totalPrice * 100) / 100;
}

function cartItemClickListener(event) {
  const { id } = event.target;

  const itemIndex = cartData.findIndex((item) => item.sku === id);
  cartData.splice(itemIndex, 1);

  event.target.remove();
  updateCartPrice();
  saveCartToLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  return li;
}

function renderCart() {
  const cartElement = document.querySelector(".cart__items");
  cartElement.innerHTML = "";
  cartData.forEach((item) => {
    const cartItemElement = createCartItemElement(item);
    cartElement.appendChild(cartItemElement);
  });
}

function loadCartFromLocalStorage() {
  const loadedCartData = JSON.parse(localStorage.getItem("cart-data"));
  if (loadedCartData) {
    cartData = [...loadedCartData];
    renderCart();
    updateCartPrice();
  }
}

function showLoadingMessage() {
  const element = createCustomElement("p", "loading", "Loading...");
  document.querySelector(".cart").appendChild(element);
}

function removeLoadingMessage() {
  const element = document.querySelector(".loading");
  element.remove();
}

async function addItemToCart(event) {
  const sku = getSkuFromProductItem(event.target.parentElement);

  showLoadingMessage();
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const { title, price } = await response.json();
  removeLoadingMessage();

  cartData.push({ sku, name: title, salePrice: price });
  renderCart();
  updateCartPrice();
  saveCartToLocalStorage();
}

async function loadProducts(queryName) {
  const itemsSection = document.querySelector("section .items");

  showLoadingMessage();
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${queryName}`
  );
  const { results } = await response.json();
  removeLoadingMessage();

  results.forEach((product) => {
    const component = createProductItemElement({
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    });
    component.querySelector("button").addEventListener("click", addItemToCart);
    itemsSection.appendChild(component);
  });
}

function clearCart() {
  cartData = [];
  updateCartPrice();
  saveCartToLocalStorage();
  renderCart();
}

window.onload = async function onload() {
  loadCartFromLocalStorage();
  await loadProducts("computador");

  document.querySelector(".empty-cart").addEventListener("click", clearCart);
};
