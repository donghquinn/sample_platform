/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const searchEmotionFoods: Sql = `
  SELECT
    COUNT(*) as count
  FROM
    ${process.env.EMOTION_TABLE}
  WHERE
    type = ?
`;

export const insertEmotionFoodOneByOne: Sql = `
  INSERT INTO
    ${process.env.EMOTION_TABLE}

    (type, frequency, foodname)
  VALUES
    (? ,? ,?)
`;
