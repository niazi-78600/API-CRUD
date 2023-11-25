$(function() {
    loadRecipies();
    $("#recipes").on("click", ".btn-danger", handleDelete);
    $("#recipes").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(function() {
      var id = $("#updateId").val();
      var title = $("#updateTitle").val();
      var body = $("#updateBody").val();
      $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
        data: { title: title, body: body },

        method: "PUT",
        success: function(response) {
          console.log(response);
          loadRecipies();
          $("#updateModal").modal("hide");
        }
      });
    });
  });
  function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-fake-api.herokuapp.com/api/recipes/" + id, function(
      response
    ) {
      $("#updateId").val(response._id);
      $("#updateTitle").val(response.title);
      $("#updateBody").val(response.body);
      $("#updateModal").modal("show");
    });
  }
  function addRecipe() {
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes/",
      method: "POST",
      data: { title: title, body: body },

      success: function(response) {
        console.log(response);
        $("#title").val("");
        $("#body").val("");
        loadRecipies();
        $("#addModal").modal("hide");
      }
    });
  }
  function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
      method: "DELETE",
      success: function() {
        loadRecipies();
      }
    });
  }
  function loadRecipies() {
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes",
      method: "GET",
      error: function(response) {
        var recipes = $("#recipes");
        recipes.html("An Error has occured");
      },
      success: function(response) {
        console.log(response);
        var recipes = $("#recipes");
        recipes.empty();
        for (var i = 0; i < response.length; i++) {
          var rec = response[i];
          var recipeElement = $(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p>${rec.body}</p></div>`);
          var editButton = $(`<button class="btn btn-warning btn-sm">Edit</button>`);
          var deleteButton = $(`<button class="btn btn-danger btn-sm">Delete</button>`);
          
          var buttonContainer = $("<div class='button-container'></div>");
          buttonContainer.append(editButton, deleteButton);
          recipeElement.append(buttonContainer);
          recipes.append(recipeElement);
        }
      }
    });
  }