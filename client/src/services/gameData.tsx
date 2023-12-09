import axios from "axios";
import { season, url, headers } from "./endpointTypes";
import { IGame } from "../interfaces/game";

// Get All Upcoming Games 
const getUpcomingGameData = async (): Promise<IGame[]> => {
    try {
        const params = { "season": season }
        const allGames = await parseGameData(params);

        const upcomingGames = allGames.filter((game) => {
            const gameDate = new Date(game.startTime);
            const currentDate = new Date();
            return gameDate > currentDate;
        });

        console.log(upcomingGames);
        return upcomingGames;
    } catch (error) {
        console.error('Error fetching game stats:', error);
        throw error;
    }
}

// Get All Games Data of a Team given Team ID
const getIndividualGameTeamData = async (teamId: number): Promise<IGame[]> => {
    try {
        const params = { "team": teamId, "season": season }
        const games = await parseGameData(params);
        console.log(games);
        return games;
    } catch (error) {
        console.error('Error fetching game stats:', error);
        throw error;
    }
}

// Get Live Game Data 
const getLiveGameData = async (): Promise<IGame[]> => {
    // Date Fields for Manipulation
    try {
        const params = { "live": "all" }
        const games = await parseGameData(params);
        console.log(games);
        return games;
    } catch (error) {
        console.error('Error fetching game stats:', error);
        throw error;
    }
};

const parseGameData = async (params: any): Promise<IGame[]> => {
    try {
        const gameRawResponse = await axios.get(`${url}/games`, {
            params,
            headers,
        });
        const gameRawData = gameRawResponse.data["response"];
         
        const games: IGame[] = gameRawData.map((rawGame: any) => {
            return {
                _id: rawGame.id,
                startTime: rawGame.date.start,
                arena: rawGame.arena.name,
                homeTeamId: rawGame.teams.home.id,
                awayTeamId: rawGame.teams.visitors.id,
                homeTeamName: rawGame.teams.home.name,
                awayTeamName: rawGame.teams.visitors.name,
                homeTeamScore: rawGame.scores.home.points,
                awayTeamScore: rawGame.scores.visitors.points,
                homeTeamCode: rawGame.teams.home.code,
                awayTeamCode: rawGame.teams.visitors.code,
                homeLogo: rawGame.teams.home.logo,
                awayLogo: rawGame.teams.visitors.logo,
                quarter: rawGame.periods.current, 
                status: rawGame.status.long,
                clock: rawGame.status.clock,
            };
        });
        return games;
    } catch (error) {
        console.error('Error fetching game stats:', error);
        throw error;
    }
};

export { getLiveGameData, getIndividualGameTeamData, getUpcomingGameData };