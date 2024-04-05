$(document).ready(function () {
  $.ajax({
    url: "/api/products",
    type: "GET",
    dataType: "JSON",
    cache: false,
  })
    .done(function (response) {
      if (response && response.data && response.data.length > 0) {
        console.log("Data received:", response.data);
        createProductBody(response.data);
      } else {
        console.error("Failed fetching products", response && response.message);
        alert(
          false,
          "Failed fetching products" + (response && response.message)
        );
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
      alert(false, "Failed fetching products: " + textStatus);
    });

  $(".row")
    .off("click", "#submitBtn")
    .on("click", "#submitBtn", function () {
      createProduct();
      return false;
    });
  $("#resetBtn").on("click", function () {
    $("#frmProduct")[0].reset();
  });

  $("#editBtn").on("click", function () {
    editProduct();
    return false;
  });
});

function createProduct() {
  let product = $("#product").val();
  let cost = parseInt($("#cost").val());
  let description = $("#Pdescription").val();
  let quantity = parseInt($("#quantity").val());
  const productItem = {
    product: product,
    cost: cost,
    description: description,
    quantity: quantity,
  };
  $.ajax({
    url: "/api/products",
    type: "POST",
    data: JSON.stringify(productItem),
    contentType: "application/json",
    dataType: "JSON",
  }).done(function (response) {
    let status = response.status;
    if (status) {
      console.log(true, "Επιτυχής εισαγωγή προϊόντως");
    } else {
      console.log(false, "Πρόβλημα στην εισαγωγή προϊόντος");
    }
    window.location.replace("http://localhost:3000/product/product-find.html");
  });
}

function createProductBody(data) {
  $("#productTable > #productBody").empty();

  const len = data.length;
  for (let i = 0; i < len; i++) {
    let product = data[i].product;
    let cost = data[i].cost;
    let description = data[i].description;
    let quantity = data[i].quantity;
    let tr_str =
      "<tr>" +
      "<td>" +
      product +
      "</td>" +
      "<td>" +
      cost +
      "</td>" +
      "<td>" +
      description +
      "</td>" +
      "<td>" +
      quantity +
      "</td>" +
      "<td>" +
      "<button class='btnUpdate btn btn-primary'  value='" +
      product +
      "'>Τροποποίηση</button> " +
      "<button class='btnDelete btn btn-primary' id='productDelete' value='" +
      product +
      "'>Διαγραφή</button>" +
      "</td>" +
      "</tr>";

    $("#productTable #productBody").append(tr_str);
  }
  $("#productTable").on("click", "#productDelete", function () {
    let productName = $(this).val();
    deleteProduct(productName);
    window.location.reload();
  });
}

function deleteProduct(productName) {
  $.ajax({
    url: `/api/products/${productName}`,
    type: "DELETE",
    data: { product: productName },
    dataType: "json",
  })
    .done(function (response) {
      if (response.status) {
        console.log("Product delete successfully", productName);
      } else {
        console.error("Failed to delete product:", response.message);
        alert("Failed to delete product:" + response.message);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // Handle failure response
      console.error("AJAX request failed:", textStatus, errorThrown);
      alert("Failed to delete product: " + textStatus);
    });
}

function editProduct(product){
  productId = 
}

function alert(status, message) {
  if (status) {
    $(".alert").addClass("alert-success");
    $(".alert").removeClass("alert-danger");
  } else {
    $(".alert").addClass("alert-danger");
    $(".alert").removeClass("alert-success");
  }
  $(".alert").html(message);
}
