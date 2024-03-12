const S_nowMonthTotal = ({receipts,user,origins}) =>{
    const pasteReceipt = function(){
        navigator.clipboard.readText().then((text) => {
            return text;
        }).then(async function(origin){

            // CMS 공동(보험사 계좌이체)의 경우
            if( origin.match(/CMS 공동/g) ){
                const a = origin.replace(/[\t\r\n]+/gi,"::").split("::");
                console.log(a);
                return;
            }

            let pasteReceipt = {};
            pasteReceipt.idx = origins.length;
            pasteReceipt.datetime = getSmsDateTime(origin);
            pasteReceipt.price = getSmsPrice(origin);
            pasteReceipt.method = getSmsMethod(origin);
            pasteReceipt.store = getSmsStore(origin).replace(/\\r/gi,"");
            pasteReceipt.useYn = "N";
            pasteReceipt.tag = "";
            pasteReceipt.origin = origin;

            // 금액에 따른 자동변환
            
            // 디지털큐브 주차
            if(pasteReceipt.method == "국민봉올림" && pasteReceipt.price==13900 && pasteReceipt.store=="카카오 T 주차"){
                pasteReceipt.comment = "디지털큐브 주차";
                pasteReceipt.tag = "변동/자동차,택시";
            };

            // 담배값
            if(pasteReceipt.method == "현대네이버" && pasteReceipt.price==4800){
                pasteReceipt.comment = "담배";
                pasteReceipt.tag = "용돈/담배";
            };
            if(pasteReceipt.method == "현대네이버" && pasteReceipt.price==9600){
                pasteReceipt.comment = "담배 2갑";
                pasteReceipt.tag = "용돈/담배";
            };
            
            // 구독,통신요금
            if( (/LGUPLUS 통신요금/).test(pasteReceipt.origin) ){
                pasteReceipt.store = "LGUPLUS";
                pasteReceipt.comment = "운양집 통신요금";
                pasteReceipt.tag = "고정/구독통신비";
            }
            if( (/멜론/).test(pasteReceipt.origin) ){
                pasteReceipt.store = "(주)카카오(멜론)";
                pasteReceipt.comment = "멜론 스트리밍";
                pasteReceipt.tag = "고정/구독통신비";
            }
            if( (/와우멤버십/).test(pasteReceipt.origin) ){
                pasteReceipt.store = "쿠팡";
                pasteReceipt.comment = "쿠팡 와우 멤버십";
                pasteReceipt.tag = "고정/구독통신비";
            }
            console.log(pasteReceipt);

            // return await firebase.database().ref(getReceiptsUrl(origins.length)).set(pasteReceipt);
        }).then(function(){
            setTimeout(function(){
                // location.href = "/v1.2/update/?idx="+(origins.length);
            },200);
        });
    };
    return (
        <section className="s-nowMonthTotal">
            <C_monthTotal receipts={receipts} user={user}></C_monthTotal>
            <div className="-writeBtn">
                <a href="/v1.2/create/" className="a-btn -l">새로등록</a>
                <a className="a-btn -l" onClick={pasteReceipt}>붙여넣기</a>
            </div>
        </section>
    );
};

const C_monthTotal = ({receipts,user}) => {
    let monthTotal = 0;
    receipts.forEach((receipt)=>{
        monthTotal += (getTagCode(receipt.tag)!="b") ? receipt.price : 0;
    });
    return (
        <article className="c-monthTotal">
            <h2>{(new Date()).getFullYear()}년 {(new Date()).getMonth()+1}월 지출금액</h2>
            <details>
                <summary><span className="a-price -xl">{monthTotal.toLocaleString()}</span></summary>
                <M_MethodByTotal receipts={receipts}></M_MethodByTotal>
                <M_TagByTotal receipts={receipts} user={user}></M_TagByTotal>
            </details>
        </article>
    );
};

// 지출태그 기준 총합
const M_TagByTotal = ({receipts,user}) => {
    const tagTotal = {f:0,r:0,c:0,o:0,b:0};
    receipts.forEach((receipt)=>{
        tagTotal[getTagCode(receipt.tag)] += receipt.price;
    });

    const pinVD = isPinMode(user.uid) ? (
        <React.Fragment>
            <li><label className="a-tag -b">용돈</label> <span className="a-price">{tagTotal.b.toLocaleString()}</span></li>
        </React.Fragment>
    ) : "";
    
    return (<ul className="m-tagByTotal">
        <li><label className="a-tag -f">고정</label> <span className="a-price">{tagTotal.f.toLocaleString()}</span></li>
        <li><label className="a-tag -r">필수</label> <span className="a-price">{tagTotal.r.toLocaleString()}</span></li>
        <li><label className="a-tag -c">변동</label> <span className="a-price">{tagTotal.c.toLocaleString()}</span></li>
        <li><label className="a-tag -o">기타</label> <span className="a-price">{tagTotal.o.toLocaleString()}</span></li>
        {pinVD}
    </ul>);
};

// 결제방식 별 총합
const M_MethodByTotal = ({receipts}) => {
    const methodTotal = {};
    const methodNames = ["국민봉올림","국민마이포","현대네이버","현대스마일"];
    methodNames.forEach((name)=>{methodTotal[name] = 0;}); // 표시할 목록 초기화.

    receipts.forEach((receipt)=>{
        methodTotal[receipt.method] = methodTotal[receipt.method] || 0; // 메소드 키값 등록 (목록에 없으면 type 맞추는 용)
        methodTotal[receipt.method] += receipt.price; // 결제방식 별 금액 합산
    });

    return (<ul className="m-methodByTotal">
        {methodNames.map((name,idx)=>{
            return (<li key={idx}><label className="a-method">{name}</label><span className="a-price">{methodTotal[name].toLocaleString()}</span></li>);
        })}
    </ul>);
};