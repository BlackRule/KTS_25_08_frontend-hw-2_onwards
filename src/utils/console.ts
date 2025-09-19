export function log(...t: any[]) {
  // eslint-disable-next-line no-console
  console.log(...t) //fixme теряется callStack? поэтому не замена console.log'у :(
}
