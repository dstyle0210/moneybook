function setUserSide(name){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            ReactDOM.render( <LAYOUT_userSide name={ name } /> ,$("#userSide").get(0));
        }else{
            ReactDOM.render( <LAYOUT_userSide_null /> ,$("#userSide").get(0));
        }
        
    });    
};

const LAYOUT_userSide = ({name}) => {
    return (<span>{name}</span>);
}
const LAYOUT_userSide_null = () => {
    function login(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          if(result.user.uid==config.uidm || result.user.uid==config.uidp){
            location.href = route.book;
          }else{
            alert("미등록 사용자입니다.");
          };
        });
      };

      return (<a onClick={login}>로그인</a>);
}

