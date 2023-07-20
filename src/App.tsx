import { useState, useEffect } from "react";
import { getAgents, getMaps, getWeapons } from "./api";
import Word from "./components/word";
import "./App.css";

interface DisplayName {
	displayName: string;
}

export interface NamesObj {
	agents?: string[];
	maps?: string[];
	weapons?: string[];
}

function App() {
	const [names, setNames] = useState<NamesObj>({});
	const [randomNumber, setRandomNumber] = useState<number>(0);
	const [selectedCategory, setSelectedCategory] = useState<keyof NamesObj | null>(null);
	const [selectedWord, setSelectedWord] = useState<string>("");

	useEffect(() => {
		const fetchNames = async () => {
			try {
				const agentsData: DisplayName[] = await getAgents();
				const mapsData: DisplayName[] = await getMaps();
				const weaponsData: DisplayName[] = await getWeapons();
				const newAgentsArray: string[] = agentsData.map((agent) => agent.displayName);
				const newMapsArray: string[] = mapsData.map((map) => map.displayName);
				const newWeaponsArray: string[] = weaponsData.map((weapon) => weapon.displayName);
				setNames({
					agents: newAgentsArray,
					maps: newMapsArray,
					weapons: newWeaponsArray,
				});
			} catch (error) {
				console.error("Error fetching names:", error);
			}
		};

		void fetchNames();
	}, []);

	useEffect(() => {
		if (selectedCategory && names[selectedCategory]) {
			const number = Math.floor(Math.random() * names[selectedCategory]!.length + 1);
			setRandomNumber(number);
			const [word] = names[selectedCategory]!.filter((_, index) => randomNumber === index + 1);
			setSelectedWord(word || "");
		}
	}, [names, selectedCategory, randomNumber]);

	return (
		<>
			<div>
				<div>
					<h1>Selecionar categoria</h1>
				</div>
				<div>
					<button onClick={() => setSelectedCategory("agents")}>Agentes</button>
					<button onClick={() => setSelectedCategory("maps")}>Mapas</button>
					<button onClick={() => setSelectedCategory("weapons")}>Armas</button>
				</div>
				<Word selectedWord={selectedWord} />
				<button
					onClick={() => {
						console.log("selectedWord", selectedWord);
						window.location.href = "";
					}}
				>
					Gerar palavra
				</button>
			</div>
		</>
	);
}

export default App;
