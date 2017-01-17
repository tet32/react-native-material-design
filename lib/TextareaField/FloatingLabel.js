'use strict';
import React, {Component, PropTypes} from "react";
import {StyleSheet, Animated} from "react-native";

export default class FloatingLabel extends Component {
	constructor(props) {
		super(props);
		this.posTop = 5;
		this.posBottom = 28;
		this.fontLarge = 16;
		this.fontSmall = 12;
		let posTop = (props.hasValue) ? this.posTop : this.posBottom;
		let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
		this.state = {
			top: new Animated.Value(posTop),
			fontSize: new Animated.Value(fontSize)
		};
	}
	
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !(this.props.hasValue !== nextProps.hasValue || this.props.labelColor !== nextProps.labelColor);
	// }
	
	floatLabel() {
		Animated.parallel([
			Animated.timing(this.state.top, {
				toValue: this.posTop,
				duration: this.props.duration
			}),
			Animated.timing(this.state.fontSize, {
				toValue: this.fontSmall,
				duration: this.props.duration
			})
		]).start();
	}
	
	sinkLabel() {
		Animated.parallel([
			Animated.timing(this.state.top, {
				toValue: this.posBottom,
				duration: this.props.duration
			}),
			Animated.timing(this.state.fontSize, {
				toValue: this.fontLarge,
				duration: this.props.duration
			})
		]).start();
	}
	
	render() {
		let {
			label,
			labelColor,
			highlightColor,
			style
		} = this.props;
		return (
			<Animated.Text
				style={[{
					fontSize: this.state.fontSize,
					top: this.state.top,
					color: labelColor
				}, styles.labelText, this.props.isFocused && {
					color: highlightColor
				}, style]}
				onPress={() => {
					this.props.focusHandler();
				}}
			>
				{label}
			</Animated.Text>
		);
	}
}

FloatingLabel.propTypes = {
	duration: PropTypes.number,
	label: PropTypes.string,
	labelColor: PropTypes.string,
	highlightColor: PropTypes.string,
	style: PropTypes.object
};

const styles = StyleSheet.create({
	labelText: {
		position: 'absolute',
		left: 0,
		backgroundColor: 'rgba(0,0,0,0)'
	}
});