// ============= создание карточек
export default class Card {
    constructor(data, templateSelector) {
        this._text = data.text;
        this._image = data.image;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector).content
        .querySelector(".card").cloneNode(true);

        return cardElement;
    }

generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
    this._element.querySelector('.item__text').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.item__text').addEventListener('click', () => {
      this._handleMessageClick();
    });
  }

  _handleMessageClick() {
    this._element.querySelector('.item__text').classList.toggle('item__text_is-active');
  }
}

initialCards.forEach((item) => {
    const card = new Card(item, '.card-template_type_default');
    const cardElement = card.generateCard();

//===========добавить в DOM
document.querySelector('.list__item').append(cardElement);
});


class TododList {
#container;
constructor(data, todoList) {
    this._onDelete = this._onDelete.bind(this); // привязываю контекст 
  }

  _onDelete () {
    if (this.#card) {
      this.#card.remove();
    }
  }

  // использую функцию с уже привязанным контекстом и он ссылается всегда на объект класса
  #setListeners = () => {
    this.#card.querySelector('.todolist-item__del')
    .addEventListener('click', this._onDelete); 
  }
}

// class TododList {
// #container;
//     constructor(containerSelector) {
//         this.#container = document.querySelector(containerSelector);
//     }
//     addCard(card) {
//         this.#conteiner.append(card);
//     }
// }

// class TododListItem {
//     constructor(data) {
//             this.#data = data;
//     }

//      #onDelete = () => {
//         this.#card.remove();
//     }

//     #onCopy = () => {
//         const card = new todoListItem(this.#data)
//         const todoLost = new todoListItem('#todoList');
//         todoListItem.addCard(card)
//     }

//     #createCard () {
//         this.#card = this.template.cloneNode(true).children[0];
//         this.#createCard.querySelector('.todoList-item__text').textContent = this.#data.text;
//         this.#createCard.querySelector('.todoList-item__del').addEventListener('click', this.#onDelete); 
//     }

//     getCard () {
//         this.#createCard
//         return this.#card;
//     }
// }
//  const tododList = new TododList('#tododList')
//  const todoListItem = new TododListItem({text: "Имя карты"})
//  const card = todoListItem.getCard();
//   tododList.addCard(); 