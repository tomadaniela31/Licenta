function setup(db, app) {
  // Create db
  app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE licentaDB";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Database created!");
    });
  });

  // Create User table
  app.get("/createUsertable", (req, res) => {
    let sql = `CREATE TABLE user(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_role INT,
        email VARCHAR(200),
        lastName VARCHAR(255),
        firstName VARCHAR(255),
        password VARCHAR(200),
        FOREIGN KEY (id_role) REFERENCES role (id)
      )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("User table created");
    });
  });

  // Create Role table
  app.get("/createRoletable", (req, res) => {
    let sql = `CREATE TABLE role(
        id INT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(10)
      )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Role table created");
    });
  });

  //create Therapist table
  app.get("/createTherapisttable", (req, res) => {
    let sql = `CREATE TABLE therapist(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_user INT NOT NULL,
        FOREIGN KEY (id_user) REFERENCES user (id)
      )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Therapist table created");
    });
  });

  //create Classroom table
  app.get("/createClassroomtable", (req, res) => {
    let sql = `CREATE TABLE classroom(id INT AUTO_INCREMENT PRIMARY KEY, id_therapist INT NOT NULL, name VARCHAR(255),FOREIGN KEY (id_therapist) REFERENCES therapist (id))`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Classroom table created");
    });
  });

  //create Child table
  app.get("/createChildtable", (req, res) => {
    let sql = `
    CREATE TABLE child(
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_user INT NOT NULL,
      id_class INT,
      id_parent INT,
      FOREIGN KEY (id_user) REFERENCES user (id),
      FOREIGN KEY (id_class) REFERENCES classroom (id),
      FOREIGN KEY (id_parent) REFERENCES parent (id)
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Child table created");
    });
  });

  //create gameTable
  app.get("/createGametable", (req, res) => {
    let sql =
      "CREATE TABLE game(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Game table created");
    });
  });

  //create resultTable
  app.get("/createResulttable", (req, res) => {
    let sql = `CREATE TABLE result(id INT AUTO_INCREMENT PRIMARY KEY, id_game INT ,id_child INT, scor INT,date DATETIME,FOREIGN KEY (id_game) REFERENCES game (id), FOREIGN KEY (id_child) REFERENCES child (id))`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Result table created");
    });
  });

  //create parentTable
  app.get("/createParenttable", (req, res) => {
    let sql = `CREATE TABLE parent(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_user INT,
        telefon VARCHAR(255),
        FOREIGN KEY (id_user) REFERENCES user (id)
      )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Parent table created");
    });
  });
}

module.exports = setup;
