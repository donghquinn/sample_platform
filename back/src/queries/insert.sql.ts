import { Sql } from 'types';

/* eslint-disable @typescript-eslint/restrict-template-expressions */

export const insertPercent: Sql = `
  INSERT INTO
    ${process.env.MVP_PERCENT_TABLE} as P
    ( P.ypercen, P.opercen, P.tpercen, P.mpercen , 
      P.hpercen , P.lpercen , P.spercen , P.epercen )
    VALUES
    (?,  ?,  ?,  ?, 
     ? , ?,  ?,  ?)
  WHERE
    P.client_id = ?
`;
