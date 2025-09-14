export type Place = {
    name: string;
    max: number;
    rank: number;
}


// type debouncedInputProps = {
//   func: (...args: any[]) => void;
//   timeout?: number;
// }

export function debounce(func: (...args: any[]) => void, timeout = 300) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func(...args); }, timeout);
  };
}
