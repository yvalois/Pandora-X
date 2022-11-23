'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.useModal = void 0;
var jotai_1 = require('jotai');
('WITHDRAW_VIEW');
var modalAtom = jotai_1.atom({ isOpen: false, view: 'SEARCH_VIEW' });
function useModal() {
  var _a = jotai_1.useAtom(modalAtom),
    state = _a[0],
    setState = _a[1];
  var openModal = function (view) {
    return setState(
      __assign(__assign({}, state), { isOpen: true, view: view })
    );
  };
  var closeModal = function () {
    return setState(__assign(__assign({}, state), { isOpen: false }));
  };
  return __assign(__assign({}, state), {
    openModal: openModal,
    closeModal: closeModal,
  });
}
exports.useModal = useModal;
