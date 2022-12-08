/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const queryTmFoodandScore: Sql = `
  SELECT
    T.foodname, T.frequency
  FROM
    ${process.env.TM_FOOD} as T
  WHERE
    type = ?
  AND
    tmtype = ?
  ORDER BY
    frequency DESC
`;
