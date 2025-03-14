"use client";
import StarRating from "./components/rating";
import PlaceCard from "./components/ratingOverview";
import Search from "./components/search";
import { useEffect, useState, useRef } from "react";
import { PlacesApi } from "../lib/placesApi";
import { Oval } from "react-loader-spinner";

// Education, Health care/fitness, Banks, Food, Entertainment, Shopping, transport
const includedTypes = [
  "school",
  "library",
  "primary_school",
  "secondary_school",
  "gym",
  "fitness_centre",
  "hospital",
  "pharmacy",
  "spa",
  "bank",
  "atm",
  "restaurant",
  "bar",
  "playground",
  "supermarket",
  "clothing_store",
  "bus_stop",
  "train_station",
];

const copy = {
  heroMain: "A better way to rate neighbourhoods in the UK.",
  heroSubCopy:
    "Don’t struggle thinking about neighbourhoods when you’ve got Roofone.",
};

const ratingData = {
  rating: "0.00",
  id: "901293",
  bank: 5,
  hotel: 3,
  pharmacy: 4,
  hospital: 5,
  restaurant: 9,
  police: 0,
  bar: 56,
  fire_station: 0,
  school: 10,
  supermarket: 10,
  gym: 10,
  mosque: 0,
  church: 0,
  spa: 0,
  atm: 2,
  car_wash: 0,
};

const ratingDataArray = [
  {
    name: "School",
    image: "/school-rating.jpg",
    places: [{ school: ratingData.school }],
  },
  {
    name: "Health care",
    image: "/school-rating.jpg",
    places: [
      { gym: ratingData.gym },
      { hostpital: ratingData.hospital },
      { pharmacy: ratingData.pharmacy },
      { spa: ratingData.spa },
    ],
  },
  {
    name: "Banks",
    image: "/school-rating.jpg",
    places: [{ bank: ratingData.bank }, { atm: ratingData.atm }],
  },
  {
    name: "Food",
    image: "/school-rating.jpg",
    places: [{ restaurant: ratingData.restaurant }, { bar: ratingData.bar }],
  },
  {
    name: "Shopping",
    image: "/school-rating.jpg",
    places: [{ supermarket: ratingData.supermarket }],
  },
];

export default function NeigbourhoodRating() {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const ratingResultsRef = useRef<HTMLDivElement | null>(null);

  const handleGetPlaceDetails = (placeId: string) => {
    /**
     * when a user clicks on a suggested address:
     *  - display loading ui
     *  - use the placeId for that address to get the full place details
     *  - use the long/lat from the full place details to do a nearby search
     *  - calculate rating
     *  - remove loading ui
     *  - display rating info
     */
    async function placeDetails(params: unknown) {
      setIsLoading(true);
      try {
        const res = await PlacesApi.get(
          `places/${placeId}?fields=location,formattedAddress`
        );
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to get place details");
        console.log("Received place details:", data);
        console.log(
          "Received place details (log and lat):",
          data.location.latitude,
          data.location.longitude
        );
        // get nearby places
        nearbySearch(data.location);
        const loadingState = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(loadingState);
      } catch {}
    }

    async function nearbySearch(data: { latitude: number; longitude: number }) {
      const queryBody = {
        maxResultCount: 10,
        includedTypes: includedTypes,
        includedRegionCodes: ["uk"],
        locationResctriction: {
          circle: {
            center: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            radius: 500.0,
          },
        },
      };

      try {
        const res = await PlacesApi.post("places:searchNearby", queryBody, [
          "places.displayName",
          "places.formattedAddress",
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to get nearby places");
        console.log("Received nearby places:", data);
      } catch {}
    }
    placeDetails(placeId);
  };

  const executeScrollToRatingsResults = () =>
    ratingResultsRef.current?.scrollIntoView();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-roofone-green-bg/30 h-screen">
            <div className="text-center pt-8">
              <div className="px-12 lg:px-64">
                <h1 className="text-wrap text-3xl font-semibold tracking-tight text-gray-900 md:text-6xl">
                  {copy.heroMain}
                </h1>
              </div>
              <p className="mt-6 px-8 text-pretty text-md font-medium text-gray-500 md:mt-8 md:text-xl/8">
                {copy.heroSubCopy}
              </p>
              {/*Autocomplete search input */}
              <Search
                userInput={userInput}
                setUserInput={setUserInput}
                handleGetPlaceDetails={handleGetPlaceDetails}
              />
            </div>
          </div>

          <div ref={ratingResultsRef}>
            <RatingResults />
          </div>
        </>
      )}
    </>
  );
}

function RatingResults() {
  return (
    <>
      <div className="text-center p-5">
        <h1 className="text-xl sm:text-2xl">
          Voila Here’s what neighbourhood of HA9 7LL feels like
        </h1>
      </div>
      <div className="flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center w-3/4 px-12">
          <div className="flex flex-col gap-1">
            <p className="text-xl block">Neigborhood Rating</p>
            <StarRating
              maxRating={5}
              size={48}
              showRatingValue={false}
              ratingValue={5}
            />
            <span>Learn more</span>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-roofone-secondary px-2.5 py-1.5 text-sm font-semibold w-48 h-11 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Share this rating
            </button>
            <span>Help us improve this rating</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-xl text-left">Neigborhood Overview </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:px-56">
            {ratingDataArray.map((ratingDataArray) => (
              <PlaceCard
                name={ratingDataArray.name}
                image={ratingDataArray.image}
                places={ratingDataArray.places}
                key={ratingDataArray.name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Loading() {
  const loaderClass = {
    position: "absolute",
    left: "45%",
    top: "45%",
  };
  return (
    <Oval
      visible={true}
      height="100"
      width="100"
      ariaLabel="oval-loading"
      wrapperStyle={loaderClass}
      wrapperClass="magnifying-glass-wrapper"
      color="#9FC131"
    />
  );
}
