export function assertUnreachable(_value?: never): never {
  throw new Error("Statement should be unreachable");
}

export function failWithError(msg: string): never {
  throw new Error("::failWithError(): " + msg);
}
