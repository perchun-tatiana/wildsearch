const express = require("express");
const cors = require("cors");
const app = express();
const request = require("async-request");
const { urlencoded } = require("express");

app.use(cors());

app.use("/search", async function (req, res) {
  console.log("11111111111111111111111111111111111111111111111111");
  const searchworld = req.query.searchworld;
  console.log("searchworld", searchworld);
  let url = `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=2,7,3,6,19,21,8&curr=rub&dest=-1059500,-85606,-964255,-2228364&emp=0&lang=ru&locale=ru&pricemarginCoeff=1.0&query=${searchworld}&reg=0&regions=80,64,83,4,38,33,70,68,69,86,30,40,48,1,66,31,22&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`;
  console.log("url", urlencoded);
  try {
    const response = await request(encodeURI(url));
    const body = JSON.parse(response.body);
    if (body.data && body.data.products) {
      let result = [];
      for (let i = 0; i < body.data.products.length; i++) {
        const product = body.data.products[i];
        if (product.brand) {
          result.push(product.brand);
        }
      }
      console.log("result", result);
      res.send({
        result: result,
      });
    } else {
      res.status(400).send({
        message: "Error",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error",
    });
  }
});
app.use("/", async function (req, res) {
  console.log("works");
});

app.listen(3000, () =>
  console.log("API is running on http://localhost:" + 3000)
);
