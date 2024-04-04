function renderProductsAsCards(products) {
  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const productCardDiv = document.createElement("div");
    productCardDiv.classList.add("product-card");

    const titleHeading = document.createElement("h3");
    titleHeading.textContent = product.title;

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = product.description;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => {
      // Add logic to add product to cart here
    });

    productCardDiv.appendChild(titleHeading);
    productCardDiv.appendChild(descriptionPara);
    productCardDiv.appendChild(addToCartButton);

    productListDiv.appendChild(productCardDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3001/products")
    .then((response) => response.json())
    .then((data) => renderProductsAsCards(data.resultProducts))
    .catch((error) => console.error("Error fetching products:", error));

  const viewCartButton = document.getElementById("viewCartButton");
  viewCartButton.addEventListener("click", () => {
    // Add logic to handle view cart button click here
  });
});
