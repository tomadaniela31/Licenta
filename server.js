const express = require("express");
const app = express();
const dbSetup = require("./db_setup");
const mysql = require("mysql");
const path = require('path');

const applicationRouter = require('./routes/application.js');
const parentRoutes = require('./routes/parent.js');
const childrenRoutes = require('./routes/children');
const gameRoutes = require('./routes/game');
const resultRoutes = require('./routes/result');
const therapistRoutes = require('./routes/therapist');
const classroomRoutes = require('./routes/classroom');

const User = require("./models/user");
const Role = require("./models/role");
const Parent = require("./models/parent");
const Child = require("./models/child");
const Result = require("./models/result");
const Therapist = require("./models/therapist");
const Classroom = require("./models/classroom");

app.set('view engine', 'ejs')

app.use(express.json({}));

app.use(express.static(__dirname + '/public'));

// Boostrap

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// Create DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  // Uncomment below after the db is fully created
  database: "licentaDB"
});

// Connect DB
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("My database connected");
});


dbSetup(db, app);

app.listen("3000", () => {
  console.log("Server started on port 3000");
});

app.use(applicationRouter);
app.use(parentRoutes);
app.use(childrenRoutes);
app.use(gameRoutes);
app.use(resultRoutes);
app.use(therapistRoutes);
app.use(classroomRoutes);

// Define associations
User.belongsTo(Role, { foreignKey: 'id_role' });

Role.hasMany(User, { foreignKey: 'id_role' });

Parent.hasMany(Child, { foreignKey: 'id_parent' });

Child.belongsTo(Parent, { foreignKey: 'id_parent' });
Child.belongsTo(User, { foreignKey: 'id_user' });
Child.hasMany(Result, { foreignKey: 'id_child' });

Therapist.hasMany(Classroom, { foreignKey: 'id_therapist' });

Classroom.hasMany(Child, { foreignKey: 'id_class'} );
