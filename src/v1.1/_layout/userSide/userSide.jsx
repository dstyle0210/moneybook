const LAYOUT_userSide = ({name}) => {
    return (<span>{name}</span>);
}


function setUserSide(name){
    const $reactRoot = $("#userSide"); 
    ReactDOM.render( <LAYOUT_userSide name={name} /> ,$reactRoot.get(0));
};