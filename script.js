const App = {
  $: {
    navMenuElement: document.querySelector('.nav_menu'),
    navCloseMenuElement: document.querySelector('.nav_close_menu'),
    navMenuListElement: document.querySelector('.nav_menu_list'),
    mastercraftBtnEl: document.querySelector('#mastercraft__btn'),
    selectionModalEl: document.querySelector('#selection__modal'),
    successModalEl: document.querySelector('#success__modal'),
    selectionOverlayEl: document.querySelector('#selection_modal__overlay'),
    successOverlayEl: document.querySelector('#success_modal__overlay'),
    closeModalEl: document.querySelector('#close__modal'),
    navElement: document.querySelector('nav'),
    inputSelectedEl: document.querySelectorAll('input[type="radio"]'),
    navMenuListElement: document.querySelector('.nav_menu_list'),
    bookmarkBtnEl: document.querySelector('#bookmark__btn'),
    pledgeInputEl: document.querySelectorAll('input[type="number"]'),
    continuePledgeBtn: document.querySelectorAll('.continue__btn'),
    successBtn: document.querySelector('#success__button')
  },

  toggleNavElements: () => {
    App.$.navMenuListElement.classList.toggle('hidden');
    App.$.navCloseMenuElement.classList.toggle('hidden');
    App.$.navMenuElement.classList.toggle('hidden');
    App.$.navElement.classList.toggle('full-screen');
  },

  toggleShowSelectionModal: () => {
    App.hideMenu();
    App.$.selectionOverlayEl.classList.toggle('hidden');

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto"
    }
    else {
      document.body.style.overflow = "hidden"
    }

    App.$.selectionModalEl.classList.toggle('hidden');
  },

  toggleInputElements: () => {
    App.$.inputSelectedEl.forEach((e) => {
      let ps = e.parentElement.nextElementSibling;
      let pp = e.parentElement.parentElement
      if (e.checked) {
        pp.classList.add('selected');
        ps?.classList.remove('hidden');
      }
      else {
        pp.classList.remove('selected');
        ps?.classList.add('hidden');
      }
    }
    )
  },

  hideMenu: function () {
    App.$.navCloseMenuElement.classList.add('hidden');
    App.$.navMenuElement.classList.remove('hidden');
    App.$.navMenuListElement.classList.add('hidden');
  },

  toggleSuccessModal: function () {
    App.$.successModalEl.classList.toggle('hidden');
    App.$.successOverlayEl.classList.toggle('hidden');
  },

  showSuccessModal: function () {
    App.toggleShowSelectionModal();
    App.toggleSuccessModal();
  },

  closeSuccessModal: function () {
    App.toggleSuccessModal();
  },

  init: function () {
    App.$.navMenuElement.addEventListener('click', App.toggleNavElements)
    App.$.navCloseMenuElement.addEventListener('click', App.toggleNavElements)

    App.$.mastercraftBtnEl.addEventListener('click', App.toggleShowSelectionModal)
    App.$.closeModalEl.addEventListener('click', App.toggleShowSelectionModal)
    App.toggleInputElements();

    App.$.inputSelectedEl.forEach((e) => {
      e.addEventListener('input', () => {
        App.toggleInputElements();
      })
    })

    App.$.bookmarkBtnEl.dataset.bookmarked = "false"

    App.$.bookmarkBtnEl.addEventListener('click', () => {
      let isBookmarked =
        App.$.bookmarkBtnEl.dataset.bookmarked;

      if (isBookmarked == "true") {
        App.$.bookmarkBtnEl.dataset.bookmarked = "false";
        App.$.bookmarkBtnEl.children[1].textContent = "Bookmark"
      }
      else {
        App.$.bookmarkBtnEl.children[1].textContent = "Bookmarked";
        App.$.bookmarkBtnEl.dataset.bookmarked = "true";
      }
    })


    App.$.pledgeInputEl.forEach(e => {
      e.oninput = () => {

        let text = e.value;

        if (+text && +text >= +e.min && +text <= +e.max) {
          e.nextElementSibling.children[0].textContent = text;
        }
      }
    })

    App.$.continuePledgeBtn.forEach(e => {

      e.addEventListener('click', () => {
        App.showSuccessModal();
        document.body.style.overflowY = "hidden"
      })

      App.$.successBtn.addEventListener('click', () => {
        App.closeSuccessModal();
        document.body.style.overflowY = "auto"
      })

    })
  }
};

window.addEventListener('load', App.init);