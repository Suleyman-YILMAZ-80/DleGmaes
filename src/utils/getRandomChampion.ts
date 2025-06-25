import champions from "../../data/champions.json";
import { Champion } from "../types/champions";

export function getRandomChampion(): Champion {
    const randomIndex = Math.floor(Math.random() * champions.length);
    return champions[randomIndex];
}