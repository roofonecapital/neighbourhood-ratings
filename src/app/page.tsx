"use client";
import StarRating from "./components/rating";
import PlaceCard from "./components/ratingOverview";
import Search from "./components/search";
import { useEffect, useState, useRef } from "react";
import { PLACES } from "../lib/places";
import { chunks, Place } from "../lib/helpers";
import { PlacesApi } from "../lib/placesApi";
import { Oval } from "react-loader-spinner";

// Education, Health care/fitness, Banks, Food, Entertainment, Shopping, transport
const includedTypes = [
  "school",
  "library",
  "primary_school",
  "secondary_school",
  "gym",
  "hospital",
  "pharmacy",
  "spa",
  "bank",
  "atm",
  "restaurant",
  "bar",
  "playground",
  "park",
  "supermarket",
  "clothing_store",
  "bus_stop",
  "train_station",
];

const copy = {
  heroMain: "What's a neighbourhood like?",
  heroSubCopy:
    "Find out what the area is like, what amenities are available and what people think of the area.",
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

  const handleCalculateRating = (placeId: string) => {
    /**
     * when a user clicks on a suggested address:
     *  - display loading ui
     *  - use the placeId for that address to get the full place details
     *  - use the long/lat from the full place details to do a nearby search
     *  - calculate rating
     *  - remove loading ui
     *  - display rating info
     */

    const placeCount = {};
    // Get place details -> returns lat and long
    async function getPlaceDetails(params: unknown) {
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
        //
        fetchPlaceData(data.location);
        const loadingState = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(loadingState);
      } catch {}
    }

    getPlaceDetails(placeId);

    const fetchPlaceData = async (location: { lat: number; lng: number }) => {
      const { lat, lng } = location;
      let cummulativeScore = 0;
      /**
      - Breakdown the array of PLACES into chunks of 9:8 (total of 17 places)
      - For each chunk item, call the nearbySearch API in parrellel
      - Calculate the weighted score for each chunk item (count * rank)
      - add the weighted score to the cummulative score
      - add the count of the place to the placeCount object
      - Repeat the process for the next chunk
      - Finally, return the cummulative score and placeCount object
      **/
      console.log("Location", location, "Places", PLACES);
      const chunkedPlaces = chunks(PLACES);
      console.log("Chunked Places", chunkedPlaces);
      const promises = chunkedPlaces.map((chunk) => {
        console.log("Chunk", chunk);
        return Promise.all(
          chunk.map((place: any) => {
            return getNearbySearchPlaceInfo(place, lat, lng, 0);
          })
        );
      });

      const results = await Promise.all(promises);
      console.log("Promise Results", results);
    };

    async function getNearbySearchPlaceInfo(
      place: Place,
      lat?: number,
      lng?: number,
      length?: number,
      cb = (total: number) => {}
    ) {
      console.log("Place Object", place);
      const queryBody = {
        includedTypes: place.name,
        maxResultCount: place.max,
        locationRestriction: {
          circle: {
            center: {
              latitude: lat,
              longitude: lng,
            },
            radius: 1500.0,
          },
        },
      };

      let total = length;
      const res = await PlacesApi.post("places:searchNearby", queryBody, [
        "places.primaryType",
      ]);
      const data = await res.json();
      console.log("Received nearby places:", data);

      return;
      // total += data.places.length;
      // console.log("Received nearby places:", data);
      // if (!res.ok) throw new Error("Failed to get nearby places");
      // return cb(total || 0);
    }
  };

  // const executeScrollToRatingsResults = () =>
  //   ratingResultsRef.current?.scrollIntoView();

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
              <p className="mt-6 px-48 text-pretty text-md font-medium text-gray-500 md:mt-8 md:text-xl/8">
                {copy.heroSubCopy}
              </p>
              {/*Autocomplete search input */}
              <Search
                userInput={userInput}
                setUserInput={setUserInput}
                handleGetSelectedPlaceRating={handleCalculateRating}
              />
            </div>
          </div>

          {/* <div ref={ratingResultsRef}>
            <RatingResults />
          </div> */}
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
