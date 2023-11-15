import {
  Male,
  Female,
  Transgender,
  Mood,
  MoodBad,
  HelpOutline,
} from "@mui/icons-material/";

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const createSearchParams = (
  currentPage?: number,
  nameFilter?: string,
  speciesFilter?: string,
  statusFilter?: string,
  genderFilter?: string
) => {
  const searchParams: Record<string, string> = {};

  if (currentPage) {
    searchParams.page = currentPage.toString();
  }

  if (nameFilter) {
    searchParams.name = nameFilter;
  }

  if (speciesFilter) {
    searchParams.species = speciesFilter;
  }

  if (statusFilter) {
    searchParams.status = statusFilter;
  }

  if (genderFilter) {
    searchParams.gender = genderFilter;
  }

  return searchParams;
};

export const renderGenderIcon = function (gender: string) {
  switch (gender) {
    case "Male":
      return <Male />;
    case "Female":
      return <Female />;
    default:
      return <Transgender />;
  }
};

export const renderStatusIcon = function (status: string) {
  switch (status) {
    case "Alive":
      return <Mood />;
    case "Dead":
      return <MoodBad />;
    default:
      return <HelpOutline />;
  }
};
