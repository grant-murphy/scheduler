export const getSpotsForDay = (appointments, days, day) => {
	const MAX_SPOTS = 5;
	const targetDay = days.find(e => e.name === day);
	const appointmentList = [...targetDay.appointments];
	const appointmentsSpread = { ...appointments };

	const filledSpots = Object.values(appointmentsSpread).reduce(
		(total, appointment) => {
			if (appointmentList.includes(appointment.id)) {
				if (appointment.interview) {
					return total + 1;
				}
			}
			return total;
		},
		0
	);

	return MAX_SPOTS - filledSpots;
};
export const getDay = (state, day) =>
	state.days.filter(d => d.name.toLowerCase() === day)[0];

export const getAppointmentsForDay = (state, day) => {
	const foundDay = getDay(state, day);

	if (!foundDay) {
		return [];
	}

	return foundDay.appointments.map(id => state.appointments[id]);
};

export const getInterviewersForDay = (state, day) => {
	const foundDay = getDay(state, day);

	if (!foundDay) {
		return [];
	}

	return foundDay.interviewers.map(id => state.interviewers[id]);
};

export const getInterview = (state, interview) => {
	if (!interview) return null;
	const interviewer = state.interviewers[interview.interviewer];

	return {
		...interview,
		interviewer
	};
};