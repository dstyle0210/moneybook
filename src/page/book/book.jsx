let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        Receipts = snapshot.val();
        console.log(Receipts);
        if(Receipts){
            bookReceiptsUI(Receipts);
        }else{
            Receipts = [];
        };
    });

    $("#createReceipt").on("click",createReceipt);
});

function bookReceiptsUI(receipts){
    const $reactRoot = $("#receipts");
    ReactDOM.render( <C_receiptList receipts={receipts} /> ,$reactRoot.get(0));
}



/*
const receiptVo = {
    comment,
    datetime:new Date(),
    outCategory,
    payment,
    price,
    store,
    useYn:"Y"
}
*/

/*
var receipt = {
    comment:"comment",
    datetime:"2022-01-03T16:05",
    outCategory:"outCategory",
    method:"결제방법",
    price:9999999,
    store:"가게명(쇼핑몰)",
    useYn:"Y"
};
*/

function createReceipt(){
    navigator.clipboard.readText().then((text) => {
        return text;
    }).then(function(origin){
        let receipt = {};
        receipt.datetime = getSmsDateTime(origin);
        receipt.price = getSmsPrice(origin);
        Object.assign(receipt,{
            comment:"코멘트",
            outCategory:"",
            method:"",
            store:"",
            useYn:"Y",
            origin:origin
        });
        return firebase.database().ref("/receipt/"+Receipts.length).set(receipt);
    }).then(function(){
        setTimeout(function(){
            location.href = "update.html?idx="+(Receipts.length-1);
        },200);
    }); 
};