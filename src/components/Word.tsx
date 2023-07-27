import { useEffect, useState } from "react";
import "./Word.css";
interface Props {
	selectedWord: string;
	guess: string[];
}

function Word({ selectedWord, guess }: Props) {
	const [splitWord, setSplitWord] = useState<string[]>([]);
	console.log(splitWord);

	useEffect(() => {
		const wordToArray = selectedWord.toLowerCase().split("");
		setSplitWord(wordToArray);
	}, [selectedWord]);

	return (
		<div className="letter-container">
			{splitWord.map((letter) => {
				return (
					<div className="">
						<h3 className="letter">{guess.includes(letter) && letter.toUpperCase()}</h3>
						<h3 className="letter-underscore">___</h3>
					</div>
				);
			})}
		</div>
	);
}

export default Word;
