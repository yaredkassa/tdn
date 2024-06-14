import fs from "fs";
import express from "express";
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
      let icon = '';
      for (let index = 0; index <= value; index++) {
        if (index>0) {
          icon = icon + "♥";
        }         
      }
      return icon;
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
  
  if(task_flag=='*'){
    return tasks;
  }else{
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
 *  UI routes
 *
 */
app.get("/", (req, res) => {
  res.render("home", {
    layout: false,
    tasks: getTasks('*'),
  });
});

app.get("/show/:id", (req, res) => {
  res.render("home", {
    layout: false,
    tasks: getTasks(req.params.id),
  });
});

app.get("/form", (req, res) => {
  let detail = [{
  edit : false,
  }];

  res.render("form", {
    layout: false,
    task: detail,
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


/**
 *  api routes
 *
 */

app.get("/api/", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    res.end(data);
  });
});

app.get("/api/:id", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    var tasks = JSON.parse(data);
    let op = tasks.filter((e) => e.id == req.params.id);
    res.end(JSON.stringify(op));
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    let tasks = JSON.parse(data);
    let new_task = JSON.parse(JSON.stringify(req.body));
    
    new_task.id = uuidv4();
    tasks.push(new_task);
    
    fs.writeFile(
      "source/public/model/todo.json",
      JSON.stringify(tasks),
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        if (err) console.log(err);
      }
    );
      
    let detail = [
      {
        edit: true,
        duedate: new_task.duedate,
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

  });

});



app.put("/api/:id", function (req, res) {
  // var jsonObj = [
  //   { Id: "1", Username: "Ray", FatherName: "Thompson" },
  //   { Id: "2", Username: "Steve", FatherName: "Johnson" },
  //   { Id: "3", Username: "Albert", FatherName: "Einstein" },
  // ];

  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    let tasks = JSON.parse(data);
    let id = req.params.id;

    let update = {
      jsonRS: jsonObj,
      lookupField: "id",
      lookupKey: id,
      targetField: "Username",
      targetData: "Thomas",
      checkAllRows: false,
    };

    updateObject(update);

    res.end(JSON.stringify(users));
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at http://localhost:${port}`);
});
