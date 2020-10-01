'use strict';

const WIZARDS_QUANTITY = 4;
const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`];

const WIZARD_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYES = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const wizards = [];
const setupNode = document.querySelector(`.setup`);
const setupOpenButton = document.querySelector(`.setup-open`);
const setupCloseButton = setupNode.querySelector(`.setup-close`);
const similarListElementNode = setupNode.querySelector(`.setup-similar-list`);
const setupSimilarNode = setupNode.querySelector(`.setup-similar`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const fragment = document.createDocumentFragment();

// случайное число в пределах [0; max)
function getRandom(max) {
  return Math.floor(Math.random() * (max));
}

// ---рендер магов---

function renderWizardsData(wizardsQuantity) {
  for (let i = 0; i < wizardsQuantity; i++) {
    wizards[i] = {
      name: WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ` ` + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length)],
      coatColor: WIZARD_COLORS[getRandom(WIZARD_COLORS.length)],
      eyesColor: WIZARD_EYES[getRandom(WIZARD_EYES.length)],
    };
  }
}

function renderWizard(wizard) {
  const wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}

// ---обработчики событий---

function onPopupEscPress(evt) {
  if (evt.key === `Escape`) {
    setupNode.classList.add(`hidden`);
  }
}

function openPopup() {
  setupNode.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
}

function closePopup(evt) {
  evt.preventDefault();
  setupNode.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
}


renderWizardsData(WIZARDS_QUANTITY);
wizards.forEach((item) => {
  fragment.appendChild(renderWizard(item));
});
similarListElementNode.appendChild(fragment);

setupNode.classList.remove(`hidden`);
setupSimilarNode.classList.remove(`hidden`);

setupOpenButton.addEventListener(`click`, openPopup);
setupCloseButton.addEventListener(`click`, closePopup);

