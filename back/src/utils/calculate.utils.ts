import { CalculateLogger } from './logger.utils';

export function calculatePortion(param1: string, param2: string) {
  const leftPortion = ((Number(param1) / (Number(param2) + Number(param1))) * 100).toFixed(1);
  const rightPortion = ((Number(param2) / (Number(param1) + Number(param2))) * 100).toFixed(1);

  CalculateLogger.info('[PORTION_CALCULATOR] Calculated both side portions %o', { leftPortion, rightPortion });

  return { leftPortion, rightPortion };
}

/**
 *
 * TM 디멘션 계산
 * 네가지 부분에 대한 점수 취합 후 점수 차에 의해 타입 지정
 * HSPW, HSWU, HSUP, HUWP, HSUU, HUUP, HUSU, HUUU
 * USWP, USWU, USUP, UUWP, UUUP, UUWU, USUU, UUUU
 */
export function calculateTmPortion(
  sweet: string,
  salty: string,
  spicy: string,
  hot: string,
  unhot: string,
  unsalty: string,
  unspicy: string,
  unsweet: string,
) {
  const stimulative = Number(sweet) + Number(salty) + Number(spicy) + Number(hot);

  CalculateLogger.info('[RESULT_CALCULATE] sTimulative Score: %o', stimulative);

  const mild = Number(unhot) + Number(unsalty) + Number(unspicy) + Number(unsweet);

  CalculateLogger.info('[RESULT_CALCULATE] mild score: %o', mild);

  const tmHtype = Number(hot) > Number(unhot) ? 'H' : 'U';
  const tmStype = Number(salty) > Number(unsalty) ? 'S' : 'U';
  const tmWtype = Number(sweet) > Number(unsweet) ? 'W' : 'U';
  const tmPtype = Number(spicy) > Number(unspicy) ? 'P' : 'U';

  const tmType = tmHtype + tmStype + tmPtype + tmWtype;

  CalculateLogger.info('[RESULT_CALCULATE] TM Dimension Type : %o', tmType);

  return { stimulative, mild, tmType };
}
