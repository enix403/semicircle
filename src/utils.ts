export function assertUnreachable(_value?: never): never {
  throw new Error("Statement should be unreachable");
}

export function failWithError(msg: string): never {
  throw new Error("::failWithError(): " + msg);
}

export function roundToMultipleUp(value: number, multiplier: number): number {
  if (value % multiplier == 0) return value + multiplier;
  return Math.ceil(value / multiplier) * multiplier;
}

export function roundToMultipleDown(value: number, multiplier: number): number {
  if (value % multiplier == 0) return value - multiplier;
  return Math.floor(value / multiplier) * multiplier;
}
(<any>window).roundToMultipleUp = roundToMultipleUp;
(<any>window).roundToMultipleDown = roundToMultipleDown;
