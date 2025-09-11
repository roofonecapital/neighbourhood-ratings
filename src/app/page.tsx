"use client";
import Search from "./components/search";
import { useEffect, useState, useRef } from "react";
import { PLACES } from "../lib/places";
import { Place } from "../lib/helpers";
import { PlacesApi } from "../lib/placesApi";
import { Oval } from "react-loader-spinner";
import { RatingResults } from "./components/RatingResults";
import { Loading } from "./components/Loading";
import { NeigbourhoodRatingHero } from "./components/neighbourhoodRatingHero";

export const copy = {
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

export const ratingDataArray = [
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

export default function Page() {
   // const [ratingData, setRatingData] = useState<Record<string, number>>({});
   // const [rating, setRating] = useState<number>(0);

   // const handleCalculateRating = (placeId: string) => {
   //    async function getPlaceDetails(placeId: string) {
   //       setIsLoading(true);
   //       try {
   //          const res = await PlacesApi.get(
   //             `places/${placeId}?fields=location,formattedAddress`
   //          );
   //          const data = await res.json();
   //          if (!res.ok) throw new Error("Failed to get place details");
   //          console.log("Received place details:", data);

   //          const RatingInfo = await calculatePlaceRating(data.location);

   //          setRating(RatingInfo.ratingScore);
   //          setRatingData(RatingInfo.placeInfo);
   //          setIsLoading(false);
   //       } catch (error) {
   //          setIsLoading(false);
   //          console.log(error);
   //       }
   //    }

   //    getPlaceDetails(placeId);
   // };

   // const calculatePlaceRating = async (location: {
   //    latitude: number;
   //    longitude: number;
   // }) => {
   //    const { latitude, longitude } = location;
   //    console.log("Location", location);
   //    const getPlaceInfo = await Promise.all(
   //       PLACES.map((place) => {
   //          return calculatePlaceScoreAndCount(place, latitude, longitude);
   //       })
   //    );

   //    const placeInfo = getPlaceInfo.reduce<Record<string, number>>(
   //       (acc, place) => {
   //          acc[place.name] = place.count;
   //          return acc;
   //       },
   //       {}
   //    );
   //    const placesScore = getPlaceInfo.reduce((acc, place) => {
   //       return acc + place.score;
   //    }, 0);
   //    const maxScore = PLACES.reduce((acc, place) => {
   //       return acc + place.max * place.rank;
   //    }, 0);
   //    const ratingScore = (placesScore / maxScore) * 100;

   //    console.log("Ratings", rating, "Place Info", placeInfo);

   //    return { ratingScore, placeInfo };
   // };

   // async function calculatePlaceScoreAndCount(
   //    place: Place,
   //    lat: number,
   //    lng: number
   // ) {
   //    const queryBody = {
   //       includedTypes: place.name,
   //       maxResultCount: place.max,
   //       locationRestriction: {
   //          circle: {
   //             center: {
   //                latitude: lat,
   //                longitude: lng,
   //             },
   //             radius: 1500.0,
   //          },
   //       },
   //    };

   //    const res = await PlacesApi.post("places:searchNearby", queryBody, [
   //       "places.primaryType",
   //    ]);
   //    const data = await res.json();
   //    console.log("Received nearby search data for", place.name, data);

   //    return {
   //       name: place.name,
   //       score: data.places?.length * place.rank,
   //       count: data.places?.length,
   //    };
   // }

   return (
      <>
         {/* Navbar */}
         <NeigbourhoodRatingHero />
         {/* Rating results */}
      </>
   );
}
