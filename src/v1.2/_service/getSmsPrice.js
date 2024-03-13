function getSmsPrice(text){
    try{
        const reg = isBankMethod(text) ? /[0-9,]+$/gi : /[0-9,]+원/gi;
        return text.match(reg)[0].replace(/[,원]/gi,"") * 1;
    }catch(e){
        return 0;
    };
};