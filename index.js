// first we need to install csv-parser library which is easy to use
// converts code into json with out applying it by writing more code
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
    console.log(results);
    totalExpanseOfCustomer(results);
    fiveCustomersSpendMore(results);
  })
  .on("error", (err) => {
    console.error("Error reading the file: ", err);
  });

//console.log(results) is showing the whole data in format of object
//totalExpanseOfCustomer(results) is showing customer id with the total spend
//fiveExpanseOfCustomer(results) is showing the five customer id and spends who spend more

// total expanse of each customer
function totalExpanseOfCustomer(orders) {
  const customerSpending = {};
  orders.forEach((order) => {
    const customerId = order.customer_id;
    const totalForOrder =
      parseFloat(order.quantity) * parseFloat(order.price_per_unit);
    if (!customerSpending[customerId]) {
      customerSpending[customerId] = 0; // Initialize to 0 if customer doesn't exist yet
    }

    customerSpending[customerId] += totalForOrder; // Add the total for the current order
  });

  console.log(customerSpending);
  return customerSpending;
}

// five customers who spent more
function fiveCustomersSpendMore(spends) {
  const customerSpendingMore = {};
  spends.forEach((spend) => {
    const customerId = spend.customer_id;
    const totalSpentOfFive =
      parseFloat(spend.quantity) * parseFloat(spend.price_per_unit);
    if (!customerSpendingMore[customerId]) {
      customerSpendingMore[customerId] = 0;
    }
    customerSpendingMore[customerId] += totalSpentOfFive;
  });

  const topFiveCustomers = Object.entries(customerSpendingMore)
    .map(([customerId, spending]) => ({ customerId, spending }))
    .sort((a, b) => b.spending - a.spending)
    .slice(0, 5);
  console.log("Top five customers based on spending:", topFiveCustomers);
  return topFiveCustomers;
}
