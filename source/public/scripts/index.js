/**
 * Sorting and Filtering Methods
 */

function setSortingSetting(sortingSetting) {
  localStorage.setItem("sortBy", sortingSetting);
}
function setOrderSetting(order) {
  localStorage.setItem("order", order);
}

function configureSortOrder(event_button, caller) {
  let order = "asc";

  if (caller == "reload_event") {
    if (localStorage.getItem("order") == "up") {
      order = "asc";
      event_button.dataset.state = "down";
      event_button.className = "main_button with-up-arrow";
    } else {
      order = "desc";
      event_button.dataset.state = "up";
      event_button.className = "main_button with-down-arrow";
    }
  } else {
    if (event_button.dataset.state == "up") {
      order = "asc";
      setOrderSetting("up");
      event_button.dataset.state = "down";
      event_button.className = "main_button with-up-arrow";
    } else {
      order = "desc";
      setOrderSetting("down");
      event_button.dataset.state = "up";
      event_button.className = "main_button with-down-arrow";
    }
  }

  return order;
}

function sortByName(caller) {
  let event_button = document.getElementById("sort_by_name");

  setSortingSetting("name");
  [
    "sort_by_name",
    "sort_by_due_date",
    "sort_by_creation_date",
    "sort_by_importance",
  ].forEach((id_name) => {
    document.getElementById(id_name).className = "main_button";
  });

  let parent_body = document.getElementById("todo-lists");
  let parent = parent_body.children;
  let attributeArray = Array.from(parent).map((x) => {
    x.dataset.id = x.id;
    return x.dataset;
  });

  let order = configureSortOrder(event_button, caller);

  attributeArray.sort((a, b) => {
    let item1 = "";
    let item2 = "";

    if (order == "asc") {
      item1 = a.title.toUpperCase();
      item2 = b.title.toUpperCase();
    } else {
      item1 = b.title.toUpperCase();
      item2 = a.title.toUpperCase();
    }

    if (item1 < item2) {
      return -1;
    }
    if (item1 > item2) {
      return 1;
    }

    return 0;
  });

  let new_dom = "";
  attributeArray.forEach((attribute) => {
    let current_item = document.getElementById(attribute.id);
    if (current_item) {
      new_dom = new_dom + current_item.outerHTML;
    }
  });
  parent_body.innerHTML = new_dom;
}

function sortByDueDate(caller) {
  let event_button = document.getElementById("sort_by_due_date");

  setSortingSetting("due_date");

  [
    "sort_by_name",
    "sort_by_due_date",
    "sort_by_creation_date",
    "sort_by_importance",
  ].forEach((id_name) => {
    document.getElementById(id_name).className = "main_button";
  });

  let parent_body = document.getElementById("todo-lists");
  let parent = parent_body.children;
  let attributeArray = Array.from(parent).map((x) => {
    x.dataset.id = x.id;
    return x.dataset;
  });

  let order = configureSortOrder(event_button, caller);

  attributeArray.sort((a, b) => {
    let item1, item2;
    if (order == "asc") {
      item1 = new Date(a.due_date);
      item2 = new Date(b.due_date);
    } else {
      item1 = new Date(b.due_date);
      item2 = new Date(a.due_date);
    }
    return item1 - item2;
  });

  let new_dom = "";
  attributeArray.forEach((attribute) => {
    let current_item = document.getElementById(attribute.id);
    if (current_item) {
      new_dom = new_dom + current_item.outerHTML;
    }
  });
  parent_body.innerHTML = new_dom;
}

function sortByCreationDate(caller) {
  let event_button = document.getElementById("sort_by_creation_date");

  setSortingSetting("creation_date");

  [
    "sort_by_name",
    "sort_by_due_date",
    "sort_by_creation_date",
    "sort_by_importance",
  ].forEach((id_name) => {
    document.getElementById(id_name).className = "main_button";
  });
  let parent_body = document.getElementById("todo-lists");
  let parent = parent_body.children;
  let attributeArray = Array.from(parent).map((x) => {
    x.dataset.id = x.id;
    return x.dataset;
  });

  let order = configureSortOrder(event_button, caller);


  attributeArray.sort((a, b) => {
    let item1, item2;
    if (order == "asc") {
      item1 = new Date(a.creation_date);
      item2 = new Date(b.creation_date);
    } else {
      item1 = new Date(b.creation_date);
      item2 = new Date(a.creation_date);
    }
    return item1 - item2;
  });
  let new_dom = "";
  attributeArray.forEach((attribute) => {
    let current_item = document.getElementById(attribute.id);
    if (current_item) {
      new_dom = new_dom + current_item.outerHTML;
    }
  });
  parent_body.innerHTML = new_dom;
}

function sortByImportance(caller) {
  let event_button = document.getElementById("sort_by_importance");

  setSortingSetting("importance");

  [
    "sort_by_name",
    "sort_by_due_date",
    "sort_by_creation_date",
    "sort_by_importance",
  ].forEach((id_name) => {
    document.getElementById(id_name).className = "main_button";
  });

  let parent_body = document.getElementById("todo-lists");
  let parent = parent_body.children;
  let attributeArray = Array.from(parent).map((x) => {
    x.dataset.id = x.id;
    return x.dataset;
  });

  let order = configureSortOrder(event_button, caller);

  attributeArray.sort((a, b) => {
    let item_1, item_2;
    if (order == "asc") {
      item_1 = a.important;
      item_2 = b.important;
    } else {
      item_1 = b.important;
      item_2 = a.important;
    }
    return item_1 - item_2;
  });

  let new_dom = "";
  attributeArray.forEach((attribute) => {
    let current_item = document.getElementById(attribute.id);
    if (current_item) {
      new_dom = new_dom + current_item.outerHTML;
    }
  });
  parent_body.innerHTML = new_dom;
}

function sorting_init() {
  if (document.getElementById("sort_by_name")) {
    let sortingSetting = localStorage.getItem("sortBy");
    if (sortingSetting) {
      if (sortingSetting == "name") {
        sortByName("reload_event");
      } else if (sortingSetting == "due_date") {
        sortByDueDate("reload_event");
      } else if (sortingSetting == "creation_date") {
        sortByCreationDate("reload_event");
      } else if (sortingSetting == "importance") {
        sortByImportance("reload_event");
      }
    }

    document.getElementById("sort_by_name").onclick = () => {
      sortByName("button_event");
    };
    document.getElementById("sort_by_due_date").onclick = () => {
      sortByDueDate("button_event");
    };
    document.getElementById("sort_by_creation_date").onclick = () => {
      sortByCreationDate("button_event");
    };
    document.getElementById("sort_by_importance").onclick = () => {
      sortByImportance("button_event");
    };
  }
}
sorting_init();

/**
 * ---------------- Theme ------------------
 */

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);

  let app_body = document.body;
  app_body.className = themeName + "_theme";

  let text_inputs = document.querySelectorAll("[class^=input_text_]");
  let selected_class_name = "input_text_" + themeName;

  for (var i = 0; i < text_inputs.length; i++) {
    text_inputs[i].className = selected_class_name;
  }
}

function theme_init() {
  if (localStorage.getItem("theme")) {
    setTheme(localStorage.getItem("theme"));
  } else {
    setTheme("light");
  }

  let theme_button = document.getElementById("toggle_theme");
  if (theme_button) {
    theme_button.onclick = (e) => {
      let app_body = document.body;
      let app_body_class = app_body.className;

      if (app_body_class == "dark_theme") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };
  }
}

theme_init();
