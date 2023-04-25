const router = require("express").Router();
const connection = require("../../context/apiConnexion");

console.log("GetComponent");

router.get("/", (req, res) => {
  sql = "SELECT * from component";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(JSON.stringify(result));
  });
});

router.get("/:component", async (req, res) => {
  const component = req.params.component;
  let sql = "";
  switch (component) {
    case "CPU":
      sql = "SELECT * FROM component_cpu";
      break;

    case "GPU":
      sql = "SELECT * FROM component_gpu";
      break;
    case "MB":
      sql = "SELECT * FROM component_motherboard";
      break;
    default:
      let sqlDefault = `SELECT * FROM component`;
      connection.query(sqlDefault, async (err, result) => {
        if (err) throw err;
        let valid = [];
        let i = 0;
        result.map((r) => {
          if (r.ComponentName.toUpperCase().startsWith(component.toUpperCase())) {
            valid[i] = r.idComponent;
            i++
          }
        });
        const sqlSwitch = `SELECT * FROM component_cpu WHERE idComponent IN (${valid})`;
        connection.query(sqlSwitch, async (err, result) => {
          if (err) throw err;
          console.log("Liste récupéré");
          res.send(JSON.stringify(result));
        });
      });
  }
  if (sql) {
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Liste " + component + " récupéré");
      res.send(JSON.stringify(result));
    });
  }
});

module.exports = router;
