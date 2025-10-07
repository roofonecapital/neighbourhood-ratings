export type Place = {
    name: string;
    max: number;
    rank: number;
}

export type RatingResultsProps = {
   userLocationInput?: string;
   rating: number;
   ratingDataArray?: {
      name: string;
      image: string;
      places: Partial<{
         school: number;
         gym: number;
         hospital: number;
         pharmacy: number;
         spa: number;
         bank: number;
         atm: number;
         restuarant: number;
         bar: number;
         supermarket: number;
      }>[];
   }[];
};

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
