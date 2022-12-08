/**
 * 문자열을 특정 값으로 자를 수 있는지 체크
 * @param str 체크할 문자열
 * @param token 자르려는 문자열
 * @returns Boolean
 */
export function canSplit(str: string | undefined, token: string) {
  if (!str && !token) throw Error('No parameter is given. Set string to test and token to split.');

  return (str || '').split(token).length > 1;
}

// 문자 소문자화 => 소문자 한 값이 존재한다면 true 리턴
export function isTrue(str: string) {
  const lowered = str.toLowerCase();

  return lowered === 'true';
}
