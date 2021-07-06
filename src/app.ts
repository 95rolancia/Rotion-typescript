import Header from "./components/header.js";
import Modal from "./components/modal.js";
import Items from "./components/items.js";

type State = {
  items: Item[];
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

export default class App {
  state: State;
  main: HTMLElement;
  header: Header;
  modal: Modal;
  items: Items;

  constructor(private root: HTMLElement) {
    this.state = {
      items: [],
    };

    this.main = document.createElement("section");
    this.main.setAttribute("class", "main");
    this.root.appendChild(this.main);

    this.header = new Header({
      main: this.main,
      onModalOpenClick: (type: ItemType) => this.onModalOpenClick(type),
    });

    this.modal = new Modal({
      root: this.root,
      onAddItem: (item: Item) => this.onAddItem(item),
    });

    this.items = new Items({
      main: this.main,
      initialState: this.state,
    });
  }

  setState(nextState: State) {
    this.state = nextState;
    this.items.setState(this.state);
  }

  onModalOpenClick(type: ItemType) {
    this.modal.changeModalType(type);
    this.modal.onModalOpenClick();
  }

  onAddItem(item: Item) {
    const items = [
      ...this.state.items,
      {
        ...item,
      },
    ];
    const nextState = { ...this.state, items };
    this.setState(nextState);
  }
}
