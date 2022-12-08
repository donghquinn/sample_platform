import { createHash, randomInt } from 'crypto';
import { stringify } from 'querystring';
import { v4 } from 'uuid';

// jwt 생성
export const createToken = () => {
  // const clientKey = randomInt(8);

  const secretKey = randomInt(8);
  const clientKey = randomInt(8);

  // const { clientid: clientKey } = await Mysql.query<ClientInfo>(selectAdminId, [email, password]);

  const rawKeys = `${clientKey}${secretKey}`;

  const encoded = stringify({ rawKeys: Number(rawKeys) });

  const hashBase = createHash('sha256');
  const hash = hashBase.update(encoded, 'utf-8').digest('hex');
  const uuid = v4();

  return { hash, uuid, clientKey, secretKey };
};
