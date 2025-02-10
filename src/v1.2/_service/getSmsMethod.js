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