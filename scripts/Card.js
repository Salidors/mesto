class Card {
    constructor(text, image) {
      this._text = text;
      this._image = image;
    }
    _getTemplate() {
      //    HTML:     <template class="card-template">
      //   <div class="card">
      //     <img src="" alt="Аватар пользователя" class="card__avatar">
      //     <div class="card__text">
      //       <p class="card__paragraph"><!-- здесь будет текст сообщения --></p>
      //     </div>
      //   </div>
      // </template>
      const cardElement = document
        .querySelector('.card-template')
        .content.querySelector('.card')
        .cloneNode(true);
  
      // вернём DOM-элемент карточки
      return cardElement;
    }
  
    generateCard() {
      // Запишем разметку в приватное поле _element.
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      // Добавим данные
      this._element.querySelector('.card__avatar').src = this._image;
      this._element.querySelector('.card__paragraph').textContent = this._text;
  
      return this._element;
    }
  }
  
  const card = new Card('тексты', 'url');
  