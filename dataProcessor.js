require('dotenv').config();
const {healthMetricsCounter} = require("./healthReader");
const {workoutCalculator} = require("./workoutReader");

try {
    
    const name = process.env.USER_NAME;
    console.log('Processing data for:', name); // "Brandon"
    console.log('📁 Reading workout data...');
    const workoutTotal = workoutCalculator('./data/workouts.csv').workoutTotal;
    const totalDuration = workoutCalculator('./data/workouts.csv').totalDuration;
    console.log('📁 Reading health data...');
    const healthMetricsTotal = healthMetricsCounter('./data/health-metrics.json');
    console.log('=== SUMMARY ===');
    console.log('Workouts found:', workoutTotal);
    console.log('Total workout minutes:', totalDuration);
    console.log('Health entries found:', healthMetricsTotal);
    const goal = process.env.WEEKLY_GOAL;
    console.log('Weekly goal:', goal)
    if (healthMetricsTotal >= goal) {
        console.log('🎉 Congratulations ', name, '! You have exceeded your weekly goal!')
    } else {
        console.log('Keep working hard ', name, '! You have ', (goal - healthMetricsTotal),' until you exceed your weekly goal!')
    }


} catch(error) {console.log('An error has occurred in this program: ', error.message);}