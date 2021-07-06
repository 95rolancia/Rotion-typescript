import Navbar from "./navbar.js";

type props = {
  main: HTMLElement;
  onModalOpenClick: (type: ItemType) => void;
};

type ItemType = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

export default class Header {
  header: HTMLElement;
  title: HTMLHeadingElement;
  navbar: Navbar;

  constructor({ main, onModalOpenClick }: props) {
    this.header = document.createElement("header");
    this.header.setAttribute("class", "header");

    this.title = document.createElement("h1");
    this.title.setAttribute("class", "title");
    this.title.textContent = "Rotion";

    this.header.appendChild(this.title);

    this.navbar = new Navbar({
      header: this.header,
      onModalOpenClick: (type: ItemType) => onModalOpenClick(type),
    });

    main.appendChild(this.header);
  }
}
