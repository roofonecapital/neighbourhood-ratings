export type Place = {
    name: string;
    max: number;
    rank: number;
}


// type debouncedInputProps = {
//   func: (...args: any[]) => void;
//   timeout?: number;
// }

// @ts-ignore
export function debounce(func: Function, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => { func(...args); }, timeout
    );
  };
}
