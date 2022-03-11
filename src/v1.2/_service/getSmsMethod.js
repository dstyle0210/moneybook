function getSmsMethod(text){
    if( (/9\*4\*/).test(text) ){
        return "국민봉올림";
    }else if( (/0\*0\*/).test(text) ){
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