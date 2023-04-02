// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
  }
  
  function createTimeInEvent(record, timestamp) {
    const [date, hour] = timestamp.split(' ')
    record.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    })
    return record
  }
  
  function createTimeOutEvent(record, timestamp) {
    const [date, hour] = timestamp.split(' ')
    record.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    })
    return record
  }
  
  function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date)
    const timeOut = record.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour) / 100
  }
  
  function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date)
    return hoursWorked * record.payPerHour
  }
  
  function allWagesFor(record) {
    const dates = record.timeInEvents.map(e => e.date)
    const wages = dates.map(date => wagesEarnedOnDate(record, date))
    return wages.reduce((total, wage) => total + wage, 0)
  }
  
  function calculatePayroll(records) {
    const wages = records.map(allWagesFor)
    return wages.reduce((total, wage) => total + wage, 0)
  }
  