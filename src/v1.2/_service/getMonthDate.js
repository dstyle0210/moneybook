function getMonthDate(datetime){
    var dateObj = new Date(datetime);
    var month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    var date = (dateObj.getDate()<9) ? "0"+dateObj.getDate() : ""+dateObj.getDate();
    return month+"."+date;
};