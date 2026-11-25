/**
 * Wireframes of eDrama's screens, drawn until a real screenshot is saved.
 *
 * Every shape is a box in percent of the screen: x and y are its top-left
 * corner, w and h its size. A page's numbered markers use the same percent
 * grid, so they point at the right part of the wireframe and, once the real
 * screenshot replaces it, at the same part of the real screen.
 *
 * Browser screens are 16:10 (1600 × 1000). Phone screens are 9:19.5
 * (1080 × 2340). On a phone, a circle of width d needs a height of d / 2.1667.
 */

const r = (x, y, w, h, k, extra = {}) => ({x, y, w, h, k, ...extra});

/* ------------------------------------------------------------------ */
/* Admin Panel and Creator Portal frame                                */
/* ------------------------------------------------------------------ */

function panelChrome(activeNav = 2) {
  const out = [
    r(0, 0, 17, 100, 'side'),
    r(2, 2.4, 11, 4.2, 'logo'),
    r(17, 0, 83, 8, 'top'),
    r(19, 3.2, 13, 1.6, 'line'),
    r(41, 1.9, 24, 4.2, 'pill'),
    r(68, 1.9, 8, 4.2, 'pill'),
    r(78, 1.92, 2.6, 4.16, 'circle'),
    r(82, 1.92, 2.6, 4.16, 'circle'),
    r(86, 1.92, 2.6, 4.16, 'circle'),
    r(92, 1.92, 2.6, 4.16, 'avatar'),
    r(2, 92, 2.6, 4.16, 'avatar'),
    r(5.4, 93, 8, 1.4, 'line'),
    r(5.4, 95.4, 5, 1.1, 'faint'),
  ];
  const headings = new Set([0, 3, 9, 12, 16]);
  for (let i = 0; i < 19; i += 1) {
    const y = 10 + i * 4.3;
    if (headings.has(i)) {
      out.push(r(2.4, y + 1.2, 6, 1.1, 'faint'));
    } else if (i === activeNav) {
      out.push(r(1.4, y, 14.2, 3.6, 'navActive'));
    } else {
      out.push(r(2.4, y + 1.1, 1.4, 1.4, 'dot'), r(4.8, y + 1.15, 7 + ((i * 3) % 4), 1.3, 'line'));
    }
  }
  return out;
}

function pageHeader({actions = 2} = {}) {
  const out = [r(19, 11, 21, 3.4, 'title'), r(19, 16, 36, 1.5, 'line')];
  if (actions >= 1) out.push(r(88.5, 11.8, 9.5, 4.6, 'accent'));
  if (actions >= 2) out.push(r(79, 11.8, 8.5, 4.6, 'ghost'));
  if (actions >= 3) out.push(r(69.5, 11.8, 8.5, 4.6, 'ghost'));
  return out;
}

function tableRows(x, y, w, h, rowH = 5.4, {thumb = true} = {}) {
  const out = [r(x, y, w, h, 'card'), r(x, y, w, 4.8, 'thead')];
  for (let ty = y + 1.7, i = 0; i < 6; i += 1) out.push(r(x + 1.5 + i * (w / 6), ty, w / 12, 1.2, 'faint'));
  for (let ry = y + 6, i = 0; ry + rowH <= y + h; ry += rowH, i += 1) {
    if (thumb) out.push(r(x + 1.4, ry + 0.7, 2.1, 4, 'img'));
    out.push(r(x + (thumb ? 4.4 : 1.6), ry + 1.2, w * 0.2, 1.4, 'line'));
    out.push(r(x + (thumb ? 4.4 : 1.6), ry + 3.1, w * 0.12, 1, 'faint'));
    out.push(r(x + w * 0.38, ry + 1.6, w * 0.08, 2.2, i % 3 === 0 ? 'pillLive' : 'pillMuted'));
    out.push(r(x + w * 0.52, ry + 1.9, w * 0.08, 1.2, 'line'));
    out.push(r(x + w * 0.66, ry + 1.9, w * 0.07, 1.2, 'line'));
    out.push(r(x + w * 0.8, ry + 1.9, w * 0.08, 1.2, 'line'));
    out.push(r(x, ry + rowH - 0.1, w, 0.1, 'rule'));
  }
  return out;
}

function statCards(y, n = 5, h = 9, x0 = 19, x1 = 98) {
  const gap = 0.9;
  const w = (x1 - x0 - gap * (n - 1)) / n;
  const out = [];
  for (let i = 0; i < n; i += 1) {
    const x = x0 + i * (w + gap);
    out.push(r(x, y, w, h, i === 0 ? 'cardActive' : 'card'), r(x + 1.2, y + 1.6, w * 0.45, 1.2, 'faint'), r(x + 1.2, y + 4, w * 0.3, 2.8, 'title'));
  }
  return out;
}

