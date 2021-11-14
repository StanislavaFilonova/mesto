export default class Section {
    constructor ({items, renderer}, containerSelector) {
        this._items = items; //Вопрос: должна ли я давать название точное по проекту этому массиву? 
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector); //Здесь я должна дать название контейнеру, как у меня в проекте? 
    }
  
    addItem(element) {
      this._container.append(element);
    };

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
      }
}