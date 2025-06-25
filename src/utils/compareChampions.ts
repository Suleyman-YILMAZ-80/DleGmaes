import { Champion } from "../types/champions";

type ComparisonResult = {
  field: keyof Champion;
  result: "green" | "yellow" | "red";
  value: string | number | string[];
};

export function compareChampions(
  guess: Champion,
  target: Champion
): ComparisonResult[] {
  return [
    {
      field: "gender",
      result: guess.gender === target.gender ? "green" : "red",
      value: guess.gender,
    },
    {
      field: "positions",
      result:
        guess.positions.some(pos => target.positions.includes(pos))
          ? (guess.positions.length === target.positions.length &&
            guess.positions.every(pos => target.positions.includes(pos))
              ? "green"
              : "yellow")
          : "red",
      value: guess.positions,
    },
    {
      field: "species",
      result:
        guess.species.some(sp => target.species.includes(sp))
          ? (guess.species.length === target.species.length &&
            guess.species.every(sp => target.species.includes(sp))
              ? "green"
              : "yellow")
          : "red",
      value: guess.species,
    },
    {
      field: "resource",
      result: guess.resource === target.resource ? "green" : "red",
      value: guess.resource,
    },
    {
      field: "rangeType",
      result: guess.rangeType === target.rangeType ? "green" : "red",
      value: guess.rangeType,
    },
    {
      field: "region",
      result:
        guess.region.some(r => target.region.includes(r))
          ? (guess.region.length === target.region.length &&
            guess.region.every(r => target.region.includes(r))
              ? "green"
              : "yellow")
          : "red",
      value: guess.region,
    },
    {
      field: "releaseYear",
      result:
        guess.releaseYear === target.releaseYear
          ? "green"
          : "red",
      value: guess.releaseYear,
    },
  ];
}
