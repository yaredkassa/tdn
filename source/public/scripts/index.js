/**
 * Sorting and Filtering Methods
 */

function setSortingSetting(sortingSetting) {
  localStorage.setItem("sortBy", sortingSetting);
}

function setOrderSetting(order) {
  localStorage.setItem("order", order);
}

function setFilterSetting(filter) {
  localStorage.setItem("filter", filter);
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

function updateTasks(finalTaskList) {
  let parent_body = document.getElementById("todo-lists");
  let new_dom = "";
  finalTaskList.forEach((attribute) => {
    let current_item = document.getElementById(attribute.id);
    if (current_item) {
      new_dom = new_dom + current_item.outerHTML;
    }
  });
  parent_body.innerHTML = new_dom;
}

function resetSortView() {
  [
    "sort_by_name",
    "sort_by_due_date",
    "sort_by_creation_date",
    "sort_by_importance",
  ].forEach((id_name) => {
    document.getElementById(id_name).className = "main_button";
  });
}

function filterCompleted(caller) {
  let event_button = document.getElementById("sort_by_completeness");
  let parent_body = document.getElementById("todo-lists");
  let parent = parent_body.children;
  let attributeArray = Array.from(parent).map((x) => {
    x.dataset.id = x.id;
    return x.dataset;
  });

  let order = "completed";

  if (caller == "reload_event") {
    if (localStorage.getItem("filter") == "up") {
      order = "completed";
      event_button.dataset.state = "all";
    } else if (localStorage.getItem("filter") == "all") {
      order = "all";
      event_button.dataset.state = "down";
    } else {
      order = "incomplete";
      event_button.dataset.state = "up";
    }
  } else {
    if (event_button.dataset.state == "up") {
      order = "completed";
      setFilterSetting("up");
      event_button.dataset.state = "all";
    } else if (event_button.dataset.state == "all") {
      order = "all";
      setFilterSetting("all");
      event_button.dataset.state = "down";
    } else {
      order = "incomplete";
      setFilterSetting("down");
      event_button.dataset.state = "up";
    }
  }

  Array.from(attributeArray).filter((e) => {
    let item = document.getElementById(e.id);
    if (order == "incomplete") {
      if (e.completed == "true") {
        item.className = "hidden";
      } else {
        item.className = "row_container";
      }
      event_button.textContent = "show complete";
    } else if (order == "completed") {
      if (e.completed == "true") {
        item.className = "row_container";
      } else {
        item.className = "hidden";
      }
      event_button.textContent = "show all";
    } else {
      item.className = "row_container";
      event_button.textContent = "filter incomplete";
    }
  });
}

function sortByName(caller) {
  let event_button = document.getElementById("sort_by_name");

  setSortingSetting("name");

  resetSortView();

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

  updateTasks(attributeArray);
}

function sortByDueDate(caller) {
  let event_button = document.getElementById("sort_by_due_date");

  setSortingSetting("due_date");

  resetSortView();

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

  updateTasks(attributeArray);
}

function sortByCreationDate(caller) {
  let event_button = document.getElementById("sort_by_creation_date");

  setSortingSetting("creation_date");

  resetSortView();

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

  updateTasks(attributeArray);
}

function sortByImportance(caller) {
  let event_button = document.getElementById("sort_by_importance");

  setSortingSetting("importance");

  resetSortView();

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

  updateTasks(attributeArray);
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

    //------------------------------------

    let filterSetting = localStorage.getItem("filter");
    if (filterSetting) {
      filterCompleted("reload_event");
    }

    document.getElementById("sort_by_completeness").onclick = () => {
      filterCompleted("button_event");
    };

    //------------------------------------

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
