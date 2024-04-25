import { useParams, useSearchParams } from "react-router-dom";
import DemoImage from "../../utils/Icons/DemoImage";
import {
  useGetSpecificFilm,
  useGetSpecificPeople,
  useGetSpecificSpecie,
  useGetSpecificStarship,
} from "../../hooks/queries";
import { formatDate, toTitleCase } from "../../utils/helpers";
import { Skeleton } from "antd";
import PeopleIcon from "../../utils/Icons/People";
import SpecieIcon from "../../utils/Icons/Specie";
import StarshipIcon from "../../utils/Icons/Starship";

export default function Details() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { id } = params;
  const currentView = searchParams.get("viewFrom");

  const { data: filmDetails, isLoading: filmLoading } = useGetSpecificFilm(
    id as string,
    Boolean(currentView === "overview")
  );

  const { data: peopleDetails, isLoading: peopleLoading } =
    useGetSpecificPeople(id as string, Boolean(currentView === "people"));

  const { data: specieDetails, isLoading: specieLoading } =
    useGetSpecificSpecie(id as string, Boolean(currentView === "species"));
  const { data: starshipDetails, isLoading: starshipLoading } =
    useGetSpecificStarship(id as string, Boolean(currentView === "starship"));

  return (
    <div>
      {(peopleLoading || specieLoading || starshipLoading || filmLoading) && (
        <div className="mt-32">
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        </div>
      )}
      {!peopleLoading && !specieLoading && !filmLoading && !starshipLoading && (
        <div className="flex gap-24 mt-32 max-[768px]:flex-col">
          {currentView === "overview" && <DemoImage />}
          {currentView === "people" && <PeopleIcon />}
          {currentView === "species" && <SpecieIcon />}
          {currentView === "starship" && <StarshipIcon />}
          <div className="flex flex-col gap-x-8 mt-24 max-[768px]:mt-[10px]">
            <p className="text-xxl font-bold max-[768px]:text-xl ">
              {filmDetails?.title ||
                peopleDetails?.name ||
                specieDetails?.name ||
                starshipDetails?.name ||
                "Cover"}
            </p>
            <p className="text-textgray text-base font-medium">
              {currentView === "overview" && "Director"}
              {currentView === "people" && "Gender"}
              {currentView === "species" && "Designation"}
              {currentView === "starship" && "Model"}:{" "}
              {currentView === "overview" && filmDetails?.director}{" "}
              {currentView === "people" && toTitleCase(peopleDetails?.gender)}
              {currentView === "species" &&
                toTitleCase(specieDetails?.designation)}
              {currentView === "starship" && starshipDetails?.model}
            </p>
            <p className="text-textgray text-base font-medium">
              {currentView === "overview" && "Producer"}
              {currentView === "people" && "Year of birth"}
              {currentView === "species" && "Language"}
              {currentView === "starship" && "Passenger"}:{" "}
              {currentView === "overview" && filmDetails?.producer}{" "}
              {currentView === "people" && peopleDetails?.birth_year}
              {currentView === "species" && specieDetails?.language}
              {currentView === "starship" &&
                toTitleCase(starshipDetails?.passengers)}
            </p>
            <p className="text-textgray text-base font-medium">
              {currentView === "overview" && "Release Date"}
              {currentView === "people" && "Skin Color"}
              {currentView === "species" && "Eye Colors"}
              {currentView === "starship" && "Pilots"}:{" "}
              {currentView === "overview" &&
                formatDate(filmDetails?.release_date, "MMM dd, yyyy")}{" "}
              {currentView === "people" &&
                toTitleCase(peopleDetails?.skin_color)}
              {currentView === "species" &&
                toTitleCase(specieDetails?.eye_colors)}
              {currentView === "starship" && "Dior, Kingley, Jamal"}
            </p>
            {(currentView === "people" || currentView === "species") && (
              <p className="text-textgray text-base font-medium">
                {currentView === "people" && "Height"}
                {currentView === "species" && "Average Lifespan"}:{" "}
                {currentView === "people" && `${peopleDetails?.height}CM`}
                {currentView === "species" && specieDetails?.average_lifespan}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
