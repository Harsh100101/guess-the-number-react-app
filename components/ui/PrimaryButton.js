import { View, Text, Pressable, StyleSheet } from "react-native";
import Color from "../../util/colors";

function PrimaryButton({ children, onPress }) {
	function pressHandler() {}

	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed]
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: Color.primary600, foreground: true }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		margin: 6,
		borderRadius: 28,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Color.primary500,
		paddingVertical: 12,
		paddingHorizontal: 20,
		elevation: 4,
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
	},
	buttonText: {
		color: Color.textPrimary,
		textAlign: "center",
		fontSize: 16,
		fontWeight: "600",
	},
	pressed: {
		opacity: 0.7,
		backgroundColor: Color.primary600,
	},
});
