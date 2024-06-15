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

// const tableBody = document.getElementById("toDoContainer");
// const tableRows = [...tableBody.children];

document.body.onclick = (ev) => {
  let col = ev.target.dataset?.col;
  let state = ev.target.dataset?.state;
  if (col) {
    if (state == "up") {
      tableRows.sort(
        (a, b) => a.children[col].textContent - b.children[col].textContent
      );
      ev.target.dataset.state = "down";
    } else {
      tableRows.sort(
        (a, b) => b.children[col].textContent - a.children[col].textContent
      );
      ev.target.dataset.state = "up";
    }
    tableRows.forEach((tr) => tableBody.append(tr));
  }
};
