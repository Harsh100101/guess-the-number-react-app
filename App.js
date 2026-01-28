import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import Color from "./util/colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(false);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
			} catch (e) {
				console.warn("SplashScreen.preventAutoHideAsync failed:", e);
			}
		}
		prepare();
	}, []);

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync().catch((e) =>
				console.warn("SplashScreen.hideAsync failed:", e),
			);
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	function pickedNumberHandler(pickedNumber) {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	}

	function gameOverHandler(numerOfRounds) {
		setGameIsOver(true);
		setGuessRounds(numerOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null);
		setGuessRounds(0);
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}
	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);
	}

	return (
		<>
			<StatusBar style="dark" />
			<SafeAreaProvider>
				<LinearGradient
					colors={[Color.accent500, Color.primary400, Color.primary700]}
					locations={[0, 0.5, 1]}
					style={styles.rootScreen}
				>
					<ImageBackground
						source={require("./assets/Images/background.jpg")}
						resizeMode="cover"
						style={styles.rootScreen}
						imageStyle={styles.backgroungImage}
					>
						<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
					</ImageBackground>
				</LinearGradient>
			</SafeAreaProvider>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroungImage: {
		opacity: 0.4,
	},
});
