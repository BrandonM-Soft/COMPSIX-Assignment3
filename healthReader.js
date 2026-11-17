const { emit } = require('cluster');
const fs = require('fs/promises');

async function healthMetricsCounter(file) {
    try {
        const data = await fs.readFile(file, 'utf8');
        const healthData = JSON.parse(data);
        console.log('Total health entries:', healthData.metrics.length);
    } catch(error) {
        if (error.code === 'ENOENT') { 
            console.log('ERROR: Metrics File not found. Check the file path and try again.');
        } else if (error.name === 'SyntaxError') { 
            console.log('ERROR: Invalid JSON format. Check the formatting of the JSON file and try again.'); 
        } else { 
            console.log('ERROR: An unknown error occurred.', error.message); 
        } 
        return null;
    }   
}

healthMetricsCounter('./data/health-metrics.json');