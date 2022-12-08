import { MysqlError } from 'error';
import { getTypeFoods } from 'libraries/common';
import { Mysql } from 'libraries/database';
import { queryNormalFoodAndScore, queryType } from 'queries/query-score';
import { MapSetScoreAndUrl, QueryEmotionalFoods, QueryType } from 'types/query';
import { ReturnObject } from 'types/result.types';
import { Logger, QueryLogger } from 'utils';

// 요청이 오면 저쪽에는 이미 감정 요소가 업데이트 쳐진 상태.
// clientId로 디비에서 해당하는 감정 요소 가져오고
// 해당 감정 요소에 해당하는 음식 리스트 가져오고

export async function getType(clientId: string) {
  try {
    Logger.info('[NORMAL_FOOD] Query Start');

    const [result] = await Mysql.query<QueryType[]>(queryType, [clientId]);

    if (!result) {
      throw new MysqlError('[NORMAL_FOOD]', 'MYSQL ERROR', 'No Emotion and Type Found');
    }

    Logger.info('[NORMAL_FOOD] Found type from client info %o', result);

    QueryLogger.info('[NORMAL_FOOD] Found type %o', {
      type: result.type,
      // tmtype: result.tmtype,
    });

    return { type: result.type };
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[NORMAL_FOOD]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[NORMAL_FOOD]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[NORMAL_FOOD]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// 위의 결과로 가져온 emotion을 이용해 해당 타입을 구한다.
export async function getNormalFoodsAndFrequency(type: string) {
  const normalFoodName: Array<string> = [];
  const queriedMap = new Map<string, MapSetScoreAndUrl>();
  const returnArray: Array<ReturnObject> = [];

  try {
    Logger.info('[NORMAL_FOOD] Start Query Food Lists for %o', type);

    const [...result] = await Mysql.query<QueryEmotionalFoods[]>(queryNormalFoodAndScore, [type]);

    if (!result) {
      throw new MysqlError('[NORMAL_FOOD]', 'NO DATA FOUND', 'No Normal Foodname and score found');
    }

    QueryLogger.info('[NORMAL_FOOD] Found Food List Results : %o', {
      result,
    });
    // return [result];
    // eslint-disable-next-line array-callback-return
    result.find((item) => {
      normalFoodName.push(item.foodname);

      queriedMap.set(item.foodname, { frequency: item.frequency, url: item.url });
    });

    // 배열에 음식들을 빈도수가 많은 차례로 집어넣기
    const highestFoodScore = queriedMap.get(normalFoodName[0])?.frequency;

    if (highestFoodScore === undefined) {
      throw new Error('[NORMAL_FOOD] No Highest FoodName Found From Map');
    }

    // 가장 빈도수가 많았던 음식의 빈도를 점수로 지정
    const score = Number(highestFoodScore);

    Logger.info('[NORMAL_FOOD] Emotional Score: %o', score);

    // 가장 최고점부터 1점씩 아래로 설정한 후 map으로 넣기
    for (let i = 0; i < queriedMap.size; i += 1) {
      const url = queriedMap.get(normalFoodName[i])?.url;

      if (url === undefined) {
        Logger.info('[NORMAL_FOOD] No Map Element Found');

        throw new Error('[NORMAL_FOOD] No Map Element Found');
      }
      const scoreDecisive = score - i >= 0 ? score - i : 0;

      returnArray.push({
        name: normalFoodName[i],
        score: String(scoreDecisive),
        url,
      });
    }

    return returnArray;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[NORMAL_FOOD]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[NORMAL_FOOD]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[NORMAL_FOOD]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// TODO
// 계산 시작
export async function getNormalFoodList(clientId: string) {
  const finalEmotionFoodList: Array<ReturnObject> = [];

  const tmpMap = new Map<string, Array<ReturnObject>>();
  // const normalMap = new Map<string, number>();

  try {
    Logger.info('[NORMAL_RESULT] Query emotions');

    // 요소 가져오기
    const { type } = await getType(clientId);

    if (!type) {
      throw new MysqlError('[NORMAL_RESULT]', 'RESULT ERROR', 'Could Not Found Emotion. Ignored');
    }

    // 입맛 외 요소 반영 음식 배열 - 최고점 기준으로 1점씩 감산

    // TODO 일반 음식 리스트 - tm 디멘션에 따른 리스트 점수 계산
    // TODO tm 계산한거 /result 에서 데이터베이스에 업데이트 치고 그 데이터를 여기서 가져와 음식리스트 생성
    // TODO tmfood 이라는 테이블 생성 및 데이터 기입. 계산 방식은 입맛 외 요소 계산 과정과 동일

    // 입맛 별 음식 배열 - 최고점 기준으로 1점씩 감산
    const normalRankList = await getTypeFoods(type);

    // eslint-disable-next-line array-callback-return
    normalRankList.find((normal) => {
      finalEmotionFoodList.push({
        name: normal.name,
        score: normal.score,
        url: normal.url,
      });
    });

    // 배열 내림차순
    finalEmotionFoodList.sort((a, b) => Number(a.score) - Number(b.score)).reverse();

    tmpMap.set('result', finalEmotionFoodList);

    const dataResult = tmpMap.get('result');

    if (dataResult === undefined) {
      Logger.info('[NORMAL_RESULT] Dimension Calculate - No Map Set');

      throw new Error('[NORMAL_RESULT] No Result Map Found');
    }
    // 내림차순 점수 기준으로
    return dataResult;

    // const newArray = normalRankList.filter((item) => emotionalRankList.includes(item));
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[NORMAL_RESULT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[NORMAL_RESULT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[NORMAL_RESULT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
