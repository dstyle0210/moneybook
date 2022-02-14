function getSmsPrice(text){
    let price;
    try{
        price = text.match(/[0-9,]+원/gi)[0];
        return (price.replace(/,/gi,"").replace("원","")) * 1;
    }catch(e){
        return 0;
    };
};