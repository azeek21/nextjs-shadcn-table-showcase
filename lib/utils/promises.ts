export async function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSleeper(ms: number) {
  return () => sleepFor(ms);
}

export async function asyncNoop() {}
