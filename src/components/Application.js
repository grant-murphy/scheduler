import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "../hooks/useApplicationData";
import {
	getAppointmentsForDay,
	getInterviewersForDay,
	getInterview,
	getSpotsForDay
} from "../helpers/selectors";

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		deleteInterview
	} = useApplicationData();
	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList
						days={state.days}
						day={state.day}
						setDay={setDay}
						appointments={state.appointments}
						getSpotForDay={getSpotsForDay}
					/>
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{getAppointmentsForDay(state, state.day).map(a => {
					return (
						<Appointment
							key={a.id}
							{...a}
							interview={getInterview(state, a.interview)}
							interviewers={getInterviewersForDay(state, state.day)}
							bookInterview={bookInterview}
							deleteInterview={deleteInterview}
						/>
					);
				})}
				<Appointment id="last" time="5pm" />
			</section>
		</main>
	);
}