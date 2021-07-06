type props = {
  main: HTMLElement;
  initialState: State;
};

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

type DragTarget = {
  id: string;
  element: HTMLElement;
  index: number;
};

type ItemType = "IMAGE" | "VIDEO" | "NOTE" | "TASK";

export default class Items {
  state: State;
  itemList: HTMLUListElement;

  constructor({ main, initialState }: props) {
    this.state = initialState;

    this.itemList = document.createElement("ul");
    this.itemList.className = "item-list";
    main.appendChild(this.itemList);

    this.render();
  }

  handleStartDraggingEvent(ev: DragEvent) {
    const target = ev.target as HTMLElement;
    console.log("[DRAG]" + target.id);
    target.classList.add("dragging");

    const dataTransfer = ev.dataTransfer;
    if (dataTransfer == null) {
      console.error("dataTransfer was null");
      return;
    }
    dataTransfer.setData("text/plain", target.id);
  }

  handleDraggingEnterEvent(ev: DragEvent) {
    const target = ev.target as HTMLElement;
    if (target.id === ev.dataTransfer!.getData("text/plain")) {
      return;
    }
    if (target?.classList == null) {
      console.log(target);
      return;
    }
    console.log(`handle dragging enter ${target}`);
    target.classList.add("drop_over");
  }

  handleDraggingExitEvent(ev: Event) {
    console.log(`dargging exit `);
    const target = ev.target as HTMLElement;
    if (target?.classList == null) {
      return;
    }
    console.log(`dargging exit ${target}`);
    target.classList.remove("drop_over");
  }

  handleDraggingOverEvent(ev: Event) {
    ev.preventDefault();
  }

  handleDropEndEvent(ev: Event) {
    const target = ev.target as HTMLElement;
    if (target?.classList == null) {
      return;
    }
    target.classList.remove("dragging");
    if (target.classList.contains("drop_over")) {
      target.classList.remove("drop_over");
    }
  }

  handleDroppingEvent(ev: DragEvent) {
    const target = ev.target as HTMLElement;
    if (target.classList.contains("drop_over")) {
      target.classList.remove("drop_over");
    }

    console.log("[DROP]" + target.id);
    const dragTargetId = ev.dataTransfer!.getData("text/plain");
    const dropped = this.state.items.filter((t) => t.id === target.id)[0];
    const dragged = this.state.items.filter((t) => t.id == dragTargetId)[0];

    if (dropped == null || dragged == null) return;
    const droppedIndex = dropped.index;
    dropped.index = dragged.index;
    dragged.index = droppedIndex;
    this.updateElements();
    ev.preventDefault();
  }

  updateElements() {
    for (let i = this.itemList.children.length - 1; i >= 0; i--) {
      this.itemList.removeChild(this.itemList.children[i]);
    }

    for (const target of this.state.items.sort((a, b) => a.index - b.index)) {
      this.itemList.appendChild(target.element);
    }
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.itemList.innerHTML = "";

    this.state.items.forEach((item, idx) => {
      const li = item.element;
      li.innerHTML = "";
      li.ondragstart = (ev) => this.handleStartDraggingEvent(ev);
      li.ondragover = (ev) => this.handleDraggingOverEvent(ev);
      li.ondragenter = (ev) => this.handleDraggingEnterEvent(ev);
      li.ondragleave = (ev) => this.handleDraggingExitEvent(ev);
      li.ondrop = (ev) => this.handleDroppingEvent(ev);
      li.ondragend = (ev) => this.handleDropEndEvent(ev);

      switch (item.type) {
        case "IMAGE":
          if (item.url === undefined) break;
          const img = document.createElement("img");
          img.setAttribute("src", item.url);
          li.appendChild(img);
          break;
        case "VIDEO":
          if (item.url === undefined) break;
          const video = document.createElement("video");
          video.setAttribute("controls", "true");
          video.innerHTML = `
            <source src="${item.url}">
          `;
          li.appendChild(video);
      }

      const desc = document.createElement("span");
      desc.textContent = item.desc;
      li.appendChild(desc);
      this.itemList.appendChild(li);
    });
  }
}
