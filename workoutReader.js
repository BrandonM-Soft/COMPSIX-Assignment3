const fs = require('fs');
const csv = require('csv-parser');

async function workoutFileReader(file) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function workoutCalculator(file) {
    try {
    	const workoutData = await workoutFileReader(file); 
        const workoutTotal = workoutData.length;
        console.log('Total workouts :', workoutTotal);
        let totalDuration = 0; 
        for (let i = 0; i < workoutData.length; i++) { 
            const minutes = parseInt(workoutData[i].duration);
            totalDuration += minutes; 
        }
        console.log('Total minutes ', totalDuration);
        return {workoutTotal, totalDuration};

    } catch(error) {
    	if (error.code === 'ENOENT') { 
            console.log('ERROR: Workouts File not found. Check the file path and try again.'); 
        } else { 
            console.log('ERROR: ', error.message);
        } 
        return null;
    }
}

module.exports = {workoutCalculator}