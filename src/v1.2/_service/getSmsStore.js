function getSmsStore(text){
    const method = getSmsMethod(text);
    if(method=="국민봉올림" || method=="현대네이버"){
        let arr = text.split(/\n/);
        return arr[arr.length-2];
    }else if(method=="국민마올림"){
        let arr = text.split(/\n/);
        return arr[arr.length-1];
    }else if(method=="현대스마일"){
        return text.match(/(스마일페이).*/gi)[0];
    }else{
        return "";
    };
};