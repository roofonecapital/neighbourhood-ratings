type StarRatingProps = {
  maxRating?: number;
  size?: number;
  color?: string;
  showRatingValue?: boolean;
  ratingValue?: number;
};

export default function StarRating({
  maxRating = 5,
  size = 48,
  showRatingValue = false,
  ratingValue = 0,
}: StarRatingProps) {
  return (
    <div className="flex flex-row text-2xl m-0 leading-none">
      <div className="flex flex-row">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star key={i} full={ratingValue >= i + 1} size={size} />
        ))}
      </div>
      {showRatingValue && <p>{ratingValue}</p>}
    </div>
  );
}

type StarProps = {
  full: boolean;
  size: number;
};

export function Star({ full, size }: StarProps) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <>
      {full ? (
        <span className="block" style={starStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#fff"
            stroke="#A3C64F"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#fff"
          stroke="#4A5568"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </>
  );
}
