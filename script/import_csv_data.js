const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Message = require('../models/import_csv_model');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './configuration.env' });

function importCsv() {
    const messages = [];
    const csvFilePath = path.join(__dirname, '../data/GeneralistRails_Project_MessageData.csv');

    fs.createReadStream(csvFilePath)
        .on('error', err => {
            console.error(`💥 Error reading CSV file: ${err}`);
            process.exit(1);
        })
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim() 
        }))
        .on('data', (row) => {
            const mappedRow = {
                userId: parseInt(row['User ID']), 
                timestamp: new Date(row['Timestamp (UTC)']), 
                messageBody: row['Message Body']
            };

            messages.push(mappedRow);
        })
        .on('end', async () => {
            try {
                await Message.insertMany(messages);
                console.log('[itskios-09]: Script ran successfully');
                process.exit(0);
            } catch (err) {
                console.error(`💥 Error inserting data into database: ${err}`);
                process.exit(1);
            }
        });
}

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log(`[itskios-09]: Database connection established`);
    await importCsv();
}).catch(err => console.error(`💥 Database connection error: ${err}`));
