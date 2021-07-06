type props = {
  root: HTMLElement;
  onAddItem: (item: Item) => void;
};

type Item = {
  id: string;
  element: HTMLElement;
  index: number;
  type: ItemType;
  title: string;
  url?: string;
  desc: string;
};

type ItemType = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

export default class Modal {
  modalType: ItemType;
  modal: HTMLDivElement;
  modalOverlay: HTMLDivElement;
  modalContainer: HTMLDivElement;
  modalTitle: HTMLHeadingElement;
  modalForm: HTMLFormElement;
  modalCloseBtn: HTMLButtonElement;
  modalSubmit: HTMLButtonElement;
  modalInputTitle: HTMLInputElement;
  modalInputDesc: HTMLInputElement;

  constructor({ root, onAddItem }: props) {
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

    let cnt = 0;
    this.modalSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const element = document.createElement("li");
      element.setAttribute("class", "item draggable_item");
      element.setAttribute("draggable", "true");
      element.setAttribute("id", cnt.toString());

      const newItem = {
        id: (cnt++).toString(),
        element: element,
        index: cnt,
        title: this.modalInputTitle.value,
        type: this.modalType,
        desc: "",
        url: "",
      };

      switch (this.modalType) {
        case "IMAGE":
        case "VIDEO":
          newItem.url = this.modalInputDesc.value;
          break;
        case "NOTE":
        case "TASK":
          newItem.desc = this.modalInputDesc.value;
          break;
      }

      onAddItem(newItem);

      this.modalForm.reset();
      this.onModalCloseClick();
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

    this.modalCloseBtn.addEventListener("click", () => {
      this.onModalCloseClick();
    });

    this.modal.appendChild(this.modalOverlay);
    this.modal.appendChild(this.modalContainer);

    root.appendChild(this.modal);
  }

  onModalOpenClick() {
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
  }

  onModalCloseClick() {
    this.modal.className = "modal";
  }

  changeModalType(type: ItemType) {
    this.modalType = type;
  }
}
