var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import Header from "./components/header.js";
import Modal from "./components/modal.js";
import Items from "./components/items.js";
var App = /** @class */ (function () {
    function App(root) {
        var _this = this;
        this.root = root;
        this.state = {
            items: [],
        };
        this.main = document.createElement("section");
        this.main.setAttribute("class", "main");
        this.root.appendChild(this.main);
        this.header = new Header({
            main: this.main,
            onModalOpenClick: function (type) { return _this.onModalOpenClick(type); },
        });
        this.modal = new Modal({
            root: this.root,
            onAddItem: function (item) { return _this.onAddItem(item); },
        });
        this.items = new Items({
            main: this.main,
            initialState: this.state,
        });
    }
    App.prototype.setState = function (nextState) {
        this.state = nextState;
        this.items.setState(this.state);
    };
    App.prototype.onModalOpenClick = function (type) {
        this.modal.changeModalType(type);
        this.modal.onModalOpenClick();
    };
    App.prototype.onAddItem = function (item) {
        var items = __spreadArray(__spreadArray([], this.state.items), [
            __assign({}, item),
        ]);
        var nextState = __assign(__assign({}, this.state), { items: items });
        this.setState(nextState);
    };
    return App;
}());
export default App;
//# sourceMappingURL=app.js.map