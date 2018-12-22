const BASE_URL = "https://www.allmusic.com";
export const SEARCH_TYPEAHEAD = (q: string) =>
  `${BASE_URL}/search/typeahead/all/${encodeURIComponent(q)}`;
export const SEARCH_ALL = (q: string) =>
  `${BASE_URL}/search/all/${encodeURIComponent(q)}`;
export const SEARCH_ARTISTS = (q: string) =>
  `${BASE_URL}/search/artists/${encodeURIComponent(q)}`;
export const SEARCH_RELATED = (id: string) =>
  `${BASE_URL}/artist/${encodeURIComponent(id)}/related`;
