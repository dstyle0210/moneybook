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
    return (<React.Fragment><div>
        <label for="write_dateTime">결제시간</label>
        <input type="datetime-local" id="write_dateTime" value={receipt.datetime} /> 
    </div>
    <div>
        <label for="write_store">사용처</label>
        <input type="text" id="write_store" />
        
    </div>
    <div>
        <label for="write_price">금액</label>
        <input type="text" id="write_price" />
    </div>
    <div>
        <label for="write_payment">결제수단</label>
        <input type="text" id="write_payment" />
    </div>
    <div>
        <label for="write_comment">상세내역</label>
        <input type="text" id="write_comment" />
    </div>
    <div>
        <label>지출성격</label>
        <label><input type="radio" name="write_outgoingsType" /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" checked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" /> 기타</label>
    </div></React.Fragment>);
};