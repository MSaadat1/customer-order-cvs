//Part two
const fs = require("fs");
const csv = require("csv-parser");

let results = [];
fs.createReadStream("./orders.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    popularProducts(results);
    mostProducts(results);
  })
  .on("error", (err) => {
    console.error("Error reading the file: ", err);
  });

// first we return each customer id with the quantity of order
// after that we use Max to get max value of quantity
// filter to find the highest quantity
// map to get the customer id and the highest quantity
// this operation is O(n) because we go through each order once

function popularProducts(orders) {
  const customerProduct = {};
  orders.forEach((order) => {
    const customerId = order.customer_id;
    const quantity = parseFloat(order.quantity);
    if (!customerProduct[customerId]) {
      customerProduct[customerId] = 0;
    }
    customerProduct[customerId] += quantity;
  });
  const maxQuantity = Math.max(...Object.values(customerProduct));
  const customerWithMaxQuantity = Object.entries(customerProduct)
    .filter(([customerId, totalQuantity]) => totalQuantity === maxQuantity)
    .map(([customerId, totalQuantity]) => ({
      customerId,
      totalQuantity,
    }));
  console.log(customerWithMaxQuantity);
  return customerWithMaxQuantity;
}

// calculate most popular products

function mostProducts(units) {
  const unitsToSold = {};
  units.forEach((unit) => {
    const productId = unit.product_id;
    const pricePerUnit = parseFloat(unit.price_per_unit);
    if (isNaN(pricePerUnit)) {
      console.error(
        `Invalid price for product ${productId}: ${unit.price_per_unit}`
      );
      return; // Skip this entry if price is not a valid number
    }
    if (!unitsToSold[productId]) {
      unitsToSold[productId] = 0;
    }
    unitsToSold[productId] += pricePerUnit;
  });

  const maxUnits = Math.max(...Object.values(unitsToSold));
  console.log(maxUnits);
  const maxUnitsProduct = Object.entries(unitsToSold)
    .filter(([productId, totalUnits]) => totalUnits === maxUnits)
    .map(([productId, totalUnits]) => ({
      productId,
      totalUnits,
    }));
  console.log(maxUnitsProduct);
  return maxUnitsProduct;
}
