/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const findToken: Sql = `
  SELECT
    token, is_admin
  FROM
    ${process.env.ADMIN}
  WHERE
    clientid = ?
`;

export const selectAdminId: Sql = `
  SELECT
    clientid
  FROM
    ${process.env.ADMIN}
  WHERE
    email = ?
  AND
    password = ?
`;

export const selectToken: Sql = `
  SELECT
    token, clientid
  FROM
    ${process.env.ADMIN}
  WHERE
    email = ?
  AND
    password = ?
`;
