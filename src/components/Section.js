export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(evt) {
    this._container.append(evt);
  }

  addCardItem(evt) {
    this._container.prepend(evt);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
