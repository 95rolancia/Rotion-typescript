var Modal = /** @class */ (function () {
    function Modal(_a) {
        var _this = this;
        var root = _a.root, onAddItem = _a.onAddItem;
        this.modalType = "IMAGE";
        this.modal = document.createElement("div");
        this.modal.setAttribute("class", "modal");
        this.modalOverlay = document.createElement("div");
        this.modalOverlay.className = "modal-bg modal-exit";
        this.modalContainer = document.createElement("div");
        this.modalContainer.className = "modal-container";
        this.modalTitle = document.createElement("h1");
        this.modalForm = document.createElement("form");
        this.modalInputTitle = document.createElement("input");
        this.modalInputTitle.setAttribute("type", "text");
        this.modalInputTitle.placeholder = "Title";
        this.modalInputDesc = document.createElement("input");
        this.modalInputDesc.setAttribute("type", "text");
        this.modalSubmit = document.createElement("button");
        this.modalSubmit.textContent = "Add";
        var cnt = 0;
        this.modalSubmit.addEventListener("click", function (e) {
            e.preventDefault();
            var element = document.createElement("li");
            element.setAttribute("class", "item draggable_item");
            element.setAttribute("draggable", "true");
            element.setAttribute("id", cnt.toString());
            var newItem = {
                id: (cnt++).toString(),
                element: element,
                index: cnt,
                title: _this.modalInputTitle.value,
                type: _this.modalType,
                desc: "",
                url: "",
            };
            switch (_this.modalType) {
                case "IMAGE":
                case "VIDEO":
                    newItem.url = _this.modalInputDesc.value;
                    break;
                case "NOTE":
                case "TASK":
                    newItem.desc = _this.modalInputDesc.value;
                    break;
            }
            onAddItem(newItem);
            _this.modalForm.reset();
            _this.onModalCloseClick();
        });
        this.modalForm.appendChild(this.modalInputTitle);
        this.modalForm.appendChild(this.modalInputDesc);
        this.modalForm.appendChild(this.modalSubmit);
        this.modalCloseBtn = document.createElement("button");
        this.modalCloseBtn.textContent = "X";
        this.modalCloseBtn.setAttribute("class", "modal-close modal-exit");
        this.modalContainer.appendChild(this.modalTitle);
        this.modalContainer.appendChild(this.modalForm);
        this.modalContainer.appendChild(this.modalCloseBtn);
        this.modalCloseBtn.addEventListener("click", function () {
            _this.onModalCloseClick();
        });
        this.modal.appendChild(this.modalOverlay);
        this.modal.appendChild(this.modalContainer);
        root.appendChild(this.modal);
    }
    Modal.prototype.onModalOpenClick = function () {
        switch (this.modalType) {
            case "IMAGE":
                this.modalInputDesc.placeholder = "이미지 URL을 입력해주세요.";
                break;
            case "VIDEO":
                this.modalInputDesc.placeholder = "비디오 URL을 입력해주세요.";
                break;
            case "NOTE":
                this.modalInputDesc.placeholder = "...입력";
                break;
            case "TASK":
                this.modalInputDesc.placeholder = "...입력";
                break;
        }
        this.modal.className = "modal open";
    };
    Modal.prototype.onModalCloseClick = function () {
        this.modal.className = "modal";
    };
    Modal.prototype.changeModalType = function (type) {
        this.modalType = type;
    };
    return Modal;
}());
export default Modal;
//# sourceMappingURL=modal.js.map