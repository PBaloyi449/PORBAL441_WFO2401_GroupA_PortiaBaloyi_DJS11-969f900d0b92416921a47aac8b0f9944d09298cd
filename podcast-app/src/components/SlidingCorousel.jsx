import React, { useState, useEffect } from 'react';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { genres } from './genre.js'; // Import genres

const Carousel = ({ casts }) => {
  const [current, setCurrent] = useState(0);

  const previousCast = () => {
    setCurrent(current === 0 ? casts.length - 1 : current - 1);
  };

  const nextCast = () => {
    setCurrent(current === casts.length - 1 ? 0 : current + 1);
  };

  // Use useEffect to set up the interval for auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextCast();
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [current]); // Dependency array to reset interval on current change

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center">
      <div
        className="flex transition-transform ease-out duration-300"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${casts.length * 100}%`,
        }}
      >
        {casts.map((cast, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex justify-center items-center"
            style={{ width: '100%' }}
          >
            <div className="flex items-center justify-center p-4 w-full max-w-screen-xl mx-auto">
              <img
                src={cast.image}
                alt={`cast ${index}`}
                className="w-32 h-auto mb-4"
              />
              <div className="ml-4 text-left">
                <h3 className="text-xl font-bold">{cast.title}</h3>
                <p><strong>Seasons:</strong> {cast.seasons}</p>
                <p><strong>Genres:</strong> 
                  {cast.genres.map((genre, index) => (
                    <span key={index}>
                      {genres[genre.id] || 'Unknown Genre'}
                      {index < cast.genres.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p><strong>Last updated:</strong> {cast.updated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 h-full w-full flex justify-between items-center text-gray-500 px-10 text-3xl">
        <button onClick={previousCast} className="absolute left-0 ml-0">
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextCast} className="absolute right-0 mr-0">
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {casts.map((cast, index) => (
          <div
            key={`circle${index}`}
            onClick={() => setCurrent(index)}
            className={`rounded-full w-5 h-5 cursor-pointer ${index === current ? 'bg-white' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;




