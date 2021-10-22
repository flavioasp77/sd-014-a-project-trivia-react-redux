const RANGE05 = 0.5;
const RANGE075 = 0.75;

export default function verifyRange(RANGE, incorrectMaped, rightAnswer) {
  const arrangement = [];

  if (RANGE === RANGE05) {
    arrangement.push(incorrectMaped[0]);
    arrangement.push(rightAnswer);
    arrangement.push(incorrectMaped[1]);
    arrangement.push(incorrectMaped[2]);
    return arrangement;
  }
  if (RANGE === RANGE075) {
    arrangement.push(incorrectMaped[0]);
    arrangement.push(incorrectMaped[1]);
    arrangement.push(rightAnswer);
    arrangement.push(incorrectMaped[2]);
    return arrangement;
  }
}
