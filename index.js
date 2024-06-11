import fs from "fs";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { engine } from "express-handlebars";

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "source/public/view");

// app.use(express.static(__dirname + "/source/public"));
app.use(express.static("source/public"));

const getTasks = () => {
  const jsonData = fs.readFileSync("source/public/model/todo.json");
  return JSON.parse(jsonData);
};

/**
 *  UI routes
 *
 */
app.get("/", (req, res) => {
  res.render("home", {
    layout: false,
    tasks: getTasks(),
  });
  // res.render("home");
});

app.get("/form", (req, res) => {
  res.render("form", {
    layout: false,
    tasks: '',
  });
  // res.render("form");
});

app.get("/edit/:id", function (req, res) {
  res.render("form", {
    layout: false,
    task: req.params.id,
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

    if (req.body.state == null) {
      new_task.state = "closed";
    }
    
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
        else console.log('success');
      }
    );
    // res.sendStatus(200);

    res.render("form", {
      layout: false,
      tasks: 'old',
      id: new_task.id,
    });


  });

});


app.delete("/api/:id", function (req, res) {
  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    var id = "user" + req.params.id;
    var user = data[id];
    delete data["user" + req.params.id];
    res.end(JSON.stringify(data));
  });
});

app.put("/api/:id", function (req, res) {

  // function setVal(update) {

  //   for (var i = 0; i < update.jsonRS.length; i++) {
  //     if (
  //       update.jsonRS[i][update.lookupField] === update.lookupKey ||
  //       update.lookupKey === "*"
  //     ) {
  //       update.jsonRS[i][update.targetField] = update.targetData;
  //       if (!update.checkAllRows) {
  //         return;
  //       }
  //     }
  //   }
  // }

  // var jsonObj = [
  //   { Id: "1", Username: "Ray", FatherName: "Thompson" },
  //   { Id: "2", Username: "Steve", FatherName: "Johnson" },
  //   { Id: "3", Username: "Albert", FatherName: "Einstein" },
  // ];
  //          var update = {
  //            jsonRS: jsonObj,
  //            lookupField: "Id",
  //            lookupKey: 2,
  //            targetField: "Username",
  //            targetData: "Thomas",
  //            checkAllRows: false,
  //          };

  //          setVal(update);

  fs.readFile("source/public/model/todo.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var id = "user" + req.params.id;

    users[id] = req.body;
    res.end(JSON.stringify(users));
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at http://localhost:${port}`);
});
