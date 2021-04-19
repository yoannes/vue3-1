export default class Carrossel {
  constructor(obj) {
    this._els = [];
    this._dots = [];
    this._current = 0;
    this._imgContainer = document.createElement('div');
    this._moveLeft = document.createElement('div');
    this._moveRight = document.createElement('div');
    this._dotsContainer = document.createElement('div');
    this._svgIcons();

    this._imgContainer.classList.add('__carrossel-img-container');

    if (obj.images) {
      this.images = obj.images;
    }

    if (obj.el) {
      this.el = obj.el;
      this.el.classList.add('__carrossel-container');
    }

    if (obj.el && obj.images && obj.images.length) {
      this.createElements();

      if (obj.images.length > 1) {
        this.el.appendChild(this._moveLeft);
      }

      this.el.appendChild(this._imgContainer);

      if (obj.images.length > 1) {
        this.el.appendChild(this._moveRight);
      }

      this.renderImages();
      this.showImage();
    }
  }

  renderImages() {
    for (let i = 0; i < this.images.length; i++) {
      const imgUrl = this.images[i];
      const imgEl = this.createImgElement(i, imgUrl);
      this._imgContainer.appendChild(imgEl);
    }
  }

  createImgElement(idx, imgUrl) {
    const el = document.createElement('img');
    el.src = imgUrl;
    el.classList.add('__carrossel-img');
    el.style.display = 'none';

    const existsIndex = this._els.findIndex((x) => x === imgUrl);
    if (existsIndex > -1) {
      this._els[existsIndex] = el;
    } else {
      this._els.push(el);
    }

    // Create the dot
    const dotEl = document.createElement('div');
    dotEl.style.width = '10px';
    dotEl.style.height = '10px';
    dotEl.style.border = '1px solid black';
    dotEl.style.background = 'black';
    this._dots.push(dotEl);

    return el;
  }

  createElements() {
    this._moveLeft.appendChild(this._chevronLeft);
    this._moveLeft.classList.add('__carrossel-move-left');
    this._moveLeft.onclick = () => {
      this._current--;

      if (this._current < 0) {
        this._current = this.images.length - 1;
      }

      this.showImage();
    };

    this._moveRight.appendChild(this._chevronRight);
    this._moveRight.classList.add('__carrossel-move-right');
    this._moveRight.onclick = () => {
      this._current++;

      if (this._current > this.images.length - 1) {
        this._current = 0;
      }

      this.showImage();
    };
  }

  _svgIcons() {
    // Cria chevron esquerda
    this._chevronLeft = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._chevronLeft.setAttributeNS(null, 'style', 'width:24px;height:24px');
    this._chevronLeft.setAttributeNS(null, 'viewBox', '0 0 24 24');

    const chevronLeftPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronLeftPath.setAttributeNS(null, 'fill', 'currentColor');
    chevronLeftPath.setAttributeNS(
      null,
      'd',
      'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
    );
    this._chevronLeft.appendChild(chevronLeftPath);

    // Cria chevron direita
    this._chevronRight = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._chevronRight.setAttributeNS(null, 'style', 'width:24px;height:24px');
    this._chevronRight.setAttributeNS(null, 'viewBox', '0 0 24 24');

    const chevronRightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronRightPath.setAttributeNS(null, 'fill', 'currentColor');
    chevronRightPath.setAttributeNS(
      null,
      'd',
      'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
    );
    this._chevronRight.appendChild(chevronRightPath);
  }

  showImage() {
    // 1. Esconde todas as imagens
    for (let i = 0; i < this._els.length; i++) {
      const img = this._els[i];
      img.style.display = 'none';
    }

    // 2. Mostra a imagem correta
    this._els[this._current].style.display = 'block';
  }
}
