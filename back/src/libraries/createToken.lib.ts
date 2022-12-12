import { createHash } from 'crypto';
import { Logger } from 'utils';
import { v4 } from 'uuid';

// jwt 생성
export const createToken = () => {
  const secretKey = Math.round(Math.random() * 100000000);

  // clientkey는 clientid
  const clientKey = Math.round(Math.random() * 100000000);

  // const { clientid: clientKey } = await Mysql.query<ClientInfo>(selectAdminId, [email, password]);

  Logger.info('[REGISTER] keys: %o', { secretKey, clientKey });

  const rawKeys = `${clientKey}${secretKey}`;

  Logger.info('[REGISTER] rawKeys: %o', rawKeys);

  // const encoded = stringify({ rawKeys: Number(rawKeys) });

  const hashBase = createHash('sha256');
  const hash = hashBase.update(rawKeys, 'utf-8').digest('hex');
  const uuid = v4();

  Logger.info('[REGISTER] hash etc: %o', { hash, uuid, clientKey, secretKey });

  return { hash, uuid, clientKey, secretKey };
};
