const S_nowMonthTotal = ({receipts,user,origins}) =>{
    const _pasteReceipt = function(){
        navigator.clipboard.readText().then((text) => {
            return text;
        }).then(async function(origin){
            // 붙여넣기한 원본내용
            let pasteReceipt = {
                origin,
                idx:origins.length,
                datetime:getSmsDateTime(origin),
                price:getSmsPrice(origin),
                method:getSmsMethod(origin),
                store:getSmsStore(origin),
                comment:"",
                tag:"",
                useYn:"N"
            };

            // 수정,변환내용
            const coverReceipt = (cover) => {
                Object.assign(pasteReceipt,cover,{useYn:"Y"});
            };

            /*! 자동변환 로직 */

            // CMS 공동(보험사 계좌이체)의 경우
            if( isBankMethod(origin) ){
                coverReceipt({
                    comment:origin.replace(/[\t\r\n]+/gi,"::").split("::")[2],
                    tag:"고정/보험"
                });
            };

            // 에스플렉스 주차
            if(pasteReceipt.method == "국민봉올림" && pasteReceipt.price==15000 && pasteReceipt.store.indexOf("파킹클라우드")!=-1){
                coverReceipt({
                    comment:"에스플렉스 주차",
                    tag:"변동/자동차,택시"
                });
            };
            // 월 정기주차
            if(pasteReceipt.method == "삼성아이디" && pasteReceipt.price==132000){
                coverReceipt({
                    comment:"월 정기주차(에스플렉스)",
                    tag:"변동/자동차,택시"
                });
            };

            // 담배값
            if(pasteReceipt.price%4800 == 0){
                coverReceipt({
                    comment:`담배 ${pasteReceipt.price/4800}갑`,
                    tag:"용돈/담배"
                });
            }
            
            // 구독,통신요금
            if( (/LGUPLUS 통신요금/).test(pasteReceipt.origin) ){
                coverReceipt({
                    store:"LGUPLUS",
                    comment:"운양집 통신요금",
                    tag:"고정/구독통신비"
                });
            }
            if( (/SK텔레콤\-자동납부/).test(pasteReceipt.origin) ){
                coverReceipt({
                    store:"SK텔레콤",
                    comment:(pasteReceipt.price=="51730") ? "04** 핸드폰비" : "상봉 BTV",
                    tag:"고정/구독통신비"
                });
            }

            if( (/멜론/).test(pasteReceipt.origin) ){
                coverReceipt({
                    store:"(주)카카오(멜론)",
                    comment:"멜론 스트리밍",
                    tag:"고정/구독통신비"
                });
            }
            if( (/와우멤버십/).test(pasteReceipt.origin) ){
                coverReceipt({
                    store:"쿠팡",
                    comment:"쿠팡 와우 멤버십",
                    tag:"고정/구독통신비"
                });
            }
            await firebase.database().ref(getReceiptsUrl(origins.length)).set(pasteReceipt);
            return pasteReceipt.useYn;
        }).then(function(useYn){
            setTimeout(function(){
                if(useYn=="Y"){
                    location.reload();
                }else{
                    location.href = "/v1.2/update/?idx="+(origins.length);
                };
            },200);
        });
    };
    return (
        <section className="s-nowMonthTotal">
            <C_monthTotal receipts={receipts} user={user}></C_monthTotal>
            <div className="-writeBtn">
                <a href="/v1.2/create/" className="a-btn -l">새로등록</a>
                <a className="a-btn -l" onClick={_pasteReceipt}>붙여넣기</a>
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