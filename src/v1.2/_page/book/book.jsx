$(function(){
    
    setHeader("가계부목록"); // 헤더삽입

    firebase.auth().onAuthStateChanged(user => {
        if(user){
            setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
        }else{
            setUserSide(); // 유저정보 삽입
        }
        firebase.database().ref(getReceiptsUrl()).on("value", (snapshot) => {
            const origins = snapshot.val() || [];
            let useReceipts;
            if(origins.length){
                // 표시할 영수증 목록
                useReceipts = origins.filter((receipt)=>{
                    receipt.price = receipt.price*1;
                    receipt.paytime = new Date(receipt.datetime).getTime();
                    if(isPinMode(user.uid)){
                        return receipt.useYn=="Y";
                    }else{
                        return receipt.useYn=="Y" && getTagCode(receipt.tag)!="b";
                    };
                });
                useReceipts.sort((a, b) => parseFloat(b.paytime) - parseFloat(a.paytime)); // 결제시간 기준 정렬
            };
            ReactDOM.render( <S_receiptsBook receipts={useReceipts} user={user} origins={origins} /> ,$("#receiptsBook").get(0));
        });
    });
});

const S_receiptsBook = ({receipts,user,origins}) =>{
    return(
    <React.Fragment>
        <S_receiptsList _receipts={receipts} user={user} />
        <S_nowMonthTotal receipts={receipts} user={user} origins={origins} />
    </React.Fragment>
    );
};