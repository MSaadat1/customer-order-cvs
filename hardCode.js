// this is if we don't want to use CSV-parser library

//const fs = require('fs');

//Read the CSV file
// fs.readFile('./orders.csv', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }
//     const parsedData = parseCSV(data);
//     const customerSpending = calculateTotalSpent(parsedData);
//     console.log(customerSpending)
// });
// function calculateTotalSpent(orders) {
//     const spending = {};

//     orders.forEach(order => {
//         const customerId = order.customer_id;
//         const quantity = parseFloat(order.quantity);
//         const pricePerUnit = parseFloat(order.price_per_unit);

//         const totalSpent = quantity * pricePerUnit;

//         // If customer already exists, add to their total spend
//         if (spending[customerId]) {
//             spending[customerId] += totalSpent;
//         } else {
//             spending[customerId] = totalSpent; // First order for this customer
//         }
//     });

//     return spending;
// }

// function parseCSV(csv) {
//     const rows = csv.trim().split('\n');  // Split by rows
//     const headers = rows[0].split(',');   // Get the headers from the first row

//     // Map rows into objects
//     return rows.slice(1).map(row => {
//         const values = row.split(',');
//         let obj = {};
//         headers.forEach((header, index) => {
//             obj[header.trim()] = values[index].trim();
//         });
//         return obj;
//     });
// }