export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown" | "";
export type CharacterStatus = "Dead" | "Alive" | "unknown" | "";

export interface CharacterContextType {
  characters: Character[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
  pagination?: PaginationType;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  nameFilter: string;
  setNameFilter: (nameFilter: string) => void;
  speciesFilter: string;
  setSpeciesFilter: (speciesFilter: string) => void;
  statusFilter: string;
  setStatusFilter: (statusFilter: string) => void;
  genderFilter: string;
  setGenderFilter: (genderFilter: string) => void;
}

export interface CharacterReduxType {
  characters: Character[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
  pagination: PaginationType | undefined;
  filters: CharacterFilter;
}

export interface PaginationType {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Endpoints {
  character: string;
  location: string;
  episode: string;
}

export interface CharacterFilter {
  page: number;
  name?: string;
  type?: string;
  species?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
}

export interface LocationFilter
  extends Pick<CharacterFilter, "name" | "type" | "page"> {
  dimension?: string;
}

export interface EpisodeFilter extends Pick<CharacterFilter, "name" | "page"> {
  /**
   * Filter by the given episode code.
   * i.e: `{ episode: "S01E01" }`
   */
  episode?: string;
}

export interface Character extends ResourceBase {
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface Location extends ResourceBase {
  type: string;
  dimension: string;
  residents: string[];
}

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}

export interface WatchlistEpisode {
  id: number;
  name: string;
  episode: string;
  watched: boolean;
}

export interface ApiResponse<T> {
  /** The HTTP status code from the API response */
  status: number;
  /** The HTTP status message from the API response */
  statusMessage: string;
  /** The response that was provided by the API */
  data: T;
}

export interface Info<T> {
  /**
   * The API will automatically paginate the responses. You will receive up to `20` documents per page.
   */
  info?: {
    /** The length of the response */
    count: number;
    /** The amount of pages */
    pages: number;
    /** Link to the next page (if it exists) */
    next: string | null;
    /** Link to the previous page (if it exists) */
    prev: string | null;
  };
  results?: T;
}
