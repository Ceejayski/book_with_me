import { helper } from '@ember/component/helper';

export function addition([arg1, arg2]) {
  return arg1 + arg2;
}

export default helper(addition);
