import { calcGearPair, calcGearPairMode2 } from './calc.js';

// ---- DOM references ----

const errorSection      = document.getElementById('error-section');
const errorList         = document.getElementById('error-list');
const resultSection     = document.getElementById('result-section');
const mode2ResultSection = document.getElementById('mode2-result-section');

// ---- Utilities ----

function fmt(n, digits = 3) {
  return n.toFixed(digits);
}

function fmtSigned(n, digits = 4) {
  return (n >= 0 ? "+" : "") + n.toFixed(digits);
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

// ---- Mode switching ----

const modeTabs   = document.querySelectorAll('.mode-tab');
const mode1Panel = document.getElementById('mode1-panel');
const mode2Panel = document.getElementById('mode2-panel');

modeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const mode = tab.dataset.mode;
    mode1Panel.hidden = (mode !== '1');
    mode2Panel.hidden = (mode !== '2');

    errorSection.hidden      = true;
    resultSection.hidden     = true;
    mode2ResultSection.hidden = true;
  });
});

// ---- Shared error display ----

function showErrors(errors) {
  resultSection.hidden      = true;
  mode2ResultSection.hidden = true;
  errorList.innerHTML = errors.map(msg => `<li>${msg}</li>`).join('');
  errorSection.hidden = false;
}

// ---- Mode 1 ----

function showMode1Result(r) {
  errorSection.hidden       = true;
  mode2ResultSection.hidden = true;

  setText('result-i', fmt(r.i, 4));
  setText('result-a', fmt(r.a, 3));
  setText('result-p', fmt(r.p, 3));

  setText('r-z1',  r.gear1.z);
  setText('r-z2',  r.gear2.z);
  setText('r-d1',  fmt(r.gear1.d,  3));
  setText('r-d2',  fmt(r.gear2.d,  3));
  setText('r-da1', fmt(r.gear1.da, 3));
  setText('r-da2', fmt(r.gear2.da, 3));
  setText('r-df1', fmt(r.gear1.df, 3));
  setText('r-df2', fmt(r.gear2.df, 3));
  setText('r-db1', fmt(r.gear1.db, 3));
  setText('r-db2', fmt(r.gear2.db, 3));

  resultSection.hidden = false;
}

document.getElementById('calc-btn').addEventListener('click', () => {
  const m  = document.getElementById('input-m').value;
  const z1 = document.getElementById('input-z1').value;
  const z2 = document.getElementById('input-z2').value;

  const result = calcGearPair(m, z1, z2);
  result.ok ? showMode1Result(result) : showErrors(result.errors);
});

// ---- Mode 2 ----

function showMode2Result(r) {
  errorSection.hidden  = true;
  resultSection.hidden = true;

  setText('r2-idealZ2',    r.idealZ2.toFixed(4));
  setText('r2-z2',         r.z2);
  setText('r2-targetRatio', fmt(r.targetRatio, 4));
  setText('r2-actualRatio', fmt(r.actualRatio, 4));
  setText('r2-ratioError',  fmtSigned(r.ratioError, 4));
  setText('r2-a',           fmt(r.a, 3));
  setText('r2-p',           fmt(r.p, 3));

  setText('r2-z1-row', r.gear1.z);
  setText('r2-z2-row', r.gear2.z);
  setText('r2-d1',     fmt(r.gear1.d,  3));
  setText('r2-d2',     fmt(r.gear2.d,  3));
  setText('r2-da1',    fmt(r.gear1.da, 3));
  setText('r2-da2',    fmt(r.gear2.da, 3));
  setText('r2-df1',    fmt(r.gear1.df, 3));
  setText('r2-df2',    fmt(r.gear2.df, 3));
  setText('r2-db1',    fmt(r.gear1.db, 3));
  setText('r2-db2',    fmt(r.gear2.db, 3));

  mode2ResultSection.hidden = false;
}

document.getElementById('calc-btn-2').addEventListener('click', () => {
  const m  = document.getElementById('m2-m').value;
  const z1 = document.getElementById('m2-z1').value;
  const i  = document.getElementById('m2-i').value;

  const result = calcGearPairMode2(m, z1, i);
  result.ok ? showMode2Result(result) : showErrors(result.errors);
});
