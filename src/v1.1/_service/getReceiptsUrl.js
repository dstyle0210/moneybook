function getReceiptsUrl(idx){
    const DBNAME = "dev"; // 연결 DB명

    var dateObj = new Date();
    var month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    var dateMonth = dateObj.getFullYear()+month+"";
    return "/"+DBNAME+"/"+dateMonth+((idx || idx==0)?"/"+idx+"":"");
};