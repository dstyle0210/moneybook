$(function(){
    try{
        setHeader("가계부목록"); // 헤더삽입
        
        firebase.auth().onAuthStateChanged(user => {
            if(user.uid){
                setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
            };
        });

        firebase.database().ref(getReceiptsUrl()).on("value", (snapshot) => {
            const origins = snapshot.val() || [];
            let useReceipts;
            if(origins.length){
                // 표시할 영수증 목록
                useReceipts = origins.filter((receipt)=>{
                    receipt.price = receipt.price*1;
                    receipt.paytime = new Date(receipt.datetime).getTime();
                    return receipt.useYn=="Y";
                });
                useReceipts.sort((a, b) => parseFloat(b.paytime) - parseFloat(a.paytime)); // 결제시간 기준 정렬
            };
            ReactDOM.render( <S_receiptsBook receipts={useReceipts} /> ,$("#receiptsBook").get(0));
        });
    }catch(e){
        alert(e);
    };
});

const S_receiptsBook = ({receipts}) =>{

    return(
    <React.Fragment>
        <S_receiptsList _receipts={receipts} />
        <S_nowMonthTotal receipts={receipts} />
    </React.Fragment>
    );
};