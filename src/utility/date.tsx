import moment from "moment"

// not really needed 
export function calculateDaysSinceBirth(birthdayDate : moment.Moment){
    let todayDate = moment()

    return birthdayDate.diff(todayDate, "days")
}