import Image from 'next/image'

const ratingData = {"rating":"0.00","id":"901293","bank":0,"hotel":0,"pharmacy":0,"hospital":0,"restaurant":0,"police":0,"bar":0,"fire_station":0,"school":0,"supermarket":0,"gym":0,"mosque":0,"church":0,"spa":0,"atm":0,"car_wash":0}
type Places = {
    school: number,
    gym: number,
    hospital: number,
    pharmacy: number,
    spa: number,
    bank: number,
    atm: number,
    restuarant: number,
    bar: number,
    supermarket: number
}

type ratingDataArray = {
    name: string,
    image: string,
    places: Places[]
}

 const ratingDataArray = [
        {name: 'School', image: '/school-rating.jpg', places: [{school: ratingData.school}]},
        {name: 'Health care', image: '/school-rating.jpg', places: [{gym: ratingData.gym, hostpital: ratingData.hospital, pharmacy: ratingData.pharmacy, spa: ratingData.spa}]},
        {name: 'Banks', image: '/school-rating.jpg', places: [{bank: ratingData.bank, atm: ratingData.atm}]},
        {name: 'Food', image: '/school-rating.jpg', places : [{restaurant: ratingData.restaurant, bar: ratingData.bar}]},
        {name: 'Shopping', image: '/school-rating.jpg', places: [{supermarket: ratingData.supermarket}]},
 ]
    

export default function RatingOverview() {


    return (
        <div className="flex flex-row gap-4">
            {ratingDataArray.map((ratingDataArray) => (
            <RatingCard name={ratingDataArray.name} image={ratingDataArray.image} places={ratingDataArray.places} key={ratingDataArray.name} />
                ))}
        </div>
    );
}

export function RatingCard({name, image, places}: ratingDataArray) {
    return (
        <div className="flex flex-col space-y-1">
            <Image src={image} alt="school rating" width={200} height={200} className='rounded-md' />
            <span className='font-bold text-md'>{name}</span>
            <p>12 schools</p>
        </div>
    )
};