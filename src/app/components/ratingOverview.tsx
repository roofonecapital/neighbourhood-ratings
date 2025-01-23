import Image from "next/image";

type Place = {
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
};

type ratingDataArray = {
  name: string;
  image: string;
  places: Partial<Place>[];
};

export default function PlaceCard({ name, image, places }: ratingDataArray) {
  return (
    <div className="flex flex-col grow space-y-1">
      <Image
        src={image}
        alt="school rating"
        width={200}
        height={200}
        className="rounded-md w-full"
      />
      <span className="font-bold text-md">{name}</span>
      <div className="flex flex-col space-y-1">
        {places.map((place, i) => (
          <PlaceList place={place} key={i} />
        ))}
      </div>
    </div>
  );
}

export function PlaceList({ place }: { place: Partial<Place> }) {
  const placeName = Object.keys(place)[0] as keyof Place;

  return (
    <span className="capitalize">
      {place[placeName]}{" "}
      {placeName + `${(place[placeName] ?? 0) > 0 ? "s" : ""}`}
    </span>
  );
}
