import { useState } from "react";
import {
	TextInput,
	View,
	StyleSheet,
	Alert,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Color from "../util/colors";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import InstructionText from "../components//ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState("");

	const { width, height } = useWindowDimensions();

	function numberInputHandler(enteredText) {
		setEnteredNumber(enteredText);
	}

	function resetInputHandler() {
		setEnteredNumber("");
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber);

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
			Alert.alert("Invalid Number!!", "Number has to be in between 1 & 99.", [
				{ text: "Okay", styles: "destuctive", onPress: resetInputHandler },
			]);
			return;
		}
		onPickNumber(chosenNumber);
	}

	const marginTopDistance = height < 440 ? 30 : 100;
	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView style={styles.screen} behavior="position">
				<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
					<Title>Guess My Number</Title>
					<Card>
						<InstructionText>Enter a Number</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType="number-pad"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={numberInputHandler}
							value={enteredNumber}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

export default StartGameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		// marginTop: deviceHeight < 380 ? 30 : 100,
		alignItems: "center",
	},

	numberInput: {
		height: 50,
		width: 50,
		fontSize: 30,
		borderBottomColor: Color.accent500,
		borderBottomWidth: 2,
		color: Color.accent500,
		marginVertical: 8,
		fontWeight: "bold",
		textAlign: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
