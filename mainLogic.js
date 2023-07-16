// Get the current date
let currentDate = new Date();

// Convert the API date string to a Date object
let apiDate = new Date("2023-07-14");


// Compare the two dates
if (apiDate.toISOString().split('T')[0].getTime() === currentDate.toISOString().split('T')[0].getTime()) {
  console.log("The API date is equal to the current date.");
} else if (apiDate < currentDate) {
  console.log("The API date is before the current date.");
} else {
  console.log("The API date is after the current date.");
}