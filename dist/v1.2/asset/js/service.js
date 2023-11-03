config.nowVersion = 1.27; // 현재 버전(개발중 버전)
function getAuthUser(uid){
    if(uid==config.uidp){
        return "마봉아빠";
    }else if(uid==config.uidm){
        return "마봉엄마";
    };
    return null;
};

function isPinMode(uid){
    return (uid==config.uidp);
};
function getMonthDate(datetime){
    var dateObj = new Date(datetime);
    var month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    var date = (dateObj.getDate()<9) ? "0"+dateObj.getDate() : ""+dateObj.getDate();
    return month+"."+date;
};
function getReceiptsUrl(idx){
    const DBNAME = "real"; // 연결 DB명
    let dbname = (location.hostname!="localhost") ? "real" : DBNAME; // 로컬호스트가 아니라면 실제DB로 연결
    let dateObj = new Date();
    let month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    let dateMonth = dateObj.getFullYear()+month+"";
    return "/"+dbname+"/"+dateMonth+((idx || idx==0)?"/"+idx+"":"");
};
function getSmsDateTime(text){ 
    const num = "[0-9]{2}";
    const date = new Date();
    try{
        const dateText = text.match( (new RegExp(num+"/"+num,"gi")) )[0];
        const timeText = text.match( (new RegExp(num+":"+num,"gi")) )[0];
        const dateTimeText = dateText+" "+timeText;
        const tics = dateTimeText.match((new RegExp(num,"gi")));

        date.setMonth((tics[0]*1)-1);
        date.setDate((tics[1]*1));
        date.setHours((tics[2]*1));
        date.setMinutes((tics[3]*1));
    }catch(e){
        
    }finally{ 
        date.setSeconds(0);
        date.setHours( date.getHours() + 9 ); // ISO 시간규칙 적용
        return date.toISOString().split(":00.")[0];
    }
};
function getSmsMethod(text){
    if( (/9043/).test(text) ){
        return "국민봉올림";
    }else if( (/0805/).test(text) ){
        return "국민마올림";
    }else if( (/스마일카드/).test(text) ){
        return "현대스마일";
    }else if( (/네이버 현대카드/).test(text) ){
        return "현대네이버";
    }else if( (/카카오 뱅크/).test(text) ){
        return "계좌이체";
    }else{
        return "";
    };
    // 네이버 현대카드
}
function getSmsPrice(text){
    let price;
    try{
        price = text.match(/[0-9,]+원/gi)[0];
        return (price.replace(/,/gi,"").replace("원","")) * 1;
    }catch(e){
        return 0;
    };
};
function getSmsStore(text){
    const method = getSmsMethod(text);
    if(method=="국민봉올림" || method=="현대네이버"){
        let arr = text.split(/\n/);
        return arr[arr.length-2];
    }else if(method=="국민마올림"){
        let arr = text.split(/\n/);
        return arr[arr.length-1];
    }else if(method=="현대스마일"){
        let arr = text.split(/\n/);
        let txt = arr[arr.length-3];
        return txt.replace(/[0-9]{2}\/[0-9]{2}\s[0-9]{2}\:[0-9]{2}/gi,"");
    }else if(method=="계좌이체"){
        let arr = text.split(/\n/);
        let txt = arr[arr.length-1];
        return txt.replace(/간편이체|\(|\)/gi,"")
    }else{
        return "";
    };
};
function getTagCode(tag){ 
    if((/고정/).test(tag)){return "f"};
    if((/필수/).test(tag)){return "r"};
    if((/변동/).test(tag)){return "c"};
    if((/기타/).test(tag)){return "o"};
    if((/용돈/).test(tag)){return "b"};
};