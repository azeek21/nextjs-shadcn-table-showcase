export function checkIsNonEmptyArrayLike<T>(
  arg?: ArrayLike<T>,
): arg is ArrayLike<T> {
  return Boolean(arg && arg.length > 0);
}
