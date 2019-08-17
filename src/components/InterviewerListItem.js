import React from "react";
import cs from "classnames";
import "./InterviewerListItem.scss";

const InterviewerListItem = ({ selected, name, avatar, setInterviewer }) => {
	const classes = cs("interviewers__item", {
		"interviewers__item--selected": selected
	});

	return (
		<li className={classes} onClick={setInterviewer}>
			<img className="interviewers__item-image" src={avatar} alt={name} />
			{selected ? name : ""}
		</li>
	);
};
export default InterviewerListItem;