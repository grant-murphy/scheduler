import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const InterviewerList = ({ interviewers, onChange, value }) => {
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">
				{interviewers.map(i => (
					<InterviewerListItem
						key={i.id}
						{...i}
						selected={i.id === value}
						setInterviewer={() => onChange(i.id)}
					/>
				))}
			</ul>
		</section>
	);
};
export default InterviewerList;