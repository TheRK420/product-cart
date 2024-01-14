document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product-1", price: 100 },
    { id: 2, name: "Product-2", price: 200 },
    { id: 3, name: "Product-3", price: 300 },
  ];

  const productList = document.getElementById("productList");
  const shoppingCart = document.getElementById("shoppingCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const noProductsMsg = document.getElementById("noProductsMsg");

  let cart = [];

  function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  function renderProductList() {
    const productListUl = productList.querySelector("ul");
    productListUl.innerHTML = "";

    products.forEach((product) => {
      const li = document.createElement("li");
      const productDiv = document.createElement("div");
      productDiv.className = "product-item";
      productDiv.id = `product-${product.id}`;

      const addButton = createButton("+", () => addToCart(product));
      const countSpan = document.createElement("span");
      countSpan.textContent = 0;
      countSpan.id = `product-${product.id}-count`;

      const removeButton = createButton("-", () =>
        removeFromCart(product)
      );
      productDiv.appendChild(removeButton);

      productDiv.appendChild(countSpan);
      productDiv.appendChild(addButton);

      li.appendChild(
        document.createTextNode(`${product.name} - $${product.price}`)
      );
      li.appendChild(productDiv);
      productListUl.appendChild(li);
    });
  }

  function renderShoppingCart() {
    const cartItemsUl = cartItems;
    cartItemsUl.innerHTML = "";

    let totalPrice = 0;
    let cartIsEmpty = true;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product.id);

      if (cartItem.quantity > 0) {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ${cartItem.quantity} x $${
          product.price
        } = $${cartItem.quantity * product.price}`;
        cartItemsUl.appendChild(li);

        totalPrice += cartItem.quantity * product.price;
        cartIsEmpty = false;
      }
    });

    if (!cartIsEmpty) {
      noProductsMsg.classList.add("hidden");
      cartTotal.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
      cartTotal.classList.remove("hidden");
    } else {
      noProductsMsg.classList.remove("hidden");
      cartTotal.classList.add("hidden");
    }
  }

  function addToCart(product) {
    const existingItem = cart.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    const countSpan = document.getElementById(
      `product-${product.id}-count`
    );
    if (countSpan) {
      countSpan.textContent = existingItem ? existingItem.quantity : 1;
    }

    renderShoppingCart();
  }

  function removeFromCart(product) {
    const existingItem = cart.find(
      (item) => item.product.id === product.id
    );
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
    }

    const countSpan = document.getElementById(
      `product-${product.id}-count`
    );
    if (countSpan) {
      countSpan.textContent = existingItem ? existingItem.quantity : 0;
    }

    renderShoppingCart();
  }

  renderProductList();
  renderShoppingCart();
});