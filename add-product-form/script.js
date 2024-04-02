document
  .getElementById("createProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = {
      title: document.getElementById("title").value,
      id: document.getElementById("id").value,
      description: document.getElementById("description").value,
    };

    // Send POST request to server
    fetch("http://localhost:3000/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log server response
        alert("Product created successfully!"); // Optionally, show an alert
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
        alert("Error creating product. Please try again."); // Optionally, show an alert
      });
  });
