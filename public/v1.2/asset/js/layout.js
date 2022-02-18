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
  }, "v1.2"));
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
    ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_userSide, {
      name: name
    }), $("#userSide").get(0));
  });
}

;

const LAYOUT_userSide = ({
  name
}) => {
  return /*#__PURE__*/React.createElement("span", null, name);
};