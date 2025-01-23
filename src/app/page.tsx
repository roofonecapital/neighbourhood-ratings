import StarRating from "./components/rating";
import PlaceCard from "./components/ratingOverview";
import Search from "./components/search";

const copy = {
  heroMain: "A better way to rate neighbourhoods in the UK.",
  heroSsubCopy:
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
  return (
    <>
      <div className="bg-roofone-green-bg/30 h-96">
        <div className="text-center pt-8">
          <div className="px-12 lg:px-64">
            <h1 className="text-wrap text-3xl font-semibold tracking-tight text-gray-900 md:text-6xl">
              {copy.heroMain}
            </h1>
          </div>
          <p className="mt-6 px-8 text-pretty text-md font-medium text-gray-500 md:mt-8 md:text-xl/8">
            {copy.heroSsubCopy}
          </p>
          <Search />
        </div>
      </div>
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
