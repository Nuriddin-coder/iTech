'use client';

import { FC, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

const motionComponents = {
	p: motion.p,
	li: motion.li,
	h1: motion.h1,
	h2: motion.h2,
	h3: motion.h3,
	h4: motion.h4,
	h5: motion.h5,
	div: motion.div,
	span: motion.span,
};

interface IMotionMotionEl extends MotionProps {
	once?: boolean;
	delay?: number;
	scale?: number;
	duration?: number;
	className?: string;
	children: ReactNode;
	el?: keyof typeof motionComponents;
	direction?: 'left' | 'right' | 'up' | 'down';
}

export const MotionEl: FC<IMotionMotionEl> = props => {
	const {
		className = '',
		children,
		scale = 1,
		once = true,
		direction = 'up',
		duration = 0.8,
		delay = 0,
		el = 'div',
		...prop
	} = props;

	const animationStart = {
		left: { opacity: 0, x: -35, scale: scale ?? 1 },
		right: { opacity: 0, x: 35, scale: scale ?? 1 },
		up: { opacity: 0, y: 35, scale: scale ?? 1 },
		down: { opacity: 0, y: -35, scale: scale ?? 1 },
	};

	const animationEnd = {
		left: { opacity: 1, x: 0, scale: 1 },
		right: { opacity: 1, x: 0, scale: 1 },
		up: { opacity: 1, y: 0, scale: 1 },
		down: { opacity: 1, y: 0, scale: 1 },
	};

	const MotionComponent = motionComponents[el];

	return (
		<MotionComponent
			variants={{
				animate: animationEnd[direction],
				initial: animationStart[direction],
			}}
			initial="initial"
			whileInView="animate"
			viewport={{ once }}
			className={className}
			transition={{ duration, delay }}
			{...prop}>
			{children}
		</MotionComponent>
	);
};
