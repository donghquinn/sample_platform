import { CalculateError, MysqlError } from 'error';
import { bringTypeScores } from 'libraries/common';
import { Mysql } from 'libraries/database';
import { updateMvpType, updateScores } from 'queries/update-scores';
import { ResultData, ReturnData } from 'types/caculate.types';
import { CalculateLogger, Logger } from 'utils';
import { calculatePortion, calculateTmPortion } from 'utils/calculate.utils';
import { isTtype } from 'utils/tmDecisive.utils';

// 테스트를 통한 각각 점수 업데이트는 프론트단에서
// 각각의 타입 점수 가져오는 함수

// 각 유형 퍼센트 업데이트
export async function updatePercentage(resultData: ResultData, clientId: string) {
  try {
    const { ypercen, opercen, tpercen, mpercen, epercen, spercen, hpercen, lpercen } = resultData;

    await Mysql.query(updateScores, [ypercen, opercen, tpercen, mpercen, hpercen, lpercen, spercen, epercen, clientId]);

    Logger.info('[RESULT_SCORE_UPDATE] Each Percent Updated');

    return;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[RESULT_SCORE_UPDATE]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[RESULT_SCORE_UPDATE]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[RESULT_SCORE_UPDATE]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// 입맛 유형 DB에 업데이트
export async function updateType(type: string, clientId: string) {
  try {
    await Mysql.query(updateMvpType, [type, clientId]);

    Logger.info('[RESULT_TYPE_UPDATE] MVP Type Updated');

    return;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[RESULT_TYPE_UPDATE]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[RESULT_TYPE_UPDATE]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[RESULT_TYPE_UPDATE]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// 계산 시작 함수
export async function calculateType(clientId: string) {
  Logger.info('[RESULT_CALCULATE] Start...');

  try {
    const score = await bringTypeScores(clientId);

    if (!score) {
      throw new Error('[RESULT_SCORE_QUERY] Could Not Found Each Score');
    }

    const { name, old, young, sweet, unsweet, salty, unsalty, spicy, unspicy, hot, unhot, sea, earth, heavy, light } =
      score;

    // T, M 각각의 하위 점수들은 계산

    // 각 유형별 비율 계산
    // const oTypePortion = Math.round((Number(old) / (Number(old) + Number(young))) * 100);
    const { leftPortion: oTypePortion, rightPortion: yTypePortion } = calculatePortion(old, young);

    // Logger.info('[RESULT_CALCULATE] oType Portion: %o', oTypePortion);

    // // const yTypePortion = Math.round((Number(young) / (Number(old) + Number(young))) * 100);

    // Logger.info('[RESULT_CALCULATE] yType Portion: %o', yTypePortion);

    if (Number(oTypePortion) + Number(yTypePortion) !== 100) {
      throw new CalculateError(
        '[TYPE_CALCULATE_ERROR]',
        'CALCULATE ERORR',
        "The Number Provided Ain't Not Match for O - S Type",
      );
    }

    // const eTypePortion = Math.round((Number(earth) / (Number(earth) + Number(sea))) * 100);

    const { leftPortion: eTypePortion, rightPortion: sTypePortion } = calculatePortion(earth, sea);

    // Logger.info('[RESULT_CALCULATE] e Type Portion: %o', eTypePortion);

    // // const sTypePortion = Math.round((Number(sea) / (Number(earth) + Number(sea))) * 100);

    // Logger.info('[RESULT_CALCULATE] sType Portion: %o', sTypePortion);

    if (Number(eTypePortion) + Number(sTypePortion) !== 100) {
      throw new CalculateError(
        '[TYPE_CALCULATE_ERROR]',
        'CALCULATE ERORR',
        "The Number Provided Ain't Not Match E - S Type",
      );
    }

    // const tTypePortion = Math.round((Number(stimulative) / (Number(stimulative) + Number(mild))) * 100);

    const { stimulative, mild } = calculateTmPortion(sweet, salty, spicy, hot, unhot, unsalty, unspicy, unsweet);

    const { leftPortion: tTypePortion, rightPortion: mTypePortion } = calculatePortion(
      stimulative.toString(),
      mild.toString(),
    );

    // Logger.info('[RESULT_CALCULATE] tTypePortion: %o', tTypePortion);

    // // const mTypePortion = Math.round((Number(mild) / (Number(stimulative) + Number(mild))) * 100);

    // Logger.info('[RESULT_CALCULATE] mType Portion: %o', mTypePortion);

    if (Number(tTypePortion) + Number(mTypePortion) !== 100) {
      throw new CalculateError(
        '[TYPE_CALCULATE_ERROR]',
        'CALCULATE ERORR',
        "The Number Provided Ain't Not Match T - M Type",
      );
    }

    // const lTypePortion = Math.round((Number(light) / (Number(light) + Number(heavy))) * 100);

    const { leftPortion: lTypePortion, rightPortion: hTypePortion } = calculatePortion(light, heavy);

    // const hTypePortion = Math.round((Number(heavy) / (Number(light) + Number(heavy))) * 100);

    if (Number(lTypePortion) + Number(hTypePortion) !== 100) {
      throw new CalculateError(
        '[TYPE_CALCULATE_ERROR]',
        'CALCULATE ERORR',
        "The Number Provided Ain't Not Match L - H Type",
      );
    }

    CalculateLogger.info('[RESULT_CALCULATE] Portion Calulated: %o', {
      oType: oTypePortion,
      yType: yTypePortion,
      tType: tTypePortion,
      mType: mTypePortion,
      sType: sTypePortion,
      eType: eTypePortion,
      lType: lTypePortion,
      hType: hTypePortion,
    });

    const { leftPortion: saltyPortion } = calculatePortion(salty, unsalty);
    const { leftPortion: spicyPortion } = calculatePortion(spicy, unspicy);
    const { leftPortion: sweetPortion } = calculatePortion(sweet, unsweet);
    const { leftPortion: hotPortion } = calculatePortion(hot, unhot);

    let thirdType;

    // 타입 결정
    const firstType = yTypePortion > oTypePortion ? 'Y' : 'O';
    const secondType = eTypePortion > sTypePortion ? 'E' : 'S';

    // 하나라도 t 타입이면 t로
    if (isTtype(saltyPortion, sweetPortion, spicyPortion, hotPortion)) {
      thirdType = 'T';
    } else {
      thirdType = 'M';
    }

    const fourthType = lTypePortion > mTypePortion ? 'L' : 'H';

    const type = firstType + secondType + thirdType + fourthType;

    Logger.info('[RESULT_CALCULATE] Your Type: %o', type);

    const resultData: ResultData = {
      opercen: oTypePortion.toString(),
      ypercen: yTypePortion.toString(),
      spercen: sTypePortion.toString(),
      epercen: eTypePortion.toString(),
      tpercen: tTypePortion.toString(),
      mpercen: mTypePortion.toString(),
      hpercen: hTypePortion.toString(),
      lpercen: lTypePortion.toString(),
    };

    await updatePercentage(resultData, clientId);
    // 각 점수 update 치기

    const returnData: ReturnData = {
      name,
      type,
      // tmType,
      opercen: resultData.opercen,
      ypercen: resultData.ypercen,
      tpercen: resultData.tpercen,
      mpercen: resultData.mpercen,
      spercen: resultData.spercen,
      epercen: resultData.epercen,
      hpercen: resultData.hpercen,
      lpercen: resultData.lpercen,
    };

    await updateType(type, clientId);

    Logger.info(`[RESULT_CALCULATE] %o`, returnData);

    return returnData;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[RESULT_SCORE_QUERY]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[RESULT_SCORE_QUERY]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[RESULT_SCORE_QUERY]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// TODO clinetId 로 조회하고 INSERt
