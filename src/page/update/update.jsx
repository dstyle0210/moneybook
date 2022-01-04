let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    console.log("test");
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        var url = new URL(location.href);
        Receipts = snapshot.val();

        const $reactRoot = $("#receiptsUpdateForm");
        ReactDOM.render( <S_receiptsUpdate receipt={Receipts[url.searchParams.get("idx")]} /> ,$reactRoot.get(0));
    });
});



const M_receiptUpdateDateTime = ({label,datetime,setDatetime}) => {
    return (
    <div className="m-receiptUpdate -dateTime">
        <label htmlFor="update_dateTime">{label}</label>
        <input type="datetime-local" id="update_dateTime" defaultValue={datetime} onChange={(e) => {setDatetime(e.target.value)}} />
    </div>
    );
};
var test = {};
const S_receiptsUpdate = ({receipt}) => {
    const [datetime,setDatetime] = React.useState(receipt.datetime); // 상태 관리용 HOOK
    return (<React.Fragment>
        <M_receiptUpdateDateTime label="결제시간" datetime={datetime} setDatetime={setDatetime}></M_receiptUpdateDateTime>
    <div>
        <label htmlFor="write_store">사용처{datetime}</label>
        <input type="text" id="write_store" defaultValue={receipt.store} />
    </div>
    <div>
        <label htmlFor="write_price">금액</label>
        <input type="text" id="write_price" defaultValue={receipt.price} />
    </div>
    <div>
        <label htmlFor="write_method">결제수단</label>
        <input type="text" id="write_method" defaultValue={receipt.method} />
    </div>
    <div>
        <label htmlFor="write_comment">상세내역</label>
        <input type="text" id="write_comment" defaultValue={receipt.comment} />
    </div>
    <div>
        <label>지출성격</label>
        <label><input type="radio" name="write_outgoingsType" /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" defaultChecked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" /> 기타</label>
    </div></React.Fragment>);
};
