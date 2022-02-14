function getReceiptsUrl(idx){
    const DBNAME = "real"; // 연결 DB명
    let dbname = (location.hostname!="localhost") ? "real" : DBNAME; // 로컬호스트가 아니라면 실제DB로 연결
    let dateObj = new Date();
    let month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    let dateMonth = dateObj.getFullYear()+month+"";
    return "/"+dbname+"/"+dateMonth+((idx || idx==0)?"/"+idx+"":"");
};