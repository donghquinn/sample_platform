import { KoaServer } from 'server';
import { Mysql } from 'libraries';
import { Logger } from 'utils';

export function shutdown(server: KoaServer) {
  const mysql = Mysql.getInstance();

  try {
    server.stop();
    mysql.stop();

    Logger.info('[SYSTEM] GraceFul ShutDown');

    process.exitCode = 0;
  } catch (error) {
    Logger.error('[PROCESS_ERROR] Error Occured While Gracefully Stop');
    Logger.error('%o', error);

    process.exitCode = 1;
  }
}
