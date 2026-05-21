const DEFAULT_ALPHA_DEG = 20;

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function validateMode1Inputs(m, z1, z2) {
  const errors = [];
  if (!Number.isFinite(m) || m <= 0)     errors.push("m: 正の数を入力してください");
  if (!Number.isInteger(z1) || z1 <= 0)  errors.push("z1: 正の整数を入力してください");
  if (!Number.isInteger(z2) || z2 <= 0)  errors.push("z2: 正の整数を入力してください");
  return errors;
}

function calcSingleGear(m, z, alphaDeg = DEFAULT_ALPHA_DEG) {
  const d = m * z;
  return {
    z,
    d,
    da: m * (z + 2),
    df: m * (z - 2.5),
    db: d * Math.cos(degToRad(alphaDeg)),
  };
}

function calcGearPair(m, z1, z2, alphaDeg = DEFAULT_ALPHA_DEG) {
  const mNum  = Number(m);
  const z1Num = Number(z1);
  const z2Num = Number(z2);

  const errors = validateMode1Inputs(mNum, z1Num, z2Num);
  if (errors.length > 0) return { ok: false, errors };

  const gear1 = calcSingleGear(mNum, z1Num, alphaDeg);
  const gear2 = calcSingleGear(mNum, z2Num, alphaDeg);

  return {
    ok: true,
    m: mNum,
    alphaDeg,
    gear1,
    gear2,
    p: Math.PI * mNum,
    a: mNum * (z1Num + z2Num) / 2,
    i: z2Num / z1Num,
  };
}

function validateMode2Inputs(m, z1, i) {
  const errors = [];
  if (!Number.isFinite(m) || m <= 0)    errors.push("m: 正の数を入力してください");
  if (!Number.isInteger(z1) || z1 <= 0) errors.push("z1: 正の整数を入力してください");
  if (!Number.isFinite(i) || i <= 0)    errors.push("i: 正の数を入力してください");
  return errors;
}

function calcGearPairMode2(m, z1, i, alphaDeg = DEFAULT_ALPHA_DEG) {
  const mNum  = Number(m);
  const z1Num = Number(z1);
  const iNum  = Number(i);

  const errors = validateMode2Inputs(mNum, z1Num, iNum);
  if (errors.length > 0) return { ok: false, errors };

  const idealZ2 = z1Num * iNum;
  const z2Num   = Math.round(idealZ2);

  if (z2Num <= 0) {
    return { ok: false, errors: ["i が小さすぎます。z2 が 1 以上になる値を入力してください"] };
  }

  const actualRatio = z2Num / z1Num;
  const ratioError  = actualRatio - iNum;
  const gear1 = calcSingleGear(mNum, z1Num, alphaDeg);
  const gear2 = calcSingleGear(mNum, z2Num, alphaDeg);

  return {
    ok: true,
    m: mNum,
    alphaDeg,
    idealZ2,
    z2: z2Num,
    targetRatio: iNum,
    actualRatio,
    ratioError,
    gear1,
    gear2,
    p: Math.PI * mNum,
    a: mNum * (z1Num + z2Num) / 2,
  };
}

const STANDARD_MODULES = [
  0.3, 0.4, 0.5, 0.6, 0.8,
  1, 1.25, 1.5, 2, 2.5,
  3, 4, 5, 6, 8, 10,
];

function findNearestModule(m) {
  return STANDARD_MODULES.reduce((nearest, mod) =>
    Math.abs(mod - m) < Math.abs(nearest - m) ? mod : nearest
  );
}

function validateMode3Inputs(a, z1, z2) {
  const errors = [];
  if (!Number.isFinite(a) || a <= 0)    errors.push("a: 正の数を入力してください");
  if (!Number.isInteger(z1) || z1 <= 0) errors.push("z1: 正の整数を入力してください");
  if (!Number.isInteger(z2) || z2 <= 0) errors.push("z2: 正の整数を入力してください");
  return errors;
}

function calcGearPairMode3(a, z1, z2, alphaDeg = DEFAULT_ALPHA_DEG) {
  const aNum  = Number(a);
  const z1Num = Number(z1);
  const z2Num = Number(z2);

  const errors = validateMode3Inputs(aNum, z1Num, z2Num);
  if (errors.length > 0) return { ok: false, errors };

  const mNum = 2 * aNum / (z1Num + z2Num);
  const iNum = z2Num / z1Num;

  const nearestModule          = findNearestModule(mNum);
  const moduleError            = nearestModule - mNum;
  const standardCentreDistance = nearestModule * (z1Num + z2Num) / 2;
  const centreDistanceError    = standardCentreDistance - aNum;

  const gear1 = calcSingleGear(mNum, z1Num, alphaDeg);
  const gear2 = calcSingleGear(mNum, z2Num, alphaDeg);

  return {
    ok: true,
    m: mNum,
    alphaDeg,
    i: iNum,
    gear1,
    gear2,
    p: Math.PI * mNum,
    a: aNum,
    nearestModule,
    moduleError,
    standardCentreDistance,
    centreDistanceError,
  };
}

export {
  degToRad,
  validateMode1Inputs, calcSingleGear, calcGearPair,
  validateMode2Inputs, calcGearPairMode2,
  validateMode3Inputs, calcGearPairMode3,
};
