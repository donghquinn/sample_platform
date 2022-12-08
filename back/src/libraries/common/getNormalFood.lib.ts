import { MysqlError } from 'error';
import { Mysql } from 'libraries/database';
import { queryFoodListAndScore, queryMvpType } from 'queries/query-score';
import { MapSetScoreAndUrl, QueryMvpType, QueryNormalFoods } from 'types/query';
import { ReturnObject } from 'types/result.types';
import { Logger, QueryLogger } from 'utils';

// 입맛 유형 쿼리
export async function getMvpType(clinetId: string) {
  try {
    const type = await Mysql.query<QueryMvpType>(queryMvpType, [clinetId]);

    Logger.info('[OTHER_RESULT] Found MVP type %o', type);

    return type;
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

// 일반 음식 점수 부여 및 리스트
export async function getTypeFoods(type: string) {
  const queriedMap = new Map<string, MapSetScoreAndUrl>();
  const normalFoodName: Array<string> = [];
  const returnArray: Array<ReturnObject> = [];
  // const urlArray: Array<string> = [];

  try {
    const [...result] = await Mysql.query<QueryNormalFoods[]>(queryFoodListAndScore, [type]);

    if (!result) {
      throw new MysqlError('[OTHER_RESULT]', 'NO DATA FOUND', 'No Normal Foodname and score found');
    }

    QueryLogger.info('[OTHER_RESUT] FOUND Normal Food List %o', result);
    // return [result];
    // eslint-disable-next-line array-callback-return
    result.find((item) => {
      normalFoodName.push(item.foodname);

      // 맵 세팅
      queriedMap.set(item.foodname, { frequency: item.frequency, url: item.url });
    });

    // 가장 빈도수가 많았던 음식의 빈도를 점수로 지정
    const highestFoodScore = queriedMap.get(normalFoodName[0])?.frequency;

    if (highestFoodScore === undefined) {
      throw new Error('[OTHER_RESULT] No Highest FoodName Found From Map');
    }

    // 가장 빈도수가 많았던 음식의 빈도를 점수로 지정
    const score = Number(highestFoodScore);

    Logger.info('[OTHER_RESUT] Normal Highest Food Score: %o', score);

    // 가장 최고점부터 1점씩 아래로 설정한 후 map으로 넣기
    for (let i = 0; i < queriedMap.size; i += 1) {
      const url = queriedMap.get(normalFoodName[i])?.url;

      if (url === undefined) {
        Logger.info('[OTHER_RESULT] No Map Element Found');
        throw new Error('[OTHER_RESULT] No Map Element Found');
      }
      const scoreDecisive = score - i >= 0 ? score - i : 0;

      //
      returnArray.push({
        name: normalFoodName[i],
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
