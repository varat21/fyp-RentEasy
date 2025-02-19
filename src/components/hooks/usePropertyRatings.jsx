import { useMemo } from 'react';

const useAverageRating = (ratings) => {
  // Calculate the average rating and count of ratings
  const averageRating = useMemo(() => {
    // If there are no ratings, return 0 for average and count
    if (!ratings || ratings.length === 0) {
      return { average: 0, count: 0 };
    }

    // Calculate the total of all ratings
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    
    // Calculate the average rating
    const average = total / ratings.length;

    // Return the average (rounded to one decimal place) and the count of ratings
    return { average: average.toFixed(1), count: ratings.length };
  }, [ratings]);

  return averageRating;
};

export default useAverageRating;