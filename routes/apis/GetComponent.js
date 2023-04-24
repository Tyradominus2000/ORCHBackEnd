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

router.get("/:component", (req, res) => {
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
      connection.query(sqlDefault, (err, result) => {
        if (err) throw err;
        let valid = [{}];
        let i = 0;
        let resultDefault = [];
        result.map((r) => {
          if (r.ComponentName.startsWith(component)) {
            valid[i] = { id: r.idComponent, type: r.ComponentType };
            i++;
          }
        });
        console.log(valid);
        let sqlSwitch;
        valid.map((v) => {
          switch (v.type) {
            case "CPU":
              sqlSwitch = `SELECT * from component_cpu WHERE idComponent="${v.id}"`;
              break;
            case "MB":
              sqlSwitch = `SELECT * from component_motherboard WHERE idComponent="${v.id}"`;
              break;
            case "GPU":
              sqlSwitch = `SELECT * from component_gpu WHERE idComponent="${v.id}"`;
              break;
            default:
          }
          connection.query(sqlSwitch, (err, result) => {
            if (err) throw err;
            resultDefault[i] = result;
          });
        });
        console.log(result);
      });
  }
  if (sql) {
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Liste " + component + " récupéré");
      console.log("Result" + result);
      res.send(JSON.stringify(result));
    });
  }
});

module.exports = router;
