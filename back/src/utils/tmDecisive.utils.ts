// T 타입인지 판별
export function isTtype(sweetPortion: string, saltyPortion: string, spicyPortion: string, hotPortion: string) {
  if (
    Number(sweetPortion) >= 50 ||
    Number(saltyPortion) >= 50 ||
    Number(spicyPortion) >= 50 ||
    Number(hotPortion) >= 50
  ) {
    return true;
  }

  return false;
}
