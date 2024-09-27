const fs = require("fs");
const csv = require("csv-parser");

//create array to store the parsed data
let results = [];
// read and parse the csv file
fs.createReadStream("./orders.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    //console.log(results);  // this shows the result
    //calculateRevenue(results); // this shows the revenue after calculating with only years and months
    //lastPurchase(results); // this shows the last six months a customer did the last purchase
  })
  .on("error", (err) => {
    console.error("Error reading the file: ", err);
  });

function calculateRevenue(orders) {
  const total_revenue = {};
  orders.forEach((order) => {
    const date = new Date(order.order_date);
    const yearMonth = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    const pricePerUnit = parseFloat(order.price_per_unit);
    const quantity = parseInt(order.quantity);
    const revenue = pricePerUnit * quantity; //this gives the revenue

    if (!total_revenue[yearMonth]) {
      total_revenue[yearMonth] = 0;
    }
    total_revenue[yearMonth] += revenue;
  });
  console.log(total_revenue);
  return total_revenue;
}

// customers who have not order for the last six months with date of last purchase
function lastPurchase(purchase) {
  const customerWithPurchase = {};
  purchase.forEach((buy) => {
    const customerId = buy.customer_id;
    const date = new Date(buy.order_date);
    for (let i = 0; i < 6; i++) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const fullYear = `${year}-${month}-${day}`;
      if (!customerWithPurchase[customerId]) {
        customerWithPurchase[customerId] = [];
      }
      customerWithPurchase[customerId].push(fullYear);

      date.setMonth(date.getMonth() - 1);
    }
  });
  console.log(customerWithPurchase);
  return customerWithPurchase;
}


