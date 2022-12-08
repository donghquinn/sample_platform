/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const selectUserTokenAndClientKey: Sql = `
  SELECT
    clientid, password
  FROM
    ${process.env.ADMIN} as a
  WHERE
    email = ?
  AND
    token = ?
`;
