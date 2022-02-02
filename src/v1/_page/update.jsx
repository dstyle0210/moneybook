let Idx; // 작성될 영수증 번호(PK)
let Receipt = {};
$(function () { 
    var auth = firebase.auth(); // 인증체크
    firebase.database().ref(getReceiptsUrl()).on("value", (snapshot) => {
        const url = new URL(location.href);
        Idx = url.searchParams.get("idx");
        Receipt = (snapshot.val())[Idx]; // 영수증 저장

        const $reactRoot = $("#updatePage");
        ReactDOM.render( <S_receiptsUpdateForm _receipt={Receipt} receiptIdx={Idx} /> ,$reactRoot.get(0));
    });
    firebase.auth().onAuthStateChanged(user => {
        if(user.uid){
            ReactDOM.render( <A_user uid={user.uid} /> ,$("#userSide").get(0));
        };
    });
});