import { MysqlError } from 'error';
import { Mysql } from 'libraries';
import { queryEachScore } from 'queries/query-score';
import { QueryScores } from 'types/query';
import { Logger } from 'utils';

export async function bringTypeScores(clientId: string) {
  try {
    const [result] = await Mysql.query<QueryScores[]>(queryEachScore, [clientId]);

    if (!result) {
      Logger.info('[RESULT_SCORE_QUERY] No Query Data Found');

      throw new MysqlError('[RESULT_SCORE_QUERY]', 'Query Result Error', 'No Query Result Found');
    }

    const resData = {
      name: result.name,
      type: result.type,
      old: result.old,
      young: result.young,
      spicy: result.spicy,
      unspicy: result.unspicy,
      sweet: result.sweet,
      unsweet: result.unsweet,
      hot: result.hot,
      unhot: result.unhot,
      salty: result.salty,
      unsalty: result.unsalty,
      sea: result.sea,
      earth: result.earth,
      heavy: result.heavy,
      light: result.light,
    };

    Logger.info('[RESULT_SCORE_QUERY] Found Each Scores: %o', resData);

    return resData;
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
