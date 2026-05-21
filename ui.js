import { calcGearPair } from './calc.js';

const btnCalc      = document.getElementById('calc-btn');
const errorSection = document.getElementById('error-section');
const errorList    = document.getElementById('error-list');
const resultSection = document.getElementById('result-section');

function fmt(n, digits = 3) {
  return n.toFixed(digits);
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function showErrors(errors) {
  resultSection.hidden = true;
  errorList.innerHTML = errors.map(msg => `<li>${msg}</li>`).join('');
  errorSection.hidden = false;
}

function showResult(r) {
  errorSection.hidden = true;

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

btnCalc.addEventListener('click', () => {
  const m  = document.getElementById('input-m').value;
  const z1 = document.getElementById('input-z1').value;
  const z2 = document.getElementById('input-z2').value;

  const result = calcGearPair(m, z1, z2);

  if (!result.ok) {
    showErrors(result.errors);
  } else {
    showResult(result);
  }
});
