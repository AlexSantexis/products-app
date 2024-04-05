$(document).ready(function () {
  $.ajax({
    url: "/api/users",
    type: "GET",
    dataType: "JSON",
    cache: false,
  })
    .done(function (response) {
      if (response && response.data && response.data.length > 0) {
        console.log("Data received:", response.data);
        createUserBody(response.data);
      } else {
        console.error("Failed fetching users", response && response.message);
        alert(false, "Failed fetching users" + (response && response.message));
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
      alert(false, "Failed fetching users: " + textStatus);
    });
});

$(".row")
  .off("click", "#userSubmit")
  .on("click", "#userSubmit", function () {
    createUser();
    return false;
  });
$("#userReset").on("click", function () {
  $("#frmUser")[0].reset();
});

function createUser() {
  let username = $("#username").val();
  let password = $("#password").val();
  let name = $("#name").val();
  let surname = $("#surname").val();
  let email = $("#email").val();
  let area = $("#area").val();
  let road = $("#road").val();

  const user = {
    username: username,
    password: password,
    name: name,
    surname: surname,
    email: email,
    address: {
      area: area,
      road: road,
    },
  };
  $.ajax({
    url: "/api/users",
    type: "POST",
    data: JSON.stringify(user),
    contentType: "application/json",
    dataType: "JSON",
  }).done(function (response) {
    let status = response.status;
    if (status) {
      console.log(true, "Επιτυχής εισαγωγή χρήστη");
    } else {
      console.log(false, "Πρόβλημα στην εισαγωγή χρήστη");
    }
    window.location.replace("http://localhost:3000/user/find.html");
  });
}

function createUserBody(data) {
  $("#userTable > #UserBody").empty();

  const len = data.length;
  for (let i = 0; i < len; i++) {
    let username = data[i].username;
    let name = data[i].name;
    let surname = data[i].surname;
    let email = data[i].email;
    let address = data[i].address.area + ", " + data[i].address.road;
    let phone = "";
    for (let x = 0; x < data[i].phone.length; x++) {
      phone =
        phone + data[i].phone[x].type + ":" + data[i].phone[x].number + "<br>";
    }

    let tr_str =
      "<tr>" +
      "<td>" +
      username +
      "</td>" +
      "<td>" +
      name +
      "</td>" +
      "<td>" +
      surname +
      "</td>" +
      "<td>" +
      email +
      "</td>" +
      "<td>" +
      address +
      "</td>" +
      "<td>" +
      phone +
      "</td>" +
      "<td>" +
      "<button class='btnUpdate btn btn-primary' value='" +
      username +
      "'>Τροποποίηση</button> " +
      "<button class='btnDelete btn btn-primary' id='userDelete' value='" +
      username +
      "'>Διαγραφή</button>" +
      "</td>" +
      "</tr>";

    $("#userTable #userBody").append(tr_str);
  }
  $("#userTable").on("click", "#userDelete", function () {
    let userName = $(this).val();
    deleteUser(userName);
    window.location.reload();
  });
}

function deleteUser(userName) {
  $.ajax({
    url: `/api/users/${userName}`,
    type: "DELETE",
    data: { username: userName },
    dataType: "json",
  })
    .done(function (response) {
      if (response.status) {
        console.log("User deleted successfully", userName);
      } else {
        console.error("Failed to delete user:", respnse.message);
        alert("Failed to delete user" + response.message);
      }
    })
    .fail(function (textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
      alert("Failed to delete user: " + textStatus);
    });
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
