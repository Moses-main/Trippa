const xlsx = require("xlsx");
const fs = require("fs");

// Load the Excel file
const workbook = xlsx.readFile("trippa's data.xlsx");

// Iterate over each sheet
workbook.SheetNames.forEach((sheetName) => {
  // Get worksheet by name
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet data to JSON format
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Write the JSON data to a file
  fs.writeFileSync(`${sheetName}.json`, JSON.stringify(jsonData, null, 2));

  console.log(
    `Conversion complete for sheet "${sheetName}". JSON data saved to ${sheetName}.json`
  );
});
