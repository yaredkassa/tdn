import fs from "fs";
import express from "express";
import moment from "moment";
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";
import { create } from "express-handlebars";

const app = express();
app.use(methodOverride("_method"));

const port = 3000;
const hbs = create({
  /* config */
  helpers: {
    importance(value) {
      let icon = "";
      for (let index = 0; index <= value; index++) {
        if (index > 0) {
          icon = icon + "♥";
        }
      }
      return icon;
    },
    relativeTime(value) {
      let date_info = moment(value, "YYYY-MM-DD").fromNow();
      if (date_info == "Invalid date") {
        return 'someday';
      }else{
        return date_info;
      }
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "source/public/view");

app.use(express.static("source/public"));

const getTasks = (task_flag) => {
  const jsonData = fs.readFileSync("source/public/model/todo.json");
  let tasks = JSON.parse(jsonData);

  if (task_flag == "*") {
    return tasks;
  } else if (task_flag == "completed") {
    let task = tasks.filter((e) => e.completed == 'true');
    return task;
  } else {
    let task = tasks.filter((e) => e.id == task_flag);
    return task;
  }
};

function updateObject(update) {
  for (var i = 0; i < update.jsonRS.length; i++) {
    if (
      update.jsonRS[i][update.lookupField] === update.lookupKey ||
      update.lookupKey === "*"
    ) {
      update.jsonRS[i][update.targetField] = update.targetData;
      if (!update.checkAllRows) {
        return;
      }
    }
  }
}

/**
 * Routes
 *
 */
app.get("/", (req, res) => {
  var completed = req.query.completed;
  if (completed) {
    res.render("home", {
      layout: false,
      tasks: getTasks("completed"),
    });
  } else {
    res.render("home", {
      layout: false,
      tasks: getTasks("*"),
    });
  }
});

app.get("/form", (req, res) => {
  res.render("form", {
    layout: false,
    task: [
      {
        edit: false,
      },
    ],
  });
});

app.get("/edit/:id", function (req, res) {
  let task_detail = JSON.parse(JSON.stringify(getTasks(req.params.id)));
  task_detail[0].edit = true;

  res.render("form", {
    layout: false,
    edit: true,
    task: task_detail,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    let tasks = JSON.parse(data);
    let new_task = JSON.parse(JSON.stringify(req.body));

    new_task.id = uuidv4();

    var today = new Date();
    new_task.creation_date = today.toLocaleDateString("en-US");

    tasks.push(new_task);

    let tasks_str = JSON.stringify(tasks);
    fs.writeFileSync("source/public/model/todo.json", tasks_str);

    if (req.query.overview) {
      res.render("home", {
        layout: false,
        tasks: getTasks(new_task.id),
      });
    } else {
      let detail = [
        {
          edit: true,
          due_date: new_task.due_date,
          important: new_task.important,
          completed: Boolean(new_task.completed),
          title: new_task.title,
          description: new_task.description,
          id: new_task.id,
        },
      ];

      res.render("form", {
        layout: false,
        task: detail,
      });
    }
  });
});

app.put("/:id", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    let tasks = JSON.parse(data);
    let id = req.params.id;

    let update_task = JSON.parse(JSON.stringify(req.body));
    let keys = ["due_date", "important", "completed", "title", "description"];

    keys.forEach((key) => {
      let update = {
        jsonRS: tasks,
        lookupField: "id",
        lookupKey: id,
        targetField: key,
        targetData: update_task[key],
        checkAllRows: false,
      };
      updateObject(update);
    });

    let tasks_str = JSON.stringify(tasks);

    fs.writeFileSync("source/public/model/todo.json", tasks_str);

    if (req.query.overview) {
      res.render("home", {
        layout: false,
        tasks: getTasks(id),
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at http://localhost:${port}`);
});
