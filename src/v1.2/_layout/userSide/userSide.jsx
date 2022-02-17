function setUserSide(name){
    firebase.auth().onAuthStateChanged(user => {
        ReactDOM.render( <LAYOUT_userSide name={ name } /> ,$("#userSide").get(0));
    });    
};

const LAYOUT_userSide = ({name}) => {
    return (<span>{name}</span>);
}