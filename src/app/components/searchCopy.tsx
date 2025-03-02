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

/*
Use UUID to generate a unique session ID.
Debounce the input value to prevent the API from being called on every keystroke.
*/

export default function Search() {
  // const [userInput, setUserInput] = useState("")
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [open, setOpen] = useState(false);

  const handleSelectedPlace = (placeId: string) => {
    /**
     * when a user clicks on a suggested address:
     *  - display loading ui
     *  - use the placeId for that address to get the full place details
     *  - use the long/lat from the full place details to do a nearby search
     *  - calculate rating
     *  - remove loading ui
     *  - display rating info
     */
    // async function placeDetails(params: unknown) {
    //   const res = await fet(`places/${placeId}`);
    //   const data = await res.json();
    //   console.log(data);
    // }
    console.log("Selected", placeId);
  };

  function handleSearchInput(userInput: string) {
    console.log("Got to handleSearchInput line 1");
    async function fetchPredictions() {
      const queryBody: Record<string, any> = {
        input: userInput,
        includedRegionCodes: ["uk"],
        includeQueryPredictions: true,
      };
      try {
        const res = await fetch(
          "api/places/",
          "places:autocomplete",
          queryBody
        );
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

  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        <div>
          {predictions.map((pred, key) => (
            <p key={pred.placePrediction?.placeId}>
              {pred.placePrediction?.text.text}
            </p>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Command className="rounded-lg border shadow-md w-[540px] bg-white">
            <CommandInput
              placeholder="Search by address or postcode"
              onValueChange={(v) => handleSearchInput(v)}
              className="block w-[480px] h-[48px] -mr-16 text-base text-gray-900"
            />
            {
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
            }
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
