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

export { degToRad, validateMode1Inputs, calcSingleGear, calcGearPair };
