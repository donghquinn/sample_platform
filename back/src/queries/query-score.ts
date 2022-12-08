/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const queryEachScore: Sql = `
SELECT
  c.name, c.type, m.old, m.young, m.earth, m.sea, m.light, 
  m.heavy, m.unspicy, m.unhot, m.unsalty, m.unsweet, m.spicy, m.hot, m.salty, m.sweet
FROM
  ${process.env.CLIENT_TABLE} as c
INNER JOIN
  ${process.env.MVP_TABLE} as m
ON
  m.client_id = c.id
WHERE
  c.id = ?
`;

export const queryMvpResults: Sql = `
  SELECT
    C.type, C.name
  FROM
    ${process.env.CLIENT_TABLE} as C
  WHERE
    C.id = ?
`;

export const queryKey: Sql = `
  SELECT
    C.key
  FROM
    ${process.env.CLIENT_TABLE} as C
  WHERE
    C.id = ?
`;

export const queryEmotions: Sql = `
  SELECT
    C.emotion, C.type
  FROM
    ${process.env.CLIENT_TABLE} as C
  WHERE
    C.id = ?
`;

export const queryType: Sql = `
  SELECT
    C.type
  FROM
    ${process.env.CLIENT_TABLE} as C
  WHERE
    C.id = ?
`;

export const queryMvpType: Sql = `
  SELECT
    C.type
  FROM
    ${process.env.CLIENT_TABLE} as C
  WHERE
    C.id = ?
`;

export const queryFoodListAndScore: Sql = `
  SELECT 
  DISTINCT
    N.foodname, N.frequency, N.url
  FROM
    ${process.env.NORMAL_TABLE} as N
  WHERE
    N.type = ?
  ORDER BY
    N.frequency DESC
`;

export const queryEmotionFoodsAndScore: Sql = `
  SELECT
  DISTINCT
    E.foodname, E.frequency, E.url
  FROM
    ${process.env.EMOTION_TABLE} as E
  WHERE
    E.type = ?
  ORDER BY
    E.frequency DESC
`;

export const queryNormalFoodAndScore: Sql = `
  SELECT
  DISTINCT
    N.foodname, N.frequency, N.url
  FROM
    ${process.env.NORMAL_FOOD} as N
  WHERE
    E.type = ?
  ORDER BY
    E.frequency DESC
`;
