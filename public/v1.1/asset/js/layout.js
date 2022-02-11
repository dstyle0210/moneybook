const LAYOUT_header = ({
  title
}) => {
  return /*#__PURE__*/React.createElement("h1", null, title);
};

function setHeader(title) {
  const $reactRoot = $("#header");
  ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_header, {
    title: title
  }), $reactRoot.get(0));
}

;

const LAYOUT_userSide = ({
  name
}) => {
  return /*#__PURE__*/React.createElement("span", null, name);
};

function setUserSide(name) {
  const $reactRoot = $("#userSide");
  ReactDOM.render( /*#__PURE__*/React.createElement(LAYOUT_userSide, {
    name: name
  }), $reactRoot.get(0));
}

;