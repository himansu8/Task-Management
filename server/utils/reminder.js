 function calculateReminder(startDate, endDate) {
    const timeDifference = endDate.getTime() - startDate.getTime();
    //console.log(timeDifference)
    //calculate the 3 reminder 
    const r1 = new Date(startDate.getTime() + Math.floor(timeDifference / 4));
    //console.log(r1)

    const r2 = new Date(startDate.getTime() + Math.floor(timeDifference / 2));
    //console.log(r2)

    const r3 = new Date(startDate.getTime() + Math.floor(3 * timeDifference / 4));
    //console.log(r3)

    const r4 = endDate;
    //console.log(r1,r2,r3)

    // return{r1,r2,r3}
    return[r1,r2,r3,r4]
    
}
// const startDate = new Date('2023-01-01');
// const endDate = new Date('2023-12-31');

// let result = reminder(startDate, endDate)
// // console.log(result)

export default calculateReminder;