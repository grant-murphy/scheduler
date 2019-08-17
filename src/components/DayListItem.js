import React from "react";
import classname from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
	const dayListClass = classname("day-list__item", {
		"day-list__item--selected": props.selected,
		"day-list__item--full": props.spots === 0
	});

	return (
		<div className={dayListClass} onClick={props.setDay}>
			<h1>{props.name}</h1>
			{props.spots === 0 ? "no" : props.spots} spot
			{props.spots === 1 ? "" : "s"} remaining
		</div>
	);
}