const config = {
    releaseVersion:1.2, // 최신 앱 버전
    nowVersion:null, // 각 버전 service 에서 설정 됨.
    base:"/v1.2", // 루트 폴더
    uidp:"0MwBoXosqATbp9Dlu7e7KTNdaeJ3",
    uidm:"zZn2t36Bu7Zm4fBMcK9N3yCPKBE3"
};

const route = {
    book:config.base+"/book",
    create:config.base+"/create",
    update:config.base+"/update"
}

function release(nowVersion){
    if(config.nowVersion && config.nowVersion < config.releaseVersion){
        alert("업데이트 되었어요!\n자동으로 이동합니다!");
        location.href="/";
    };
    return null;
};

$(function(){
    release(config.nowVersion); // DOM 로드 이후, 체크
})