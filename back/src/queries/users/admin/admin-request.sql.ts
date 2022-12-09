/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from 'types';

export const insertAdminUser: Sql = `
  INSERT INTO 
    ${process.env.ADMIN}
    (email, password, token, clientid, gender, birth, isAdmin)
  VALUES
    (?, ?, ?, ?, ?, ?, ?)
`;

export const searchTotalUserCount: Sql = `
  SELECT
    COUNT(*) as count
  FROM
    ${process.env.CLIENT_TABLE}
`;
