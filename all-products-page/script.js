// Fetch data from the backend and render it on the page
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    console.log(data); // Log the data received from the server
    renderProducts(data.resultProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render products on the page
function renderProducts(products) {
  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const productCardDiv = document.createElement("div");
    productCardDiv.classList.add("product-card");

    const titleHeading = document.createElement("h3");
    titleHeading.textContent = product.title || "No Title"; // Display 'No Title' if title is missing

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = product.description || "No Description"; // Display 'No Description' if description is missing

    productCardDiv.appendChild(titleHeading);
    productCardDiv.appendChild(descriptionPara);

    productListDiv.appendChild(productCardDiv);
  });
}

// Fetch and render products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);
