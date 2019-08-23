import { useEffect, useReducer } from "react";
import { getDay, getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

const useApplicationData = () => {
	const initialState = {
		day: "monday",
		days: [],
		appointments: {},
		interview: {}
	};

	const SET_DAY = "SET_DAY";
	const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
	const SET_INTERVIEW = "SET_INTERVIEW";

	const countSpots = (state, day) => {
		const appointments = getAppointmentsForDay(state, day);
		return appointments.filter(a => a.interview === null).length;
	};

	function reducer(state, action) {
		switch (action.type) {
			case SET_DAY:
				return { ...state, day: action.day };
			case SET_APPLICATION_DATA:
				return {
					...state,
					days: action.days,
					appointments: action.appointments,
					interviewers: action.interviewers
				};
			case SET_INTERVIEW: {
				const appointment = {
					...state.appointments[action.id],
					interview: action.interview ? { ...action.interview } : null
				};
				const appointments = {
					...state.appointments,
					[action.id]: appointment
				};
				// console.log("appointments =>", appointments);
				const newState = { ...state, appointments };
				const day = getDay(newState, newState.day).name.toLowerCase();
				const spots = countSpots(newState, newState.day);
				// console.log("STATE AFTER DAY");
				const newDay = { ...newState, day, spots };
				const days = newState.days.map(d => {
					if (d.name === newDay.name) {
						return newDay;
					}
					return d;
				});
				return { ...newDay, days };
			}
			default:
				throw new Error(
					`Tried to reduce with unsupported action type: ${action.type}`
				);
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	const setDay = day => {
		dispatch({ type: SET_DAY, day });
	};

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers")
		]).then(([daysResp, appointmentsResp, interviewersResp]) => {
			dispatch({
				type: SET_APPLICATION_DATA,
				days: daysResp.data,
				appointments: appointmentsResp.data,
				interviewers: interviewersResp.data
			});
		});
	}, []);

	const bookInterview = (id, interview) =>
		axios
			.put(`/api/appointments/${id}`, {
				interview
			})
			.then(resp => {
				if (!resp.status === 204) {
					console.error("There is an error!!!");
				} else {
					dispatch({ type: SET_INTERVIEW, id, interview });
					Promise.all([
						axios.get("/api/days"),
						axios.get("/api/appointments"),
						axios.get("/api/interviewers")
					]).then(([daysResp, appointmentsResp, interviewersResp]) => {
						dispatch({
							type: SET_APPLICATION_DATA,
							days: daysResp.data,
							appointments: appointmentsResp.data,
							interviewers: interviewersResp.data
						});
					});
				}
			});

	const deleteInterview = id => {
		return new Promise((res, rej) => {
			axios.delete(`/api/appointments/${id}`).then(resp => {
				if (!resp.status === 204) {
					console.log.error("server responded with non 2XX", resp.body);
					rej();
					return;
				}
				Promise.all([
					axios.get("/api/days"),
					axios.get("/api/appointments"),
					axios.get("/api/interviewers")
				]).then(([daysResp, appointmentsResp, interviewersResp]) => {
					dispatch({
						type: SET_APPLICATION_DATA,
						days: daysResp.data,
						appointments: appointmentsResp.data,
						interviewers: interviewersResp.data
					});
				});
				dispatch({ type: SET_INTERVIEW, id, interview: null });
				res();
			});
		});
	};
	return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;