function fieldBlock(x, y, w, rows = 3) {
  const out = [];
  for (let i = 0; i < rows; i += 1) {
    const fy = y + i * 7.2;
    out.push(r(x, fy, w * 0.25, 1.2, 'faint'), r(x, fy + 2, w, 4, 'input'));
  }
  return out;
}

const WIRES = {
  dashboard: () => [
    ...panelChrome(1),
    r(19, 11, 0, 0, 'none'),
    r(19, 10.5, 79, 16, 'hero'),
    r(21, 13.5, 26, 3.4, 'titleLight'),
    r(21, 18.4, 32, 1.4, 'lineLight'),
    r(21, 21.5, 7, 3.2, 'chip'),
    r(29, 21.5, 7, 3.2, 'chip'),
    r(37, 21.5, 7, 3.2, 'chip'),
    r(45, 21.5, 7, 3.2, 'chip'),
    r(53, 21.5, 7, 3.2, 'chip'),
    r(83, 13, 13, 3.8, 'segment'),
    r(86, 19, 10, 1.2, 'lineLight'),
    ...statCards(29.5, 4, 12),
    r(19, 44.5, 47, 30, 'card'),
    r(20.8, 46.5, 14, 1.6, 'line'),
    r(20.8, 50, 43, 22, 'chart'),
    r(67.5, 44.5, 30.5, 30, 'card'),
    r(69.3, 46.5, 12, 1.6, 'line'),
    r(70, 51.5, 11, 17.6, 'donut'),
    r(84, 53, 11, 1.2, 'line'),
    r(84, 57, 9, 1.2, 'line'),
    r(84, 61, 10, 1.2, 'line'),
    r(84, 65, 7, 1.2, 'line'),
    r(19, 77, 47, 21, 'card'),
    r(20.8, 79, 12, 1.6, 'line'),
    ...[83, 87.5, 92].flatMap((y, i) => [r(20.8, y, 1.6, 2.4, 'faint'), r(23.5, y - 0.6, 2.4, 3.8, 'img'), r(27, y, 16 - i * 2, 1.3, 'line'), r(58, y, 6, 1.3, 'coin')]),
    r(67.5, 77, 30.5, 21, 'card'),
    r(69.3, 79, 12, 1.6, 'line'),
    ...[83, 87.5, 92].flatMap((y) => [r(69.3, y - 0.2, 1.8, 2.8, 'warnDot'), r(72.3, y, 18, 1.3, 'line')]),
  ],

  list: () => [
    ...panelChrome(3),
    ...pageHeader({actions: 2}),
    ...statCards(21),
    ...[19, 25.5, 32, 38.5, 45].map((x, i) => r(x, 32.5, 5.8, 3.6, i === 0 ? 'tabActive' : 'tab')),
    r(19, 38.6, 22, 4.4, 'pill'),
    r(42.5, 38.6, 7, 4.4, 'ghost'),
    r(84.5, 38.6, 2.6, 4.16, 'circle'),
    r(88, 38.6, 10, 4.4, 'ghost'),
    ...tableRows(19, 45.5, 79, 52),
  ],

  editor: () => [
    ...panelChrome(3),
    r(19, 10.5, 3.6, 6.4, 'img'),
    r(23.8, 11, 20, 3.2, 'title'),
    r(23.8, 15.4, 10, 1.4, 'faint'),
    r(35, 15.2, 6, 1.9, 'pillLive'),
    r(69.5, 11.6, 8.5, 4.6, 'ghost'),
    r(79, 11.6, 8.5, 4.6, 'ghost'),
    r(88.5, 11.6, 9.5, 4.6, 'accent'),
    ...statCards(20, 6, 7.5),
    ...[19, 27, 35.6, 46].map((x, i) => r(x, 30.6, i === 3 ? 9 : 7.6, 3.6, i === 0 ? 'underlineActive' : 'underline')),
    r(19, 34.8, 79, 0.15, 'rule'),
    r(19, 37, 49, 27, 'card'),
    r(20.8, 39, 10, 1.7, 'line'),
    ...fieldBlock(20.8, 42.5, 45.4, 3),
    r(19, 66, 49, 25.5, 'card'),
    r(20.8, 68, 10, 1.7, 'line'),
    r(20.8, 71.5, 9, 18, 'img'),
    r(31.5, 71.5, 22, 12.4, 'img'),
    r(70, 37, 28, 24, 'card'),
    r(71.8, 39, 12, 1.7, 'line'),
    ...fieldBlock(71.8, 42.5, 24.4, 2),
    r(71.8, 56.6, 18, 1.2, 'faint'),
    r(70, 63, 28, 28.5, 'card'),
    r(71.8, 65, 9, 1.7, 'line'),
    ...[69.5, 74.5, 79.5, 84.5].flatMap((y, i) => [r(72.2, y, 1.4, 2.24, i === 0 ? 'accentDot' : 'dot'), r(75, y + 0.3, 14, 1.2, 'line')]),
    r(19, 93.2, 79, 5.4, 'savebar'),
    r(21, 95.2, 20, 1.3, 'faint'),
    r(88.4, 93.9, 9, 4, 'accent'),
  ],

  form: () => [
    ...panelChrome(15),
    ...pageHeader({actions: 0}),
    r(19, 21, 15, 76, 'card'),
    ...Array.from({length: 14}, (_, i) =>
      i === 0 || i === 4 || i === 8 || i === 11
        ? r(20.6, 23.5 + i * 5, 6, 1.1, 'faint')
        : r(20, 22.7 + i * 5, 13, 3.2, i === 2 ? 'navActive' : 'navItem'),
    ),
    r(36, 21, 62, 34, 'card'),
    r(38, 23.2, 14, 1.9, 'line'),
    r(38, 26.4, 30, 1.2, 'faint'),
    ...fieldBlock(38, 30, 27.5, 3),
    ...fieldBlock(68.5, 30, 27.5, 3),
    r(36, 57, 62, 33, 'card'),
    r(38, 59.2, 16, 1.9, 'line'),
    ...[64, 70, 76, 82].flatMap((y) => [r(38, y, 22, 1.4, 'line'), r(38, y + 2.3, 34, 1.1, 'faint'), r(91, y, 4.4, 2.8, 'switchOn')]),
    r(36, 92, 62, 6, 'savebar'),
    r(38, 94.4, 18, 1.3, 'faint'),
    r(88, 92.9, 8.5, 4.2, 'accent'),
  ],

  split: () => [
    ...panelChrome(10),
    ...pageHeader({actions: 0}),
    ...statCards(20.5, 4, 8, 19, 98),
    ...[19, 26, 33].map((x, i) => r(x, 31.5, 6.4, 3.6, i === 0 ? 'tabActive' : 'tab')),
    ...[42, 48.5, 55, 61.5].map((x) => r(x, 31.5, 6, 3.6, 'chip')),
    r(19, 37.5, 31, 60, 'card'),
    ...[39, 48, 57, 66, 75, 84].flatMap((y, i) => [
      r(19.6, y, 29.8, 8.4, i === 0 ? 'rowActive' : 'none'),
      r(21, y + 1.4, 2.6, 4.6, 'img'),
      r(24.6, y + 1.6, 14, 1.4, 'line'),
      r(24.6, y + 4.2, 9, 1.1, 'faint'),
      r(43, y + 1.6, 5.4, 2.2, i < 2 ? 'pillWarn' : 'pillMuted'),
    ]),
    r(51.5, 37.5, 46.5, 41, 'card'),
    r(53.5, 40, 11.5, 35, 'video'),
    r(67, 40.5, 20, 2.6, 'title'),
    r(67, 45, 14, 1.3, 'faint'),
    ...[50, 54, 58, 62, 66, 70].map((y, i) => r(67, y, i % 2 ? 22 : 28, 1.2, 'line')),
    r(51.5, 80.5, 46.5, 17, 'card'),
    r(53.5, 83, 12, 1.6, 'line'),
    r(53.5, 86.5, 26, 1.2, 'faint'),
    r(53.5, 91, 13, 4.6, 'accent'),
    r(67.5, 91, 14, 4.6, 'ghost'),
    r(82.5, 91, 9, 4.6, 'danger'),
  ],

  builder: () => [
    ...panelChrome(7),
    ...pageHeader({actions: 2}),
    r(19, 21, 46, 76.5, 'card'),
    r(21, 23.5, 12, 1.8, 'line'),
    r(54, 23, 9, 3.4, 'ghost'),
    ...[29, 37.5, 46, 54.5, 63, 71.5, 80].flatMap((y, i) => [
      r(20.5, y, 43, 7.6, i === 1 ? 'rowActive' : 'rowCard'),
      r(21.8, y + 2.6, 1, 2.6, 'grip'),
      r(23.8, y + 1.7, 2.6, 4.16, 'iconTile'),
      r(27.8, y + 1.8, 15, 1.5, 'line'),
      r(27.8, y + 4.4, 10, 1.1, 'faint'),
      r(57.5, y + 2.4, 4.4, 2.8, i === 5 ? 'switchOff' : 'switchOn'),
    ]),
    r(70, 20, 23, 78, 'phoneOutline'),
    r(72, 24, 19, 1.6, 'line'),
    r(72, 27.5, 19, 16, 'img'),
    r(72, 45.5, 4, 2, 'chip'),
    r(77, 45.5, 4, 2, 'chip'),
    r(82, 45.5, 4, 2, 'chip'),
    r(72, 50, 9, 1.3, 'line'),
    r(72, 53, 5.5, 10, 'img'),
    r(78.2, 53, 5.5, 10, 'img'),
    r(84.4, 53, 5.5, 10, 'img'),
    r(72, 66, 9, 1.3, 'line'),
    r(72, 69, 5.5, 10, 'img'),
    r(78.2, 69, 5.5, 10, 'img'),
    r(84.4, 69, 5.5, 10, 'img'),
    r(72, 82, 19, 5.5, 'cardActive'),
    r(71, 91, 21, 0.15, 'rule'),
  ],

  calendar: () => [
    ...panelChrome(6),
    ...pageHeader({actions: 2}),
    r(19, 21.3, 2.6, 4.16, 'circle'),
    r(22.6, 21.3, 2.6, 4.16, 'circle'),
    r(26.8, 22.4, 14, 2, 'title'),
    r(70, 21.3, 12, 4.2, 'ghost'),
    r(83.5, 21.3, 14.5, 4.2, 'pill'),
    r(19, 28, 79, 51, 'card'),
    ...Array.from({length: 7}, (_, i) => r(20 + i * 11.2, 30, 6, 1.4, i === 2 ? 'accentLine' : 'faint')),
    ...Array.from({length: 6}, (_, i) => r(19, 34 + i * 7.4, 79, 0.12, 'rule')),
    ...[
      [20.5, 36, 'event'], [31.7, 36, 'event'], [42.9, 43.4, 'eventWarn'], [42.9, 47.6, 'eventWarn'], [54.1, 50.8, 'event'],
      [65.3, 36, 'event'], [76.5, 58.2, 'event'], [87.7, 43.4, 'event'], [20.5, 65.6, 'eventDone'], [31.7, 58.2, 'event'],
    ].map(([x, y, k]) => r(x, y, 9.4, 5.2, k)),
    r(19, 81.5, 47, 16, 'card'),
    r(20.8, 83.4, 14, 1.6, 'line'),
    ...[87.5, 92].flatMap((y) => [r(20.8, y, 2.4, 3.8, 'img'), r(24.2, y + 0.6, 18, 1.3, 'line'), r(58.5, y, 6, 3, 'ghost')]),
    r(67.5, 81.5, 30.5, 16, 'card'),
    r(69.3, 83.4, 10, 1.6, 'line'),
    ...[87, 90.5, 94].map((y) => r(69.3, y, 26, 1.2, 'line')),
  ],

  upload: () => [
    ...panelChrome(4),
    ...pageHeader({actions: 3}),
    r(19, 21, 48, 20, 'dropzone'),
    r(38.5, 24.5, 9, 7.2, 'iconTile'),
    r(31, 33.5, 24, 1.5, 'line'),
    r(37, 36.6, 12, 3.4, 'accent'),
    r(19, 43, 48, 18, 'card'),
    ...[45.5, 50.5, 55.5].flatMap((y, i) => [r(20.8, y, 2, 3.6, 'img'), r(24, y + 0.4, 14, 1.3, 'line'), r(40, y + 0.2, 10, 2.4, 'pill'), r(52, y + 1.2, 13 - i * 4, 0.9, 'progress')]),
    r(69, 21, 29, 19, 'card'),
    r(70.8, 23, 12, 1.6, 'line'),
    ...[27.5, 31.5, 35.5].map((y) => r(70.8, y, 24, 1.2, 'line')),
    r(69, 42, 29, 19, 'card'),
    r(70.8, 44, 9, 1.6, 'line'),
    ...[48.5, 52.5, 56.5].map((y) => r(70.8, y, 24, 1.2, 'line')),
    r(19, 63.5, 79, 34, 'card'),
    r(20.8, 65.5, 9, 1.8, 'line'),
    ...statCards(69, 4, 7, 20.8, 96.2),
    ...[79, 84.5, 90].flatMap((y, i) => [
      r(20.8, y, 2, 3.6, 'img'),
      r(24, y + 0.4, 15, 1.3, 'line'),
      r(45, y + 0.9, 24, 1.1, 'stages'),
      r(73, y + 0.2, 7, 2.4, i === 1 ? 'pillWarn' : 'pillLive'),
      r(84, y + 0.2, 7, 2.6, 'ghost'),
    ]),
  ],

  auth: () => [
    r(0, 0, 57, 100, 'stage'),
    r(4, 7, 9, 4, 'logoLight'),
    r(4, 70, 34, 5, 'serifLight'),
    r(4, 77, 26, 1.6, 'lineLight'),
    r(4, 83, 10, 3.4, 'chip'),
    r(15, 83, 10, 3.4, 'chip'),
    r(26, 83, 10, 3.4, 'chip'),
    r(44, 7, 9, 86, 'posterStrip'),
    r(57, 0, 43, 100, 'surface'),
    r(63, 18, 31, 64, 'card'),
    r(65.5, 22, 9, 3.4, 'logo'),
    r(65.5, 29, 18, 3.6, 'title'),
    r(65.5, 34.4, 22, 1.4, 'faint'),
    r(65.5, 40, 10, 1.2, 'faint'),
    r(65.5, 42, 26, 5.2, 'input'),
    r(65.5, 50, 10, 1.2, 'faint'),
    r(65.5, 52, 26, 5.2, 'input'),
    r(65.5, 61, 26, 5.4, 'accent'),
    r(65.5, 70, 16, 1.2, 'faint'),
    r(65.5, 74.5, 22, 1.2, 'faint'),
  ],

  wizard: () => [
    r(0, 0, 100, 100, 'surface'),
    r(6, 4.5, 10, 4.2, 'logo'),
    r(6, 12, 24, 78, 'card'),
    ...[17, 32, 47, 62].flatMap((y, i) => [
      r(8, y, 3, 4.8, i === 0 ? 'accentDot' : i < 1 ? 'accentDot' : 'dot'),
      r(12.5, y + 0.6, 12, 1.5, 'line'),
      r(12.5, y + 3, 9, 1.1, 'faint'),
    ]),
    r(33, 12, 61, 78, 'card'),
    r(36, 16, 24, 3.6, 'title'),
    r(36, 21.5, 40, 1.4, 'faint'),
    ...[28, 34, 40, 46, 52, 58, 64].flatMap((y, i) => [r(36, y, 2, 3.2, i === 5 ? 'warnDot' : 'okDot'), r(39.5, y + 0.8, 30 - (i % 3) * 5, 1.3, 'line'), r(84, y + 0.4, 6.5, 2.4, i === 5 ? 'pillWarn' : 'pillLive')]),
    r(36, 80, 9, 5, 'ghost'),
    r(80.5, 80, 11, 5, 'accent'),
  ],

  studio: () => [
    ...panelChrome(5),
    ...pageHeader({actions: 2}),
    r(19, 20.5, 7.5, 3.6, 'tabActive'),
    r(27.5, 20.5, 7.5, 3.6, 'tab'),
    r(64, 20.5, 34, 3.6, 'progressCard'),
    ...[19, 35, 51, 67, 83].flatMap((x, i) => [
      r(x, 26.5, 15, 28, i === 0 ? 'cardActive' : 'card'),
      r(x + 1, 27.5, 13, 15, 'portrait'),
      r(x + 1, 44.5, 8, 1.5, 'line'),
      r(x + 1, 47.3, 11, 1.1, 'faint'),
      r(x + 1, 50, 6, 2.4, i < 3 ? 'pillLive' : 'pillMuted'),
    ]),
    r(19, 57, 79, 22, 'card'),
    ...[59.5, 66, 72.5].flatMap((y, i) => [
      r(20.8, y, 1, 3, 'grip'),
      r(23, y, 5, 5, 'img'),
      r(29, y, 5, 5, 'img'),
      r(35.5, y + 0.6, 18, 1.4, 'line'),
      r(35.5, y + 3, 12, 1.1, 'faint'),
      r(80, y + 0.6, 7, 3, 'ghost'),
      r(88, y + 0.6, 8.5, 3, i === 0 ? 'accent' : 'ghost'),
    ]),
    r(19, 81, 79, 17, 'timeline'),
  ],

  system: () => [
    ...panelChrome(14),
    ...pageHeader({actions: 1}),
    ...statCards(21, 4, 9),
    r(19, 32.5, 79, 22.5, 'card'),
    r(21, 34.8, 14, 1.8, 'line'),
    r(36.5, 34.6, 10, 2.6, 'pillLive'),
    r(21, 39.5, 10, 3.2, 'tabActive'),
    r(32, 39.5, 13, 3.2, 'tab'),
    r(46, 39.5, 14, 3.2, 'tab'),
    r(21, 45, 64, 6.4, 'code'),
    r(86.5, 46, 9.5, 4.4, 'accent'),
    r(21, 52.5, 40, 1.1, 'faint'),
    ...tableRows(19, 57.5, 79, 40, 5.4, {thumb: false}),
  ],

  modal: () => [
    ...panelChrome(3),
    ...pageHeader({actions: 2}),
    ...statCards(21),
    ...tableRows(19, 33, 79, 64),
    r(0, 0, 100, 100, 'dim'),
    r(31, 11, 38, 78, 'dialog'),
    r(33.5, 14.5, 20, 3, 'title'),
    r(33.5, 19.5, 30, 1.3, 'faint'),
    ...fieldBlock(33.5, 24, 33, 4),
    r(33.5, 55, 33, 12, 'input'),
    r(33.5, 70, 2.4, 3.84, 'check'),
    r(37, 70.8, 22, 1.3, 'line'),
    r(43, 81, 11, 4.8, 'ghost'),
    r(55.5, 81, 11, 4.8, 'accent'),
  ],

  /* ---------------------------------------------------------------- */
  /* Viewer app                                                        */
  /* ---------------------------------------------------------------- */

  'app-feed': () => [
    ...phoneChrome(0),
    r(5, 4.8, 28, 2.6, 'logo'),
    r(74, 4.5, 8, 3.7, 'circle'),
    r(86, 4.5, 8, 3.7, 'circle'),
    r(5, 10, 90, 30, 'hero'),
    r(9, 28.5, 48, 2.6, 'serifLight'),
    r(9, 32, 30, 1.2, 'lineLight'),
    r(9, 34.6, 26, 3.4, 'accent'),
    r(38, 34.6, 22, 3.4, 'chipDark'),
    r(76, 37.5, 14, 0.8, 'dots'),
    ...[5, 22, 39, 56, 73].map((x) => r(x, 42.5, 15, 2.8, 'chip')),
    r(5, 48, 34, 1.8, 'line'),
    r(81, 48.1, 14, 1.4, 'accentLine'),
    ...[5, 29, 53, 77].flatMap((x) => [r(x, 51, 22, 17, 'img'), r(x, 69, 18, 1.2, 'line')]),
    r(5, 73, 30, 1.8, 'line'),
    ...[5, 29, 53, 77].map((x, i) => r(x, 76.4, 22, 13, i === 0 ? 'rank' : 'img')),
  ],

  'app-player': () => [
    r(0, 0, 100, 100, 'video'),
    r(0, 0, 100, 3.5, 'statusLight'),
    r(4, 5, 9, 4.15, 'glass'),
    r(16, 6.2, 34, 1.6, 'lineLight'),
    r(86, 5, 9, 4.15, 'glass'),
    ...[46, 55, 64, 73].flatMap((y, i) => [r(84, y, 11, 5.08, i === 0 ? 'like' : 'glass'), r(85.5, y + 5.8, 8, 1, 'lineLight')]),
    r(5, 79, 48, 2.4, 'serifLight'),
    r(5, 83, 36, 1.4, 'lineLight'),
    r(5, 85.8, 60, 1.2, 'lineLight'),
    r(5, 90.5, 90, 0.7, 'track'),
    r(5, 90.5, 38, 0.7, 'trackFill'),
    r(41.5, 89.9, 3.4, 1.57, 'knob'),
    r(5, 93.5, 30, 3.2, 'chipDark'),
    r(69, 93.5, 26, 3.2, 'chipDark'),
  ],

  'app-sheet': () => [
    ...phoneChrome(0),
    r(5, 4.8, 28, 2.6, 'logo'),
    r(5, 10, 90, 26, 'img'),
    r(0, 0, 100, 100, 'dim'),
    r(0, 37, 100, 63, 'sheet'),
    r(42, 38.6, 16, 0.6, 'faint'),
    r(6, 42, 52, 2.6, 'title'),
    r(6, 46, 66, 1.3, 'faint'),
    ...[50, 58.6, 67.2, 75.8].flatMap((y, i) => [
      r(5, y, 90, 7.6, i === 0 ? 'optionActive' : 'option'),
      r(9, y + 1.9, 10, 3.7, i === 0 ? 'coinTile' : i === 3 ? 'vipTile' : 'iconTile'),
      r(23, y + 2, 34, 1.5, 'line'),
      r(23, y + 4.5, 46, 1.1, 'faint'),
      r(82, y + 2.6, 8, 2.4, i === 0 ? 'radioOn' : 'radio'),
    ]),
    r(6, 85, 40, 1.4, 'coinLine'),
    r(72, 84.6, 22, 2.4, 'chip'),
    r(5, 89, 90, 6, 'accent'),
  ],

  'app-detail': () => [
    r(0, 0, 100, 43, 'hero'),
    r(0, 0, 100, 3.5, 'statusLight'),
    r(4, 5, 9, 4.15, 'glass'),
    r(87, 5, 9, 4.15, 'glass'),
    r(5, 30.5, 62, 3.2, 'serifLight'),
    r(5, 35.6, 46, 1.4, 'lineLight'),
    r(5, 38.6, 12, 2.4, 'chipDark'),
    r(19, 38.6, 12, 2.4, 'chipDark'),
    r(5, 44.5, 44, 5, 'accent'),
    r(51.5, 44.5, 20, 5, 'ghost'),
    r(74, 44.5, 21, 5, 'ghost'),
    r(5, 51.4, 90, 1.2, 'line'),
    r(5, 53.6, 70, 1.2, 'line'),
    r(5, 57, 90, 15.5, 'costCard'),
    r(8, 59, 26, 1.3, 'faint'),
    r(8, 62.4, 24, 6.5, 'costCell'),
    r(36, 62.4, 26, 6.5, 'costCell'),
    r(65, 62.4, 27, 6.5, 'costCell'),
    r(8, 70, 74, 1.1, 'faint'),
    r(5, 75, 26, 1.8, 'line'),
    ...Array.from({length: 15}, (_, i) => r(5 + (i % 5) * 18.2, 78.5 + Math.floor(i / 5) * 6.6, 16, 5.6, i < 5 ? 'epFree' : i < 7 ? 'epUnlocked' : i < 13 ? 'epLocked' : 'epSoon')),
  ],

  'app-list': () => phoneList('list'),
  'app-wallet': () => phoneList('wallet'),
  'app-settings': () => phoneList('settings'),

  'app-rewards': () => [
    ...phoneChrome(2),
    r(5, 5, 32, 2.8, 'serifTitle'),
    r(62, 4.6, 33, 3.6, 'coinChip'),
    r(5, 11, 90, 17, 'streak'),
    r(10, 14.5, 14, 6.46, 'flame'),
    r(28, 15, 32, 2.4, 'titleLight'),
    r(28, 19, 44, 1.2, 'lineLight'),
    r(10, 23.6, 80, 1.4, 'streakBar'),
    r(17, 30, 66, 30.46, 'wheel'),
    r(46.5, 28.8, 7, 2.8, 'pointer'),
    r(22, 62.5, 56, 5.4, 'accent'),
    r(30, 68.8, 40, 1.1, 'faint'),
    r(5, 71.5, 90, 8.4, 'card'),
    r(9, 73.4, 9, 4.15, 'coinTile'),
    r(22, 73.8, 40, 1.4, 'line'),
    r(22, 76.4, 50, 1.1, 'faint'),
    r(78, 73.8, 14, 2.6, 'ghost'),
    r(5, 81.5, 90, 8, 'card'),
    r(9, 83.4, 26, 1.4, 'line'),
    r(9, 86, 40, 1.1, 'faint'),
  ],

  'app-form': () => [
    r(0, 0, 100, 3.5, 'status'),
    r(4, 5, 9, 4.15, 'circle'),
    r(17, 6, 40, 2.4, 'serifTitle'),
    r(5, 11.5, 86, 1.3, 'faint'),
    r(5, 13.6, 70, 1.3, 'faint'),
    r(5, 18, 34, 1.4, 'line'),
    ...[[5, 21], [37, 21], [69, 21], [5, 25.5], [37, 25.5]].map(([x, y], i) => r(x, y, 29, 3.4, i === 0 ? 'chipActive' : 'chip')),
    r(5, 31.5, 30, 1.4, 'line'),
    r(5, 34, 90, 5.6, 'input'),
    r(5, 42.5, 30, 1.4, 'line'),
    r(5, 45, 90, 17, 'input'),
    r(5, 65, 30, 1.4, 'line'),
    r(5, 67.5, 90, 5.6, 'input'),
    r(5, 76, 50, 1.2, 'accentLine'),
    r(5, 88.5, 90, 6, 'accent'),
  ],

  'app-splash': () => [
    r(0, 0, 100, 100, 'night'),
    r(0, 0, 100, 3.5, 'statusLight'),
    r(36, 33, 28, 12.92, 'mark'),
    r(22, 50, 56, 3.4, 'serifLight'),
    r(18, 56, 64, 1.4, 'lineLight'),
    r(26, 59, 48, 1.4, 'lineLight'),
    r(8, 84, 84, 6, 'accent'),
    r(34, 94, 32, 1.3, 'lineLight'),
  ],

  'app-grid': () => [
    r(0, 0, 100, 3.5, 'status'),
    r(5, 5.4, 22, 1.2, 'faint'),
    r(5, 8, 72, 3.4, 'serifTitle'),
    r(5, 12.8, 84, 1.3, 'faint'),
    r(5, 14.8, 60, 1.3, 'faint'),
    ...Array.from({length: 12}, (_, i) => {
      const x = 5 + (i % 3) * 31;
      const y = 18.5 + Math.floor(i / 3) * 16;
      return r(x, y, 28, 14, [0, 4, 7].includes(i) ? 'tilePicked' : 'tile');
    }),
    r(5, 88.5, 90, 6, 'accent'),
  ],
};

