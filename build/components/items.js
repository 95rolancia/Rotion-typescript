var Items = /** @class */ (function () {
    function Items(_a) {
        var main = _a.main, initialState = _a.initialState;
        this.state = initialState;
        this.itemList = document.createElement("ul");
        this.itemList.className = "item-list";
        main.appendChild(this.itemList);
        this.render();
    }
    Items.prototype.handleStartDraggingEvent = function (ev) {
        var target = ev.target;
        console.log("[DRAG]" + target.id);
        target.classList.add("dragging");
        var dataTransfer = ev.dataTransfer;
        if (dataTransfer == null) {
            console.error("dataTransfer was null");
            return;
        }
        dataTransfer.setData("text/plain", target.id);
    };
    Items.prototype.handleDraggingEnterEvent = function (ev) {
        var target = ev.target;
        if (target.id === ev.dataTransfer.getData("text/plain")) {
            return;
        }
        if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
            console.log(target);
            return;
        }
        console.log("handle dragging enter " + target);
        target.classList.add("drop_over");
    };
    Items.prototype.handleDraggingExitEvent = function (ev) {
        console.log("dargging exit ");
        var target = ev.target;
        if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
            return;
        }
        console.log("dargging exit " + target);
        target.classList.remove("drop_over");
    };
    Items.prototype.handleDraggingOverEvent = function (ev) {
        ev.preventDefault();
    };
    Items.prototype.handleDropEndEvent = function (ev) {
        var target = ev.target;
        if ((target === null || target === void 0 ? void 0 : target.classList) == null) {
            return;
        }
        target.classList.remove("dragging");
        if (target.classList.contains("drop_over")) {
            target.classList.remove("drop_over");
        }
    };
    Items.prototype.handleDroppingEvent = function (ev) {
        var target = ev.target;
        if (target.classList.contains("drop_over")) {
            target.classList.remove("drop_over");
        }
        console.log("[DROP]" + target.id);
        var dragTargetId = ev.dataTransfer.getData("text/plain");
        var dropped = this.state.items.filter(function (t) { return t.id === target.id; })[0];
        var dragged = this.state.items.filter(function (t) { return t.id == dragTargetId; })[0];
        if (dropped == null || dragged == null)
            return;
        var droppedIndex = dropped.index;
        dropped.index = dragged.index;
        dragged.index = droppedIndex;
        this.updateElements();
        ev.preventDefault();
    };
    Items.prototype.updateElements = function () {
        for (var i = this.itemList.children.length - 1; i >= 0; i--) {
            this.itemList.removeChild(this.itemList.children[i]);
        }
        for (var _i = 0, _a = this.state.items.sort(function (a, b) { return a.index - b.index; }); _i < _a.length; _i++) {
            var target = _a[_i];
            this.itemList.appendChild(target.element);
        }
    };
    Items.prototype.setState = function (nextState) {
        this.state = nextState;
        this.render();
    };
    Items.prototype.render = function () {
        var _this = this;
        this.itemList.innerHTML = "";
        this.state.items.forEach(function (item, idx) {
            var li = item.element;
            li.innerHTML = "";
            li.ondragstart = function (ev) { return _this.handleStartDraggingEvent(ev); };
            li.ondragover = function (ev) { return _this.handleDraggingOverEvent(ev); };
            li.ondragenter = function (ev) { return _this.handleDraggingEnterEvent(ev); };
            li.ondragleave = function (ev) { return _this.handleDraggingExitEvent(ev); };
            li.ondrop = function (ev) { return _this.handleDroppingEvent(ev); };
            li.ondragend = function (ev) { return _this.handleDropEndEvent(ev); };
            switch (item.type) {
                case "IMAGE":
                    if (item.url === undefined)
                        break;
                    var img = document.createElement("img");
                    img.setAttribute("src", item.url);
                    li.appendChild(img);
                    break;
                case "VIDEO":
                    if (item.url === undefined)
                        break;
                    var video = document.createElement("video");
                    video.setAttribute("controls", "true");
                    video.innerHTML = "\n            <source src=\"" + item.url + "\">\n          ";
                    li.appendChild(video);
            }
            var desc = document.createElement("span");
            desc.textContent = item.desc;
            li.appendChild(desc);
            _this.itemList.appendChild(li);
        });
    };
    return Items;
}());
export default Items;
//# sourceMappingURL=items.js.map