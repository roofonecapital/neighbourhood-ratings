import RatingOverview from "../components/ratingOverview"

const copy = {
    heroMain: "A better way to rate neighbourhoods in the UK.",
    heroSsubCopy:"Don’t struggle thinking about neighbourhoods when you’ve got Roofone."
}

export default function NeigbourhoodRating() {
    return (
        <>
        <div className="bg-roofone-green-bg/30 h-96">
            <div className="text-center pt-8">
                <div className="px-64">
            <h1 className="text-wrap text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">{copy.heroMain}</h1>
                </div>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{copy.heroSsubCopy}</p>
                <div className="flex justify-center mt-8">
                <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter UK Postcode"
          className="block w-[480px] h-[48px] -mr-24 rounded-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-roofone-green-bg sm:text-sm/6"
                    />
                    <button
        type="button"
        className="rounded-r-full -ml-24 w-48 bg-roofone-green-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Calculate rating
      </button>
                </div>
            </div>
            </div>
            <div>
                <h1>Voila Here’s what neighbourhood of HA9 7LL feels like</h1>
                <div>
                <h2>Neigborhood Overview </h2>
                <RatingOverview />
                </div>
            </div>
        </>
    )
}