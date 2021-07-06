var btnTypes = ["IMAGE", "VIDEO", "NOTE", "TASK"];
var Navbar = /** @class */ (function () {
    function Navbar(_a) {
        var _this = this;
        var header = _a.header, onModalOpenClick = _a.onModalOpenClick;
        this.ul = document.createElement("ul");
        this.ul.setAttribute("class", "menus");
        btnTypes.forEach(function (type) {
            var li = document.createElement("li");
            li.setAttribute("class", "menu");
            var newBtn = document.createElement("button");
            newBtn.textContent = type;
            newBtn.addEventListener("click", function () {
                onModalOpenClick(newBtn.textContent);
            });
            li.appendChild(newBtn);
            _this.ul.appendChild(li);
        });
        header.appendChild(this.ul);
    }
    return Navbar;
}());
export default Navbar;
//# sourceMappingURL=navbar.js.map