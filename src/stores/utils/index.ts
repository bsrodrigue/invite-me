export function findByUUID<T>(store: T[], uuid: string) {
  return store.find((item) => item.uuid === uuid);
}
