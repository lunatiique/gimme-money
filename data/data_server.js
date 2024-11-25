const fs = require("fs");
const cors = require("cors");
const csv = require("csv-parser");
const express = require("express");

// Function to verify association and interact with smart contract
async function verifyAndAddAssociation(identifier) {
  return new Promise((resolve, reject) => {
      let verifiedAssociation = null;

      // Read and search CSV
      const stream = fs.createReadStream("./merged_associations.csv")
          .pipe(csv({
              separator: ',',  // Semicolon as delimiter
              headers: ['id', 'titre', 'adr1', 'adrs_codepostal'],  // Specify the headers
              skipEmptyLines: true // Skip empty lines
          }))
          .on("data", (row) => {
              if (row.id === identifier) {
                  verifiedAssociation = row;
                  // Stop further processing
                  stream.destroy(); // Ends the stream early
                  console.log("GET request successful");
                  resolve(verifiedAssociation); // Resolve with the found row
              }
          })
          .on("end", () => {
              if (verifiedAssociation) {
                  resolve(verifiedAssociation); // Resolve with the found row
              } else {
                  console.log("GET request failed");
                  resolve(null); // Resolve with null if not found
              }
          })
          .on("error", (error) => {
              reject(error); // Reject the promise in case of error
          });
  });
}


// Express server
const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your React app
}));

app.use(express.json());

// GET request to verify association
app.get("/verify/:identifier", async (req, res) => {
  const identifier = req.params.identifier;
  const verifiedAssociation = await verifyAndAddAssociation(identifier);

  if (verifiedAssociation) {
    res.send(verifiedAssociation);
  } else {
    res.status(404).send("Association not found");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
