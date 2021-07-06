const btnTypes = ["IMAGE", "VIDEO", "NOTE", "TASK"];

type props = {
  header: HTMLElement;
  onModalOpenClick: (type: ItemType) => void;
};

type ItemType = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

export default class Navbar {
  ul: HTMLUListElement;

  constructor({ header, onModalOpenClick }: props) {
    this.ul = document.createElement("ul");
    this.ul.setAttribute("class", "menus");

    btnTypes.forEach((type: string) => {
      const li = document.createElement("li");
      li.setAttribute("class", "menu");

      const newBtn = document.createElement("button");
      newBtn.textContent = type;
      newBtn.addEventListener("click", () => {
        onModalOpenClick(newBtn.textContent! as ItemType);
      });

      li.appendChild(newBtn);
      this.ul.appendChild(li);
    });
    header.appendChild(this.ul);
  }
}
