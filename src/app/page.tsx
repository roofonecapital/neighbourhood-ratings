import { NeigbourhoodRatingHero } from "./components/neighbourhoodRatingHero";

export const copy = {
   heroMain: "Discover the vibe before you move",
   heroSubCopy:
      "Find out what an area is like, what amenities are available and what people think of the area.",
};

export default function Page() {
   return (
      <>
         {/* Navbar */}
         <NeigbourhoodRatingHero />
         {/* Rating results */}
      </>
   );
}
