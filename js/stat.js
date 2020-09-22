'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const PADDING = 20;

const FONT_HEIGTH = 16;
const GAP = 10;

const BAR_WIDTH = 40;
const BAR_GAP = 50;
const DIAGRAM_HEIGHT = 150;
const BAR_HEIGHT_MAX = DIAGRAM_HEIGHT - FONT_HEIGTH - 2 * GAP;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function findMaxElement(arr) {
  let maxElement = arr[0];

  if (arr.length > 1) {
    arr.forEach((element) => {
      if (element > maxElement) {
        maxElement = element;
      }
    });
  }
  return maxElement;
}

function renderText(ctx, textString, x, y) {
  ctx.fillText(textString, x, y);
}

function renderBar(ctx, x, y, barHeight) {
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;

  renderText(ctx, `Ура вы победили!`, CLOUD_X + PADDING, CLOUD_Y + PADDING);
  renderText(ctx, `Список результатов:`, CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_HEIGTH + GAP);

  const maxTime = findMaxElement(times);

  names.forEach((name, index) => {
    renderText(
        ctx,
        name,
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index,
        CLOUD_Y + PADDING + DIAGRAM_HEIGHT + (FONT_HEIGTH + GAP) * 2
    );
  });

  times.forEach((time, index) => {
    if (names[index] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      let randomBlue = `hsla(240, 100%, 50%, ${Math.random()})`;
      ctx.fillStyle = randomBlue;
    }

    renderBar(
        ctx,
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index,
        CLOUD_Y + PADDING + DIAGRAM_HEIGHT + (FONT_HEIGTH + GAP) * 2 - FONT_HEIGTH - (time * BAR_HEIGHT_MAX / maxTime),
        time * BAR_HEIGHT_MAX / maxTime
    );

    ctx.fillStyle = `#000`;
    let timeRound = Math.round(time);
    renderText(
        ctx,
        timeRound,
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index,
        CLOUD_Y + PADDING + (FONT_HEIGTH + GAP) * 2 + BAR_HEIGHT_MAX * (1 - timeRound / maxTime)
    );
  });
};

