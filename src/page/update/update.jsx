let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        var url = new URL(location.href);
        console.log();
        Receipts = snapshot.val();
        console.log( Receipts[url.searchParams.get("idx")] );

        const $reactRoot = $("#receiptsUpdateForm");
        ReactDOM.render( <S_receiptsUpdate receipt={Receipts[url.searchParams.get("idx")]} /> ,$reactRoot.get(0));
    });
});


const S_receiptsUpdate = ({receipt}) => {
    return (<React.Fragment>
        <M_receiptUpdateDateTime label="결제시간" value={receipt.datetime}></M_receiptUpdateDateTime>
    <div>
        <label for="write_store">사용처</label>
        <input type="text" id="write_store" value={receipt.store} />
        
    </div>
    <div>
        <label for="write_price">금액</label>
        <input type="text" id="write_price" value={receipt.price} />
    </div>
    <div>
        <label for="write_method">결제수단</label>
        <input type="text" id="write_method" value={receipt.method} />
    </div>
    <div>
        <label for="write_comment">상세내역</label>
        <input type="text" id="write_comment" value={receipt.comment} />
    </div>
    <div>
        <label>지출성격</label>
        <label><input type="radio" name="write_outgoingsType" /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" checked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" /> 기타</label>
    </div></React.Fragment>);
};



const M_receiptUpdateDateTime = ({label="결제시간",value}) => {
    return (
    <div className="m-receiptUpdate -dateTime">
        <label for="update_dateTime">{label}</label>
        <input type="datetime-local" id="update_dateTime" value={value} /> 
    </div>
    );
}