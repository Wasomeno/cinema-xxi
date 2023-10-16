export const regionQueryKeys = {
  allRegion: ["regions"],
  regionDetails: (regionId) => ["regions", regionId],
  regionCinemas: (regionId) => ["regions", regionId, "cinemas"],
  regionMovies: (regionId) => ["regions", regionId, "movies"],
};
