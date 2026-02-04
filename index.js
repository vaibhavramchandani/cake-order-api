const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/orders", (req, res) => {
  const {
    numberOfCakes,
    specialRequestsEnabled,
    extraFrosting,
    extraSprinkles,
    cakeType,
    name,
    streetAdress,
    city,
    zipcode
  } = req.body;

  // Basic validation
  if (
    !name ||
    !streetAdress ||
    !city ||
    !zipcode ||
    typeof numberOfCakes !== "number"
  ) {
    return res.status(400).json({
      error: "Invalid order data or missing address"
    });
  }

  // Calculate cost
  let cost = numberOfCakes * 2;

  if (specialRequestsEnabled) {
    if (extraFrosting) {
      cost += numberOfCakes;
    }
    if (extraSprinkles) {
      cost += numberOfCakes * 0.5;
    }
  }

  const order = {
    numberOfCakes,
    cakeType,
    specialRequestsEnabled,
    extraFrosting,
    extraSprinkles,
    address: {
      name,
      streetAdress,
      city,
      zipcode
    },
    cost
  };

  return res.status(201).json({
    order
  });
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on the port ${PORT}`)
})

