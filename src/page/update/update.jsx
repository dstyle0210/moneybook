let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        var url = new URL(location.href);
        console.log();
        Receipts = snapshot.val();
        console.log( Receipts[url.searchParams.get("idx")] );
    });
});