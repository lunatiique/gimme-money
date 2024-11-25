const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { stringify } = require('csv-stringify'); // To write CSV output

const directoryPath = './rna_import_20241101';  // Directory where the CSV files are located
const outputFilePath = './merged_associations.csv'; // Path for the merged CSV file

// Array to hold the filtered rows
let mergedData = [];
let headers = ['id', 'titre', 'adr1', 'adrs_codepostal']; // Only keep these headers

// Function to merge and filter CSV files
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Unable to read directory:', err);
        return;
    }

    // Filter CSV files only
    const csvFiles = files.filter(file => path.extname(file) === '.csv');
    let filesProcessed = 0;

    // Process each CSV file
    csvFiles.forEach((file, index) => {
        const filePath = path.join(directoryPath, file);
        const fileStream = fs.createReadStream(filePath).pipe(csv({ 
            separator: ';',  // Semicolon as delimiter
            headers: ['id', 'id_ex', 'siret', 'gestion', 'date_creat', 'date_publi', 'nature', 'groupement', 'titre', 'objet', 'objet_social1', 'objet_social2', 'adr1', 'adr2', 'adr3', 'adrs_codepostal', 'libcom', 'dir_civilite', 'siteweb', 'observation', 'position', 'rup_mi', 'maj_time'],  // Specify the headers
            skipEmptyLines: true // Skip empty lines
        }));

        // Read the CSV file and filter rows
        fileStream.on('data', (row) => {

            // Only keep the desired columns (id, titre, adr1, adrs_codepostal)
            const filteredRow = {
                id: row.id || '',  // If the column is missing, set it as an empty string
                titre: row.titre || '',
                adr1: row.adr1 || '',
                adrs_codepostal: row.adrs_codepostal || ''
            };

            // Only push if some of the columns are not empty
            if (filteredRow.id || filteredRow.titre || filteredRow.adr1 || filteredRow.adrs_codepostal) {
                mergedData.push(filteredRow);
            }
        });

        // When file processing is complete
        fileStream.on('end', () => {
            filesProcessed++;

            if (filesProcessed === csvFiles.length) {
                // After processing all files, write the filtered data to a new CSV
                stringify(mergedData, (err, output) => {
                    if (err) {
                        console.error('Error writing merged CSV:', err);
                        return;
                    }

                    // Write the final filtered CSV to the output file
                    fs.writeFileSync(outputFilePath, output);
                    console.log('Filtered CSV files merged successfully into', outputFilePath);
                });
            }
        });

        fileStream.on('error', (err) => {
            console.error('Error reading file', file, err);
        });
    });
});