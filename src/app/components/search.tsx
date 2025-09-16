"use client";
import { useState, useCallback } from "react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from "@/components/ui/command";
import { PlacesApi } from "../../lib/placesApi";
import { debounce } from "@/lib/helpers";

type SearchInputProps = {
   userInput: string;
   setUserInput: (userInput: string) => void;
   handleGetSelectedPlaceRating: (placeId: string) => void;
};

export default function Search({
   userInput,
   setUserInput,
   handleGetSelectedPlaceRating,
}: SearchInputProps) {
   const [predictions, setPredictions] = useState<
      google.maps.places.AutocompleteSuggestion[]
   >([]);

   const handleUserInput = useCallback(
      debounce((input: string) => {
         setUserInput(input);
         fetchPredictions(input);
      }, 1000),
      []
   );

   async function fetchPredictions(input: string) {
      const queryBody = {
         input: input,
         includedRegionCodes: ["uk"],
         includeQueryPredictions: true,
      };
      try {
         // cancel current response (race condition*)
         const res = await PlacesApi.post("places:autocomplete", queryBody);
         const data = await res.json();
         if (!res.ok) throw new Error("Failed to fetch predictions");
         setPredictions(data.suggestions ?? []);
      } catch (error) {
         console.log(error);
      }
   }

   const handleSelectedPlace = (placeId: string) => {
      const selectedInput = predictions.filter(
         (prediction) => prediction.placePrediction?.placeId === placeId
      );
      setUserInput(String(selectedInput[0].placePrediction?.text.text));
      handleGetSelectedPlaceRating(placeId);
   };

   return (
      <>
         <div className="flex flex-col items-center justify-center relative">
            <div className="flex justify-center mt-8">
               <Command
                  className="rounded-lg border shadow-md w-[340px] md:w-[540px] bg-white"
                  shouldFilter={false}
               >
                  <CommandInput
                     placeholder="Search by address or postcode"
                     defaultValue={userInput}
                     onValueChange={(v) => handleUserInput(v)}
                     className="block h-[48px] w-96 text-sm text-gray-900"
                  />

                  <CommandList
                     className={`${predictions.length > 0 ? "" : "hidden"}`}
                  >
                     <CommandEmpty>No results found.</CommandEmpty>
                     <CommandGroup>
                        {predictions.map((prediction) => (
                           <CommandItem
                              key={prediction.placePrediction?.placeId}
                              value={prediction.placePrediction?.placeId}
                              onSelect={(value) => handleSelectedPlace(value)}
                           >
                              {prediction.placePrediction?.text.text}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                     <CommandSeparator />
                  </CommandList>
               </Command>
               <button
                  type="button"
                  className="rounded-r-lg h-[52px] -ml-24 w-36 md:w-48 bg-roofone-green-primary mt-[0.75px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
               >
                  Calculate rating
               </button>
            </div>
         </div>
      </>
   );
}
