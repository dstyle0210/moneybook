let Receipt, // 대상 영수증, 
setReceiptState, // 영수증 State Change 함수
receiptIdx; // 대상 영수증 인덱스 번호
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        const url = new URL(location.href);
        receiptIdx = url.searchParams.get("idx");
        Receipt = (snapshot.val())[receiptIdx]; // 영수증 저장
        
        const $reactRoot = $("#receiptsUpdateForm");
        ReactDOM.render( <S_receiptsUpdate receipt={Receipt} /> ,$reactRoot.get(0));

        $("#updateReceipt").on("click",updateReceipt);
    });
});

function setReceipt(updateData){
    Object.assign(Receipt,updateData);
    setReceiptState(Receipt);
};

function updateReceipt(){
    firebase.database().ref("/receipt/"+receiptIdx).set(Receipt);
    return false;
};

const S_receiptsUpdate = ({receipt}) => {
    [Receipt,setReceiptState] = React.useState( receipt ); // 상태 관리용 HOOK
    return (<React.Fragment>
        <M_receiptUpdateDateTime label="결제시간" value={Receipt.datetime}></M_receiptUpdateDateTime>
        <M_receiptUpdateStore label="사용처" value={Receipt.store}></M_receiptUpdateStore>
    <div>
        <label htmlFor="write_price">금액</label>
        <input type="text" id="write_price" defaultValue={Receipt.price} />
    </div>
    <div>
        <label htmlFor="write_method">결제수단</label>
        <input type="text" id="write_method" defaultValue={Receipt.method} />
    </div>
    <div>
        <label htmlFor="write_comment">상세내역</label>
        <input type="text" id="write_comment" defaultValue={Receipt.comment} />
    </div>
    <div>
        <label>지출성격</label>
        <label><input type="radio" name="write_outgoingsType" /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" defaultChecked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" /> 기타</label>
    </div></React.Fragment>);
};


const M_receiptUpdateDateTime = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -dateTime">
        <label htmlFor="update_dateTime">{label}</label>
        <input type="datetime-local" id="update_dateTime" defaultValue={value} onChange={(e) => {setReceipt({datetime:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdateStore = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -store">
        <label htmlFor="write_store">{label}</label>
        <input type="text" id="write_store" defaultValue={value} onChange={(e) => {setReceipt({store:e.target.value})}} />
    </div>
    );
};