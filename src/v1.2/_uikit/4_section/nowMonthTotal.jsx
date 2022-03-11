const S_nowMonthTotal = ({receipts,user,origins}) =>{
    const pasteReceipt = function(){
        navigator.clipboard.readText().then((text) => {
            return text;
        }).then(function(origin){
            let pasteReceipt = {};
            pasteReceipt.idx = origins.length;
            pasteReceipt.datetime = getSmsDateTime(origin);
            pasteReceipt.price = getSmsPrice(origin);
            pasteReceipt.method = getSmsMethod(origin);
            pasteReceipt.store = getSmsStore(origin);
            pasteReceipt.useYn = "N";
            pasteReceipt.tag = "";
            pasteReceipt.origin = origin;
            return firebase.database().ref(getReceiptsUrl(origins.length)).set(pasteReceipt);
        }).then(function(){
            setTimeout(function(){
                location.href = "/v1.2/update/?idx="+(origins.length);
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
    let pinTotal = 0;
    const tagTotal = {f:0,r:0,c:0,o:0,b:0};
    
    if(receipts){
        for(receipt of receipts){
            tagTotal[getTagCode(receipt.tag)] += receipt.price;
            monthTotal += (getTagCode(receipt.tag)!="b") ? receipt.price : 0;
            pinTotal += receipt.price;
        };
    }
    const pinVD = isPinMode(user.uid) ? (<React.Fragment>
        <li><label className="a-tag -b">용돈</label> <span className="a-price">{tagTotal.b.toLocaleString()}</span></li>
        <li><label className="a-tag -b">총합</label> <span className="a-price">{pinTotal.toLocaleString()}</span></li>
        </React.Fragment>) : "";

    return (
        <article className="c-monthTotal">
            <h2>2022년 {(new Date()).getMonth()+1}월 지출금액</h2>
            <details>
                <summary><span className="a-price -xl">{monthTotal.toLocaleString()}</span></summary>
                <ul className="m-tagByTotal">
                    <li><label className="a-tag -f">고정</label> <span className="a-price">{tagTotal.f.toLocaleString()}</span></li>
                    <li><label className="a-tag -r">필수</label> <span className="a-price">{tagTotal.r.toLocaleString()}</span></li>
                    <li><label className="a-tag -c">변동</label> <span className="a-price">{tagTotal.c.toLocaleString()}</span></li>
                    <li><label className="a-tag -o">기타</label> <span className="a-price">{tagTotal.o.toLocaleString()}</span></li>
                    {pinVD}
                </ul>
            </details>
        </article>
    );
};