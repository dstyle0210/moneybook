/**
 * 헤더 공통 컴포넌트
 * @param {String} title - 타이틀 
 * @returns React.Component
 */
const LAYOUT_header = ({
  title
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, title)), /*#__PURE__*/React.createElement("span", {
    className: "version"
  }, "v", config.nowVersion));
};

/**
 * 헤더 공통 컴포넌트 적용 함수
 * @param {String} title - 타이틀 
 * @returns null
 */
function setHeader(title) {
  const $reactRoot = $("#header");
  ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_header, {
    title: title
  }), $reactRoot.get(0));
}
;
function setUserSide(name) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_userSide, {
        name: name
      }), $("#userSide").get(0));
    } else {
      ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_userSide_null, null), $("#userSide").get(0));
    }
  });
}
;
const LAYOUT_userSide = ({
  name
}) => {
  return /*#__PURE__*/React.createElement("span", null, name);
};
const LAYOUT_userSide_null = () => {
  function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      if (result.user.uid == config.uidm || result.user.uid == config.uidp) {
        location.href = route.book;
      } else {
        alert("미등록 사용자입니다.");
      }
      ;
    });
  }
  ;
  return /*#__PURE__*/React.createElement("a", {
    onClick: login
  }, "\uB85C\uADF8\uC778");
};