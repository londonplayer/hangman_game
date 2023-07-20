import axios, { AxiosResponse } from "axios";

interface FetchResponse {
	data: [];
}

export const getAgents = async () => {
	const fetchData: AxiosResponse<FetchResponse> = await axios.get(
		"https://valorant-api.com/v1/agents"
	);
	const { data } = fetchData.data;
	return data;
};

export const getMaps = async () => {
	const fetchData: AxiosResponse<FetchResponse> = await axios.get(
		"https://valorant-api.com/v1/maps"
	);
	const { data } = fetchData.data;
	return data;
};

export const getWeapons = async () => {
	const fetchData: AxiosResponse<FetchResponse> = await axios.get(
		"https://valorant-api.com/v1/weapons"
	);
	const { data } = fetchData.data;
	return data;
};
