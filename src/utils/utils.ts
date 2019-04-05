//Based on https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }