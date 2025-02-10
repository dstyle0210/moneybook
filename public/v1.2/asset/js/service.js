config.nowVersion = "1.3.4"; // 현재 버전
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
function getSmsDateTime(origin){
    const date = new Date();
    if(origin){
        const num = "[0-9]{2}";
        const isBank = isBankMethod(origin);
        const dateSep = (isBank) ? "." : "/"; // 날짜 구분자
        const origin_ = (isBank) ? origin.replace(/[0-9]{4}\./g,"") : origin; // 년 구분 삭제
        const dateText = (origin_.match( (new RegExp(num+dateSep+num,"gi")) )[0]).replace(/\./g,"/"); // return "MM/DD"
        const timeText_ = origin_.match( (new RegExp(num+":"+num,"gi")) );
        const timeText = timeText_ ? timeText_[0] : "00:00"; // return "hh/mm"
        const tics = (dateText+" "+timeText).match((new RegExp(num,"gi")));
        date.setMonth((tics[0]*1)-1);
        date.setDate((tics[1]*1));
        date.setHours((tics[2]*1));
        date.setMinutes((tics[3]*1));
    }
    date.setSeconds(0);
    date.setHours( date.getHours() + 9 ); // ISO 시간규칙 적용
    return date.toISOString().split(":00.")[0];
};
// 계좌내역 복사내용인지 확인(보험 이체결과 용)
function isBankMethod(pasteStr){
    return (pasteStr) ? !!pasteStr.match(/CMS 공동/g) : false;
}

// 결제 방법
function getSmsMethod(text){
    if( (/9043/).test(text) || (/4059/).test(text) ){
        return "국민봉올림";
    }else if( (/9020/).test(text) ){
        return "국민마이포";
    }else if( (/0805/).test(text) || (/1843/).test(text) ){
        return "국민마올림";
    }else if( (/7939/).test(text) ){
        return "삼성아이디";
    }else if( (/스마일카드/).test(text) ){
        return "현대스마일";
    }else if( (/네이버 현대카드/).test(text) ){
        return "현대네이버";
    }else if( (/카카오 뱅크/).test(text) || (/CMS 공동/).test(text) ){
        return "계좌이체";
    }else{
        return "";
    };
}
function getSmsPrice(text){
    try{
        const reg = isBankMethod(text) ? /[0-9,]+$/gi : /[0-9,]+원/gi;
        return text.match(reg)[0].replace(/[,원]/gi,"") * 1;
    }catch(e){
        return 0;
    };
};
function getSmsStore(text){
    
    // 계좌이체 선처리(특수문자형태)
    if(text.indexOf("ＫＢ손")!=-1) return "KB손해보험";
    if(text.indexOf("현대해")!=-1) return "현대해상보험";
    if(text.indexOf("ＤＢ손")!=-1) return "DB손해보험";
    if(text.indexOf("메리츠")!=-1) return "메리츠보험";

    // 그외(일반)
    const method = getSmsMethod(text);
    let arr = text.split(/\r?\n/);
    const filter = () => {
        if(method=="국민봉올림" || method=="국민마이포" || method=="현대네이버"){
            return arr[arr.length-2];
        }else if(method=="국민마올림"){
            return arr[arr.length-1];
        }else if(method=="현대스마일"){
            let txt = arr[arr.length-2];
            return txt.replace(/[0-9]{2}\/[0-9]{2}\s[0-9]{2}\:[0-9]{2}/gi,"");
        }else if(method=="삼성아이디"){
            let txt = arr[3];
            return txt.replace(/[0-9]{2}\/[0-9]{2}\s[0-9]{2}\:[0-9]{2}/gi,"");
        }else if(method=="계좌이체"){
            let txt = arr[arr.length-1];
            return txt.replace(/간편이체|\(|\)/gi,"")
        }else{
            return "";
        };
    };
    return filter().replace(/\\r/gi,"");
};


/*
[삼성카드]
삼성7939승인 원*봉
5,695원 일시불
02/04 12:58 11번가-SKPay

비인증거래 안내
*/
function getTagCode(tag){ 
    if((/고정/).test(tag)){return "f"};
    if((/필수/).test(tag)){return "r"};
    if((/변동/).test(tag)){return "c"};
    if((/기타/).test(tag)){return "o"};
    if((/용돈/).test(tag)){return "b"};
};