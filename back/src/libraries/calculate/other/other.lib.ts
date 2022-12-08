import { MysqlError } from 'error';
import { getTypeFoods } from 'libraries/common';
import { Mysql } from 'libraries/database';
import { queryEmotionFoodsAndScore, queryEmotions } from 'queries/query-score';
import { MapSetScoreAndUrl, QueryEmotionalFoods, QueryEmotionalTypes } from 'types/query';
import { ReturnObject } from 'types/result.types';
import { Logger, QueryLogger } from 'utils';

// 요청이 오면 저쪽에는 이미 감정 요소가 업데이트 쳐진 상태.
// clientId로 디비에서 해당하는 감정 요소 가져오고
// 해당 감정 요소에 해당하는 음식 리스트 가져오고

export async function getEmotionsAndType(clientId: string) {
  try {
    Logger.info('[OTHER_RESULT] Query Start');

    const [result] = await Mysql.query<QueryEmotionalTypes[]>(queryEmotions, [clientId]);

    if (!result) {
      throw new MysqlError('[OTHER_RESULT]', 'MYSQL ERROR', 'No Emotion and Type Found');
    }

    Logger.info('[OTHER_RESULT] Found emotion and type from client info %o', result);

    QueryLogger.info('[OTHER_RESULT] Found Emotion %o', {
      emotion: result.emotion,
      type: result.type,
      // tmtype: result.tmtype,
    });

    return { emotion: result.emotion, type: result.type };
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[OTHER_RESULT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[OTHER_RESULT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[OTHER_RESULT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// 위의 결과로 가져온 emotion을 이용해 해당 타입을 구한다.
export async function getEmotionalFoodsAndFrequency(emotion: string) {
  const emotionalFoodName: Array<string> = [];
  const queriedMap = new Map<string, MapSetScoreAndUrl>();
  const returnArray: Array<ReturnObject> = [];

  try {
    Logger.info('[OTHER_RESULT] Start Query Food Lists for %o', emotion);

    const [...result] = await Mysql.query<QueryEmotionalFoods[]>(queryEmotionFoodsAndScore, [emotion]);

    if (!result) {
      throw new MysqlError('[OTHER_RESULT]', 'NO DATA FOUND', 'No Emotional Foodname and score found');
    }

    QueryLogger.info('[OTHER_RESULT] Found Food List Results : %o', {
      result,
    });
    // return [result];
    // eslint-disable-next-line array-callback-return
    result.find((item) => {
      emotionalFoodName.push(item.foodname);

      queriedMap.set(item.foodname, { frequency: item.frequency, url: item.url });
    });

    // 배열에 음식들을 빈도수가 많은 차례로 집어넣기
    const highestFoodScore = queriedMap.get(emotionalFoodName[0])?.frequency;

    if (highestFoodScore === undefined) {
      throw new Error('[OTHER_RESULT] No Highest FoodName Found From Map');
    }

    // 가장 빈도수가 많았던 음식의 빈도를 점수로 지정
    const score = Number(highestFoodScore);

    Logger.info('[OTHER_RESULT] Emotional Score: %o', score);

    // 가장 최고점부터 1점씩 아래로 설정한 후 map으로 넣기
    for (let i = 0; i < queriedMap.size; i += 1) {
      const url = queriedMap.get(emotionalFoodName[i])?.url;

      if (url === undefined) {
        Logger.info('[OTHER_RESULT] No Map Element Found');
        throw new Error('[OTHER_RESULT] No Map Element Found');
      }
      const scoreDecisive = score - i >= 0 ? score - i : 0;

      returnArray.push({
        name: emotionalFoodName[i],
        score: String(scoreDecisive),
        url,
      });
    }

    return returnArray;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[OTHER_RESULT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[OTHER_RESULT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[OTHER_RESULT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}

// TODO
// 계산 시작
export async function emotionalOtherTypeCal(clientId: string) {
  const finalEmotionFoodList: Array<ReturnObject> = [];

  const tmpMap = new Map<string, Array<ReturnObject>>();
  // const normalMap = new Map<string, number>();

  try {
    Logger.info('[OTHER_RESULT] Query emotions');

    // TODO 쿼리문 통함 -> INNER JOIN 을 통해 한번에 쿼리해 오는 로직으로 수정...
    // 감정 별 요소 가져오기
    const { emotion, type } = await getEmotionsAndType(clientId);

    if (!emotion) {
      throw new MysqlError('[OTHER_RESULT]', 'RESULT ERROR', 'Could Not Found Emotion. Ignored');
    }

    // 입맛 외 요소 반영 음식 배열 - 최고점 기준으로 1점씩 감산
    const emotionalRankList = await getEmotionalFoodsAndFrequency(emotion);

    // 입맛 별 음식 배열 - 최고점 기준으로 1점씩 감산
    const normalRankList = await getTypeFoods(type);

    // TODO 음식 이름으로 매칭하고 각 일반 음식과 감정 점수 합산해서 최상의 점수

    // eslint-disable-next-line array-callback-return
    emotionalRankList.find((emotionItem) => {
      // eslint-disable-next-line array-callback-return
      normalRankList.find((normItem) => {
        if (emotionItem.name === normItem.name) {
          finalEmotionFoodList.push({
            name: emotionItem.name,
            score: (Number(emotionItem.score) + Number(normItem.score)).toString(),
            url: normItem.url,
          });
        }
      });
    });

    // 배열 내림차순
    finalEmotionFoodList.sort((a, b) => Number(a.score) - Number(b.score)).reverse();

    tmpMap.set('result', finalEmotionFoodList);

    const dataResult = tmpMap.get('result');

    if (dataResult === undefined) {
      Logger.info('[OTHER_Result] Dimension Calculate - No Map Set');

      throw new Error('[[OTHER_Result] No Result Map Found');
    }
    // 내림차순 점수 기준으로
    return dataResult;

    // const newArray = normalRankList.filter((item) => emotionalRankList.includes(item));
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[OTHER_RESULT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[OTHER_RESULT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[OTHER_RESULT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
