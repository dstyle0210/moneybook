function getSmsMethod(text){
    if( (/9\*4\*/).test(text) ){
        return "국민봉올림";
    }else if( (/0\*0\*/).test(text) ){
        return "국민마올림";
    }else if( (/스마일카드/).test(text) ){
        return "현대스마일";
    }else{
        return "";
    };
}