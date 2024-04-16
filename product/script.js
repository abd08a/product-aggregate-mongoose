document.addEventListener("DOMContentLoaded", function () {
  // Fetch product details when the page is loaded
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`http://localhost:3001/products/${productId}`)
    .then((response) => response.json())
    .then((data) => renderProductDetails(data))
    .catch((error) => console.error("Error fetching product details:", error));

  // Handle form submission
  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get updated values from the form
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;

    // Update product details
    updateProduct(productId, updatedTitle, updatedDescription);
  });

  // Handle delete button click
  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", function () {
    deleteProduct(productId);
  });

  // Handle add to cart button click
  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", function () {
    addToCart(productId);
  });
});

function renderProductDetails(product) {
  const productDetailsDiv = document.getElementById("productDetails");
  productDetailsDiv.innerHTML = ""; // Clear previous content

  // Create and append elements for product details
  const titleHeading = document.createElement("h2");
  titleHeading.textContent = product.product.title;
  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = product.product.description;

  // Append elements to productDetailsDiv
  productDetailsDiv.appendChild(titleHeading);
  productDetailsDiv.appendChild(descriptionPara);

  // Pre-fill form fields with current product details
  document.getElementById("title").value = product.product.title;
  document.getElementById("description").value = product.product.description;
}

function updateProduct(productId, title, description) {
  // Send a request to update the product
  fetch(`http://localhost:3001/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("Product updated:", data);
      // Optionally, you can update the displayed product details after successful update
      renderProductDetails(data.product.product);
    })
    .catch((error) => console.error("Error updating product:", error));
}

function deleteProduct(productId) {
  // Send a request to delete the product
  fetch(`http://localhost:3001/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product deleted successfully");
        // Show alert message
        alert("Product was deleted");
        // Redirect to product list page after deletion
        window.location.href = "../all-products-page/index.html";
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .catch((error) => console.error("Error deleting product:", error));
}

function addToCart(productId) {
  const cartId = "6612e5661d57d0d2b861a410"; // Your cart ID
  fetch(`http://localhost:3001/addProductToCart/${cartId}/${productId}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product added to cart:", data);
      alert("Product added to cart");
    })
    .catch((error) => console.error("Error adding product to cart:", error));
}
