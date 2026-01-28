import { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Alert,
	FlatList,
	useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
	const rndNum = Math.floor(Math.random() * (max - min + 1)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);
	const [minBoundary, setMinBoundary] = useState(1);
	const [maxBoundary, setMaxBoundary] = useState(100);
	const { width, heigth } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver, guessRounds.length]);

	function nextGuessHandler(direction) {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't Lie!", "You know that this is wrong...", [
				{
					text: "Sorry",
					style: "cancel",
				},
			]);
			return;
		}
		if (direction === "lower") {
			setMaxBoundary(currentGuess);
		} else {
			setMinBoundary(currentGuess + 1);
		}

		const newRndNumber = generateRandomBetween(
			direction === "lower" ? minBoundary : currentGuess + 1,
			direction === "lower" ? currentGuess : maxBoundary,
			currentGuess,
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	}

	const guessRoundsListLength = guessRounds.length;

	let content = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or Lower
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
							<Ionicons name="remove" size={24} color="white" />{" "}
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
							<Ionicons name="add" size={24} color="white" />{" "}
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</>
	);
	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
							<Ionicons name="remove" size={24} color="white" />{" "}
						</PrimaryButton>
					</View>
					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
							<Ionicons name="add" size={24} color="white" />{" "}
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}
	return (
		<View style={styles.screen}>
			<Title>Opponents Choice</Title>
			{content}
			<View style={styles.listContainer}>
				{/* {guessRounds.map((guessRound) => (
					<Text key={guessRound}>{guessRound}</Text>
				))} */}
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: 24,
		padding: 12,
		alignItems: "center",
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonsContainerWide: { flexDirection: "row", alignItems: "center" },
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});
