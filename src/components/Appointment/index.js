import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import "./style.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = ({
	id,
	bookInterview,
	time,
	interview,
	interviewers,
	deleteInterview
}) => {
	//const { mode, transition, back } = useVisualMode(EMPTY);
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
	const save = (name, interviewer) => {
		if(interviewer) {
			const interview = {
				student: name,
				interviewer
			}
			
			transition(SAVING);
			
			bookInterview(id, interview)
			.then(() => {
				transition(SHOW, true);
			})
			.catch(() => {
				transition(ERROR_SAVE, true);
			});
		};
	}
		
	const removeInterview = () => {
		transition(DELETING);

		deleteInterview(id)
			.then(() => {
				transition(EMPTY, true);
			})
			.catch(() => {
				transition(ERROR_DELETE, true);
			});
	};

	return (
		<section className="appointment">
			<Header time={time} />

			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
			{mode === EDIT && (
				<Form
					interviewers={interviewers}
					onCancel={() => back()}
					onSave={save}
					interviewer={interview.interviewer.id}
					name={interview.student}
				/>
			)}
			{mode === SAVING && <Status message="Saving" />}
			{mode === CONFIRM && (
				<Confirm
					message="are you sure you want to delete?"
					onCancel={() => back()}
					onConfirm={() => removeInterview()}
				/>
			)}
			{mode === DELETING && <Status message="Deleting" />}
			{mode === ERROR_SAVE && (
				<Error
					message="There was an error saving the interview"
					onClose={() => back()}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message="There was an error deleting the interview "
					onClose={() => back()}
				/>
			)}
		</section>
	);
};

export { Header, Empty, Show, Confirm, Status, Error, Form };
export default Appointment;