function phoneChrome(activeTab = 0) {
  const out = [r(0, 0, 100, 3.5, 'status'), r(0, 91, 100, 9, 'tabbar')];
  [10, 35, 60, 85].forEach((x, i) => {
    out.push(r(x - 3, 92.6, 6, 2.77, i === activeTab ? 'tabIconActive' : 'tabIcon'));
    out.push(r(x - 4, 96.3, 8, 1, i === activeTab ? 'accentLine' : 'faint'));
  });
  return out;
}

function phoneList(kind) {
  const tab = kind === 'wallet' ? 2 : kind === 'settings' ? 3 : 1;
  const out = [...phoneChrome(tab), r(5, 5, 40, 3, 'serifTitle'), r(86, 4.6, 9, 4.15, 'circle')];
  if (kind === 'wallet') {
    out.push(r(5, 10.5, 90, 15, 'balanceCard'), r(9, 12.8, 20, 1.2, 'faint'), r(9, 15.4, 34, 3.6, 'coinTitle'), r(9, 21, 36, 2.8, 'cell'), r(50, 21, 36, 2.8, 'cell'), r(60, 12.6, 30, 3.6, 'accent'));
    out.push(r(5, 28, 90, 6.5, 'card'), r(9, 30, 30, 1.4, 'line'), r(9, 32.2, 40, 1, 'progress'), r(80, 29.8, 11, 2.6, 'ghost'));
    out.push(r(5, 37.5, 28, 3.2, 'chipActive'), r(35, 37.5, 28, 3.2, 'chip'), r(65, 37.5, 30, 3.2, 'chip'));
    for (let y = 43, i = 0; y < 88; y += 7.4, i += 1) {
      out.push(r(5, y, 9, 4.15, i % 3 === 1 ? 'iconTile' : 'coinTile'), r(18, y + 0.6, 40, 1.4, 'line'), r(18, y + 2.8, 28, 1, 'faint'), r(76, y + 0.8, 19, 1.6, i % 3 === 1 ? 'line' : 'coinLine'));
    }
    return out;
  }
  if (kind === 'settings') {
    out.push(r(5, 10.5, 90, 10, 'card'), r(9, 12.3, 12, 5.54, 'avatar'), r(25, 13, 34, 1.8, 'line'), r(25, 16, 46, 1.1, 'faint'));
    let y = 23;
    ['Playback', 'App', 'Notifications', 'Account'].forEach((_, g) => {
      out.push(r(6, y, 26, 1.1, 'faint'));
      y += 2.4;
      const rows = g === 0 ? 4 : 3;
      out.push(r(5, y, 90, rows * 5.4 + 0.6, 'card'));
      for (let i = 0; i < rows; i += 1) {
        const ry = y + 0.6 + i * 5.4;
        out.push(r(9, ry + 1.5, 6, 2.77, 'iconTile'), r(19, ry + 1.4, 40, 1.3, 'line'), r(19, ry + 3.3, 52, 0.9, 'faint'));
        out.push(i % 2 === 0 && g !== 3 ? r(83, ry + 1.6, 9, 2.6, 'switchOn') : r(88, ry + 2, 3, 1.5, 'chev'));
      }
      y += rows * 5.4 + 3.2;
    });
    return out.filter((s) => s.y < 90);
  }
  out.push(r(5, 10.5, 90, 4.2, 'segment'), r(5.6, 11, 29, 3.2, 'segmentActive'));
  for (let y = 17.5, i = 0; y < 86; y += 10, i += 1) {
    out.push(r(5, y, 15, 8.6, 'img'), r(24, y + 1, 46, 1.6, 'line'), r(24, y + 3.6, 30, 1.1, 'faint'), r(24, y + 6, 44, 0.9, 'progress'), r(82, y + 2.4, 13, 3, i === 0 ? 'accent' : 'ghost'));
  }
  return out;
}

export function getWire(name) {
  const make = WIRES[name];
  return make ? make() : WIRES.list();
}

export const WIRE_NAMES = Object.keys(WIRES);
