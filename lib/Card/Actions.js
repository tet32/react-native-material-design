import React, {Component, PropTypes} from "react";
import {StyleSheet, View} from "react-native";

export default class Actions extends Component {
	
	static propTypes = {
		position: PropTypes.oneOf(['left', 'right']),
		children: PropTypes.node.isRequired,
		style: PropTypes.object
	};
	
	static defaultProps = {
		position: 'left',
		style: {}
	};
	
	render() {
		const {position, children, style} = this.props;
		
		return (
			<View style={[styles.container, style]}>
				<View style={[styles.actions, {alignSelf: position === 'left' ? 'flex-start' : 'flex-end'}]}>
					{children}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		paddingRight: -16,
		paddingLeft: -16
	},
	actions: {
		flexDirection: 'row'
	}
});