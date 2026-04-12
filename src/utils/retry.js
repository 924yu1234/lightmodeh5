/* eslint-disable */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}

/**
 * This error is thrown if the function is canceled before completing
 */
export class CancelledError extends Error {
  constructor() {
    super('canceled');
  }
}

/**
 * Throw this error if the function should retry
 */
export class RetryableError extends Error {}

/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */

export function retry(fn, { n, minWait, maxWait, axiosSource }) {
  let completed = false;
  let rejectCancelled;
  const promise = new Promise(async (resolve, reject) => {
    rejectCancelled = reject;
    while (true) {
      let result;
      try {
        result = await fn();
        if (!completed) {
          resolve(result);
          completed = true;
        }
        break;
      } catch (error) {
        if (completed) {
          break;
        }
        if (n <= 0 || !(error instanceof RetryableError)) {
          reject(error);
          completed = true;
          break;
        }
        n -= 1;
      }
      await waitRandom(minWait, maxWait);
    }
  });
  return {
    promise,
    cancel: () => {
      if (completed) return;
      completed = true;
      if (axiosSource?.cancel) axiosSource.cancel(new CancelledError());
      rejectCancelled(new CancelledError());
    },
  };
}
