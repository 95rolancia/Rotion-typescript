import Navbar from "./navbar.js";
var Header = /** @class */ (function () {
    function Header(_a) {
        var main = _a.main, onModalOpenClick = _a.onModalOpenClick;
        this.header = document.createElement("header");
        this.header.setAttribute("class", "header");
        this.title = document.createElement("h1");
        this.title.setAttribute("class", "title");
        this.title.textContent = "Rotion";
        this.header.appendChild(this.title);
        this.navbar = new Navbar({
            header: this.header,
            onModalOpenClick: function (type) { return onModalOpenClick(type); },
        });
        main.appendChild(this.header);
    }
    return Header;
}());
export default Header;
//# sourceMappingURL=header.js.map