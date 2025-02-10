export function repeatAndCollect<T>(
  times: number,
  itemCreator: (index: number) => T,
): T[] {
  const res = new Array(times);
  for (let i = 0; i < times; i++) {
    res[i] = itemCreator(i);
  }
  return res;
}
