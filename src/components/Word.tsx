interface Props {
	selectedWord: string;
}

function Word({ selectedWord }: Props) {
	return (
		<div>
			<h3>{selectedWord}</h3>
		</div>
	);
}

export default Word;
