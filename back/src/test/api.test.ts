/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest';
import { routerV1 } from 'router';
import test, { describe } from 'node:test';

describe('GET Normal Result', () => {
  test('key middlewares and params', (done) => {
    request(routerV1)
      .get('/api/result')
      .send({
        client_id: '13',
      })
      .expect({
        resCode: '500',
        data: null,
        errMsg: ['AUTH ERROR ON MIDDLE WARE'],
      })
      .expect(500, done);
  });
});
