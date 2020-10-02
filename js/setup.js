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

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const wizards = [];
const setupNode = document.querySelector(`.setup`);
const setupOpenButton = document.querySelector(`.setup-open`);
const setupCloseButton = setupNode.querySelector(`.setup-close`);
const userNameInput = setupNode.querySelector(`.setup-user-name`);
const similarListElementNode = setupNode.querySelector(`.setup-similar-list`);
const setupSimilarNode = setupNode.querySelector(`.setup-similar`);

// const fireballNode = setupNode.querySelector(`.setup-fireball-wrap`);
// const wizardNode = setupNode.querySelector(`.setup-wizard`);
// const wizardEyesNode = wizardNode.querySelector(`.wizard-eyes`);
// const wizardCoatNode = wizardNode.querySelector(`.wizard-coat`);

const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const fragment = document.createDocumentFragment();

const Wizard = {
  eyes: setupNode.querySelector(`.wizard-eyes`),
  coat: setupNode.querySelector(`.wizard-coat`),
  fireball: setupNode.querySelector(`.setup-fireball-wrap`),
};

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

function openPopup() {
  setupNode.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  Wizard.coat.addEventListener(`click`, changeCoatColor);
  Wizard.eyes.addEventListener(`click`, changeEyesColor);
  Wizard.fireball.addEventListener(`click`, changeFireballColor);
}

function closePopup(evt) {
  evt.preventDefault();
  setupNode.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  Wizard.coat.removeEventListener(`click`, changeCoatColor);
  Wizard.eyes.removeEventListener(`click`, changeEyesColor);
  Wizard.fireball.removeEventListener(`click`, changeFireballColor);
}

function getRandomColor(colorsArray) {
  return colorsArray[getRandom(colorsArray.length)];
}

function onPopupEscPress(evt) {
  if (evt.key === `Escape` && evt.target !== userNameInput) {
    setupNode.classList.add(`hidden`);
  }
}

// ---изменение цветов---

function changeColor(element, colors) {
  if (element.tagName.toLowerCase() === `div`) {
    element.style.background = getRandomColor(colors);
  } else {
    element.style.fill = getRandomColor(colors);
  }
}
function changeCoatColor() {
  changeColor(Wizard.coat, WIZARD_COLORS);
}
function changeEyesColor() {
  changeColor(Wizard.eyes, WIZARD_EYES);
}
function changeFireballColor() {
  changeColor(Wizard.fireball, FIREBALL_COLORS);
}

// ---валидация формы---


renderWizardsData(WIZARDS_QUANTITY);
wizards.forEach((item) => {
  fragment.appendChild(renderWizard(item));
});
similarListElementNode.appendChild(fragment);

setupSimilarNode.classList.remove(`hidden`);
// setupNode.classList.remove(`hidden`);

setupOpenButton.addEventListener(`click`, openPopup);
setupCloseButton.addEventListener(`click`, closePopup);

