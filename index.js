import React from 'react';
import style from './GridLayout.module.scss';

let sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

export const GridLayout = (props) => {
	return <div>{props.children}</div>;
};

export const Container = (props) => {
	// fluid: BOOLEAN
	let cssClasses = [props.className, props.fluid ? style['container-fluid'] : style['container']];
	const { className, ...otherProps } = props;

	return (
		<div className={cssClasses.join(' ')} {...otherProps}>
			{props.children}
		</div>
	);
};

export const Row = (props) => {
	// gutters: ARRAY [horizontal, vertical], [sizes]: OBJECT {align: STRING(top, middle, bottom), justify: STRING(start, end, center, around, between)}
	let cssClasses = [style['row'], props.className];
	const { className, ...otherProps } = props;

	const generateClasses = () => {
		sizes.map((size) => {
			// align
			if (props[size]) {
				cssClasses.push(style[`${props[size].align}-${size}`]);
			}
			// justify
			if (props[size]) {
				cssClasses.push(style[`${props[size].justify}-${size}`]);
			}
		});
		// gutters
		if (props.gutters) {
			if (props.gutters[0]) {
				cssClasses.push(style[`gutters-horizontal-${props.gutters[0]}`]);
			}
			if (props.gutters[1]) {
				cssClasses.push(style[`gutters-vertical-${props.gutters[1]}`]);
			}
		}

		return cssClasses.filter((cssClass) => cssClass !== undefined).join(' ');
	};

	return (
		<div className={generateClasses()} {...otherProps}>
			{props.children}
		</div>
	);
};

export const Col = (props) => {
	// [sizes]: OBJECT {span: INTEGER, offset: INTEGER, order: INTEGER(-1-99)}, hide: STRING(sizes)
	let cssClasses = [props.className];
	const { className, ...otherProps } = props;

	const generateClasses = () => {
		if (props.hide) {
			cssClasses.push(style[`col-hidden-${props.hide}`]);
			sizes.map((size) => {
				if (props[size] && !props[size].dynamic) {
					cssClasses.push(style[`col-${size}-${props[size].span}`]);
					cssClasses.push(style[`col-${size}-offset-${props[size].offset}`]);
					cssClasses.push(style[`order-${size}-${props[size].order}`]);
				}  
				if (props[size] && props[size].dynamic) {
					cssClasses.push(style[`col-${size}-dynamic`]);
				} 
			});
		} else {
			sizes.map((size) => {
				if (props[size] && !props[size].dynamic) {
					cssClasses.push(style[`col-${size}-${props[size].span}`]);
					cssClasses.push(style[`col-${size}-offset-${props[size].offset}`]);
					cssClasses.push(style[`order-${size}-${props[size].order}`]);
				} 
				if (props[size] && props[size].dynamic) {
					cssClasses.push(style[`col-${size}-dynamic`]);
				} 
			});
		}
		return cssClasses.filter((cssClass) => cssClass !== undefined).join(' ');
	};

	return (
		<div className={generateClasses()} {...otherProps}>
			{props.children}
		</div>
	);
};

export default GridLayout;
