'use strict';
import React, {Component, PropTypes} from "react";
import {View, TextInput, StyleSheet} from "react-native";

import {TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS} from './../config';
import {getColor, isCompatible} from './../helpers';
import Underline from './Underline';
import FloatingLabel from './FloatingLabel';
import Error from './Error';

export default class TextareaField extends Component {
	
	static propTypes = {
		primary: PropTypes.oneOf(PRIMARY_COLORS),
		duration: PropTypes.number,
		label: PropTypes.string,
		highlightColor: PropTypes.string,
		labelColor: PropTypes.string,
		borderColor: PropTypes.string,
		textColor: PropTypes.string,
		textFocusColor: PropTypes.string,
		textBlurColor: PropTypes.string,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onChangeText: PropTypes.func,
		onChange: PropTypes.func,
		value: PropTypes.string,
		inputStyle: PropTypes.object,
		wrapperStyle: PropTypes.object,
		labelStyle: PropTypes.object,
		multiline: PropTypes.bool,
		autoGrow: PropTypes.bool,
		height: PropTypes.oneOfType([undefined, PropTypes.number]),
		error: PropTypes.string
	};
	
	static defaultProps = {
		theme: 'light',
		primary: PRIMARY,
		duration: 200,
		labelColor: '#9E9E9E',
		borderColor: '#E0E0E0',
		textColor: '#000',
		value: '',
		underlineColorAndroid: 'rgba(0,0,0,0)',
		multiline: false,
		autoGrow: false,
		height: undefined
	};
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			isFocused: false,
			text: props.value,
			height: props.height
		};
	}
	
	focus() {
		this.refs.input.focus();
	}
	
	blur() {
		this.refs.input.blur();
	}
	
	isFocused() {
		return this.state.isFocused;
	}
	
	measureLayout(...args) {
		this.refs.wrapper.measureLayout(...args)
	}
	
	componentWillReceiveProps(nextProps) {
		// if(this.props.text !== nextProps.value) {
		// 	nextProps.value.length !== 0 ?
		// 		this.refs.floatingLabel.floatLabel()
		// 		: this.refs.floatingLabel.sinkLabel();
		// 	this.setState({text: nextProps.value});
		// }
		// if(this.props.height !== nextProps.height) {
		// 	this.setState({height: nextProps.height});
		// }
	}
	
	render() {
		let {
			label,
			highlightColor,
			duration,
			labelColor,
			borderColor,
			textColor,
			textFocusColor,
			textBlurColor,
			onFocus,
			onBlur,
			onChangeText,
			onChange,
			inputStyle,
			wrapperStyle,
			labelStyle,
			autoGrow,
			multiline,
			numberOfLines,
			primary,
			error,
			...props
		} = this.props;
		
		highlightColor = highlightColor ? highlightColor : getColor(primary);
		let color = highlightColor;
		if(error) {
			color = highlightColor = labelColor = '#F44336';
		}
		
		numberOfLines = numberOfLines || 1;
		let height = numberOfLines * 21 + 10 + 12;
		
		return (
			<View style={[styles.wrapper, {height: height}]} ref="wrapper">
				<TextInput
					style={[styles.textInput, {
						color: textColor
					}, (this.state.isFocused && textFocusColor) ? {
							color: textFocusColor
						} : {}, (!this.state.isFocused && textBlurColor) ? {
							color: textBlurColor
						} : {}, inputStyle]}
					multiline={true}
					numberOfLines={numberOfLines}
					onFocus={() => {
						this.setState({isFocused: true});
						this.refs.floatingLabel.floatLabel();
						this.refs.underline.expandLine();
						onFocus && onFocus();
					}}
					onBlur={() => {
						this.setState({isFocused: false});
						!this.state.text.length && this.refs.floatingLabel.sinkLabel();
						this.refs.underline.shrinkLine();
						onBlur && onBlur();
					}}
					onChangeText={(text) => {
						this.setState({text});
						onChangeText && onChangeText(text);
					}}
					onChange={(event) => {
						if(autoGrow) {
							this.setState({height: event.nativeEvent.contentSize.height});
						}
						onChange && onChange(event);
					}}
					ref="input"
					value={this.state.text}
					{...props}
				/>
				<Underline
					ref="underline"
					highlightColor={color}
					duration={duration}
					borderColor={borderColor}
				/>
				<FloatingLabel
					isFocused={this.state.isFocused}
					ref="floatingLabel"
					focusHandler={this.focus.bind(this)}
					label={label}
					labelColor={labelColor}
					highlightColor={highlightColor}
					duration={duration}
					hasValue={(this.state.text.length)}
					style={labelStyle}
				/>
				<Error error={error}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		height: 72,
		paddingTop: 10,
		paddingBottom: 12,
		position: 'relative'
	},
	textInput: {
		fontSize: 16,
		height: 25,
		lineHeight: 16,
		textAlignVertical: 'top'
	}
});