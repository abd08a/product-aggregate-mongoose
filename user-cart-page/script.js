document.addEventListener("DOMContentLoaded", function () {
  // Fetch user cart products when the page is loaded
  fetchUserCartProducts();
});

function fetchUserCartProducts() {
  // Make a GET request to your backend API endpoint to fetch user cart products
  fetch("http://localhost:3001/carts/6612e5661d57d0d2b861a410")
    .then((response) => response.json())
    .then((data) => renderUserCartProducts(data.cart[0].cartProducts))
    .catch((error) =>
      console.error("Error fetching user cart products:", error)
    );
}

function renderUserCartProducts(cartProducts) {
  console.log(cartProducts);
  const userProductListDiv = document.getElementById("userProductList");
  userProductListDiv.innerHTML = ""; // Clear previous content

  // Check if cartProducts is an array
  if (Array.isArray(cartProducts)) {
    // Iterate over each product in the cart
    cartProducts.forEach((product) => {
      // Create elements for product details
      const productCardDiv = document.createElement("div");
      productCardDiv.classList.add("product-card");

      const titleHeading = document.createElement("h3");
      titleHeading.textContent = product.title;

      const descriptionPara = document.createElement("p");
      descriptionPara.textContent = product.description;

      // Append elements to productCardDiv
      productCardDiv.appendChild(titleHeading);
      productCardDiv.appendChild(descriptionPara);

      // Append productCardDiv to userProductListDiv
      userProductListDiv.appendChild(productCardDiv);
    });
  } else {
    console.error("Error: Cart products are not in expected format");
  }
}
