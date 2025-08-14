"use client";
import StarRating from "./components/rating";
import PlaceCard from "./components/placeCard";
import Search from "./components/search";
import { useEffect, useState, useRef } from "react";
import { PLACES } from "../lib/places";
import { Place } from "../lib/helpers";
import { PlacesApi } from "../lib/placesApi";
import { Oval } from "react-loader-spinner";

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
   const [ratingData, setRatingData] = useState<Record<string, number>>({});
   const [rating, setRating] = useState<number>(0);

   const handleCalculateRating = (placeId: string) => {
      async function getPlaceDetails(placeId: string) {
         setIsLoading(true);
         try {
            const res = await PlacesApi.get(
               `places/${placeId}?fields=location,formattedAddress`
            );
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to get place details");
            console.log("Received place details:", data);

            const RatingInfo = await calculatePlaceRating(data.location);

            setRating(RatingInfo.ratingScore);
            setRatingData(RatingInfo.placeInfo);
            setIsLoading(false);
         } catch (error) {
            setIsLoading(false);
            console.log(error);
         }
      }

      getPlaceDetails(placeId);
   };

   const calculatePlaceRating = async (location: {
      latitude: number;
      longitude: number;
   }) => {
      const { latitude, longitude } = location;
      console.log("Location", location);
      const getPlaceInfo = await Promise.all(
         PLACES.map((place) => {
            return calculatePlaceScoreAndCount(place, latitude, longitude);
         })
      );

      const placeInfo = getPlaceInfo.reduce<Record<string, number>>(
         (acc, place) => {
            acc[place.name] = place.count;
            return acc;
         },
         {}
      );
      const placesScore = getPlaceInfo.reduce((acc, place) => {
         return acc + place.score;
      }, 0);
      const maxScore = PLACES.reduce((acc, place) => {
         return acc + place.max * place.rank;
      }, 0);
      const ratingScore = (placesScore / maxScore) * 100;

      console.log("Ratings", rating, "Place Info", placeInfo);

      return { ratingScore, placeInfo };
   };

   async function calculatePlaceScoreAndCount(
      place: Place,
      lat: number,
      lng: number
   ) {
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

      const res = await PlacesApi.post("places:searchNearby", queryBody, [
         "places.primaryType",
      ]);
      const data = await res.json();
      console.log("Received nearby search data for", place.name, data);

      return {
         name: place.name,
         score: data.places?.length * place.rank,
         count: data.places?.length,
      };
   }

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
                        className="mt-8"
                        setUserInput={setUserInput}
                        handleGetSelectedPlaceRating={handleCalculateRating}
                     />
                  </div>
               </div>

               {rating && (
                  <div ref={(node) => node?.scrollIntoView()}>
                     <RatingResults />
                  </div>
               )}
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
