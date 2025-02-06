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