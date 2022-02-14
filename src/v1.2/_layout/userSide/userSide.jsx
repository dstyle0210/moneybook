function setUserSide(name){
    firebase.auth().onAuthStateChanged(user => {
        let name = "";
        if(user.uid=="0MwBoXosqATbp9Dlu7e7KTNdaeJ3"){
            name = "마봉아빠";
        }else if(user.uid=="zZn2t36Bu7Zm4fBMcK9N3yCPKBE3"){
            name = "마봉엄마";
        };
        const $reactRoot = $("#userSide"); 
        ReactDOM.render( <LAYOUT_userSide name={name} /> ,$reactRoot.get(0));
    });    
};

const LAYOUT_userSide = ({name}) => {
    return (<span>{name}</span>);
}