// DateStamp.js
export function createDateSpan() {
    var dateSpan = document.createElement("span");
    var storedDate = quip.apps.getRootRecord().get("date");
  
    if (!storedDate) {
      storedDate = getCurrentMonthYear();
      quip.apps.getRootRecord().set("date", storedDate);
    }
  
    dateSpan.textContent = " wrote this document in " + storedDate + ", ";
    return dateSpan;
  }
  
  export function getCurrentMonthYear() {
    var now = new Date();
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[now.getMonth()] + " " + now.getFullYear();
  }
  