function getSmsStore(text){
    const method = getSmsMethod(text);
    let arr = text.split(/\r?\n/);
    const filter = () => {
        if(method=="국민봉올림" || method=="현대네이버"){
            return arr[arr.length-2];
        }else if(method=="국민마올림"){
            return arr[arr.length-1];
        }else if(method=="현대스마일"){
            let txt = arr[arr.length-3];
            return txt.replace(/[0-9]{2}\/[0-9]{2}\s[0-9]{2}\:[0-9]{2}/gi,"");
        }else if(method=="계좌이체"){
            let txt = arr[arr.length-1];
            return txt.replace(/간편이체|\(|\)/gi,"")
        }else{
            return "";
        };
    };
    console.log( filter() );
    console.log( filter().replace(/\\r/gi,"") );
    return filter().replace(/\\r/gi,"");
};