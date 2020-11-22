export type NonNullable<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? Exclude<T[P], null> : T[P]
}
