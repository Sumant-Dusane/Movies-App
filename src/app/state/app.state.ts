interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: any[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface Movie {
  page: number;
  result: MovieData[] | any[];
  total_pages: number;
  total_results: number;
};

export default Movie;
