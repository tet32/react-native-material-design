'use strict';
import React, {Component, PropTypes} from "react";
import {StyleSheet, Animated} from "react-native";

export default class FloatingLabel extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let {error} = this.props;
		if(!error) {
			return null;
		}
		return (
			<Animated.Text
				style={styles.errorText}
				onPress={() => {
					this.props.focusHandler();
				}}
			>
				{error}
			</Animated.Text>
		);
	}
}

const styles = StyleSheet.create({
	errorText: {
		left: 0,
		color: '#F44336',
		fontWeight: "500",
		fontSize: 13,
		backgroundColor: 'rgba(0,0,0,0)'
	}
});