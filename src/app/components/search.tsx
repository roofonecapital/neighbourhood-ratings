"use client";
import { useEffect, useState, useMemo, memo } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { PlacesApi } from "../../lib/placesApi";

/*
Use UUID to generate a unique session ID.
Debounce the input value to prevent the API from being called on every keystroke.
*/

const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

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
  const [isopen, setIsOpen] = useState(false);

  function handleUserInput(userInput: string) {
    setUserInput(userInput);
    // autocomplete
    async function fetchPredictions() {
      const queryBody = {
        input: userInput,
        includedRegionCodes: ["uk"],
        includeQueryPredictions: true,
      };
      try {
        // cancel current response (race condition*)
        const res = await PlacesApi.post("places:autocomplete", queryBody);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch predictions");
        console.log("received suggestings ->", data.suggestions);
        setPredictions(data.suggestions ?? []);
        //setOpen(true);
      } catch (error) {
        // handle if no result exist
        console.log(error);
      }
    }
    if (userInput.length > 3) {
      const getPredictions = setTimeout(fetchPredictions, 2000);
      return () => clearTimeout(getPredictions);
    }
  }

  const handleSelectedPlace = (placeId: string) => {
    // set UserInput
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
            className="rounded-lg border shadow-md w-[540px] bg-white"
            shouldFilter={false}
          >
            <CommandInput
              placeholder="Search by address or postcode"
              value={userInput}
              onValueChange={(v) => handleUserInput(v)}
              className="block w-[480px] h-[48px] -mr-16 text-base text-gray-900"
            />

            <CommandList>
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
            className="rounded-r-lg h-[48px] -ml-48 w-48 bg-roofone-green-primary mt-[0.75px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Calculate rating
          </button>
        </div>
      </div>
    </>
  );
}
