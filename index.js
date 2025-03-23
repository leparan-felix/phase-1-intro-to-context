// Your code here

// Create an employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create multiple employee records
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employee => createEmployeeRecord(employee));
  }
  
  // Record the time an employee checks in
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // Record the time an employee checks out
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  // Calculate the number of hours worked by an employee on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    }
    return 0; // Return 0 if there's no matching timeIn or timeOut event
  }
  
  // Calculate the wages earned by an employee on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Calculate all wages earned by an employee for all dates worked
  function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    return allDates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Calculate the total payroll for all employees
  function calculatePayroll(employeesRecords) {
    return employeesRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
