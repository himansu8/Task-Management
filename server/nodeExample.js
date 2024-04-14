import schedule from 'node-schedule';


const date = new Date(2023, 11, 30, 23, 56, 10);

const job = schedule.scheduleJob("express", date, function(){
  console.log('The world is going to end today.');
});
console.log(schedule.scheduledJobs);

schedule.cancelJob("express")
console.log("-----------------")
console.log(schedule.scheduledJobs)