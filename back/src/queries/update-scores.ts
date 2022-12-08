/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const updateScores: Sql = `
  UPDATE
    ${process.env.MVP_PERCENT_TABLE} as P
  SET
    P.ypercen = ?, P.opercen = ?, P.tpercen = ?, P.mpercen = ?, 
    P.hpercen = ?, P.lpercen = ?, P.spercen = ?, P.epercen = ?
  WHERE
    P.client_id = ?
`;

export const updateMvpType: Sql = `
UPDATE
  ${process.env.CLIENT_TABLE} as C
SET
  C.type = ?
WHERE
  C.id = ?
`;

export const updateEmotionFoodUrl: Sql = `
UPDATE
  emotionfood as E
SET
  E.url = ?
WHERE
  E.foodname = ?
`;

export const updateNormalFoodUrl: Sql = `
UPDATE
  normalfood as N
SET
  N.url = ?
WHERE
  N.foodname = ?
`;
