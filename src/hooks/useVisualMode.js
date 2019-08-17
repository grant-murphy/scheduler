import { useState } from "react";

const useVisualMode = initalMode => {
	const [mode, setMode] = useState(initalMode);
	const [history, setHistory] = useState([initalMode]);

	return {
		mode,
		transition: (newMode, replace) => {
			setMode(newMode);
			if (replace) {
				const [, ...restHistory] = history;
				setHistory([newMode, ...restHistory]);
			} else {
				// const [, ...restHistory] = history;
				setHistory([newMode, ...history]);
			}
		},

		back: () => {
			if (history.length === 1) return;
			const [, ...restHistory] = history;
			setMode(restHistory[0]);
			setHistory(restHistory);
		}
	};
};

export default useVisualMode;