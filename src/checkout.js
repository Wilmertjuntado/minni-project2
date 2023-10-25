document.addEventListener("DOMContentLoaded", function () {
  // Function to get URL parameter by name
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Get cart data and total amount from URL
  var cartData = getParameterByName("cartData");
  var totalAmount = getParameterByName("totalAmount");

  // Convert cart data back to an array
  var cartItems = JSON.parse(decodeURIComponent(cartData));

  // Display the cart items and total amount on the page
  var cartContainer = document.querySelector(".col-25 .container");
  cartContainer.innerHTML = "";
  var totalPrice = 0;

  cartItems.forEach(function (item) {
    var product = shopItemsData.find(function (product) {
      return product.id === item.id;
    });

    if (product) {
      cartContainer.innerHTML += `
                <p><a href="#">${product.name}</a> <span class="price">$${product.price}</span></p>
            `;
      totalPrice += product.price * item.item;
    }
  });

  cartContainer.innerHTML += `
        <hr>
        <p>Total <span class="price" style="color:black"><b>$${totalAmount}</b></span></p>
    `;
});
