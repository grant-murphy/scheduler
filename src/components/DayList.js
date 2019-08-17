import React from "react";
import DayListItem from "components/DayListItem";

const DayList = ({ days, day, setDay, appointments, getSpotForDay }) => {
	return (
		<ul>
			{days.map(d => (
				<DayListItem
					key={d.id}
					{...d}
					selected={d.name === day}
					setDay={() => setDay(d.name.toLowerCase())}
					appointments={appointments}
					getSpotForDay={getSpotForDay}
				/>
			))}
		</ul>
	);
};
export default DayList;