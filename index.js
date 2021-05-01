const server = require("./api/server");
const cors = require("cors");

const port = process.env.PORT || 5000;

// START YOUR SERVER HERE
server.use(cors());

server.listen(port, () => {
  console.log("Server started at localhost:5000");
});
