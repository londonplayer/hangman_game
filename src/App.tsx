import { useState, useEffect } from "react";
import { getAgents, getMaps, getWeapons } from "./api";
import Word from "./components/Word";
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
	const [inputValue, setInputValue] = useState<string>("");
	const [guess, setGuess] = useState<string[]>([]);

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
					<button
						disabled={selectedCategory !== "agents" && selectedCategory !== null}
						onClick={() => setSelectedCategory("agents")}
					>
						Agentes
					</button>
					<button
						disabled={selectedCategory !== "maps" && selectedCategory !== null}
						onClick={() => setSelectedCategory("maps")}
					>
						Mapas
					</button>
					<button
						disabled={selectedCategory !== "weapons" && selectedCategory !== null}
						onClick={() => setSelectedCategory("weapons")}
					>
						Armas
					</button>
				</div>
				<Word selectedWord={selectedWord} guess={guess} />
				<div className="guess-container">
					<input
						className="letter-input"
						type="text"
						maxLength={1}
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value.toLowerCase());
						}}
					/>
					<button
						onClick={() => {
							setGuess([...guess, inputValue]);
							setInputValue("");
						}}
					>
						Guess
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
