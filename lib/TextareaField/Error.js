'use strict';
import React, {Component, PropTypes} from "react";
import {StyleSheet, Text} from "react-native";

export default class FloatingLabel extends Component {
	
	static propTypes = {
		error: React.PropTypes.string
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let {error} = this.props;
		if(!error) {
			return null;
		}
		return (
			<Text style={styles.errorText}>
				{error}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
	errorText: {
		left: 0,
		color: '#F44336',
		top: -6,
		fontWeight: "400",
		fontSize: 13,
		backgroundColor: 'rgba(0,0,0,0)'
	}
});