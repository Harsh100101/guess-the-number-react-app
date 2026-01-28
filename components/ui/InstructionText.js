import { Text, StyleSheet } from "react-native";
import Color from "../../util/colors";

function InstructionText({ children, style }) {
	return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
	instructionText: {
		fontFamily: "open-sans",
		color: Color.accent400,
		fontSize: 24,
	},
});
