import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import Appointment from "components/Appointment/index.js";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";

const days = [
	{
		id: 1,
		name: "Monday",
		spots: 2
	},
	{
		id: 2,
		name: "Tuesday",
		spots: 5
	},
	{
		id: 3,
		name: "Wednesday",
		spots: 0
	}
];
const appointments = {
	time: "12pm",
	student: "Lydia Miller-Jones",
	interviewer: {
		id: 1,
		name: "Sylvia Palmer",
		avatar: "https://i.imgur.com/LpaY82x.png"
	}
};

const interviewer = {
	id: 1,
	name: "Sylvia Palmer",
	avatar: "https://i.imgur.com/LpaY82x.png"
};

const interviewers = [
	{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
	{ id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
	{ id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
	{ id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
	{ id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("Button", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Base", () => <Button>Base</Button>)
	.add("Confirm", () => <Button confirm>Confirm</Button>)
	.add("Danger", () => <Button danger>Cancel</Button>)
	.add("Clickable", () => (
		<Button onClick={action("button-clicked")}>Clickable</Button>
	))
	.add("Disabled", () => (
		<Button disabled onClick={action("button-clicked")}>
			Disabled
		</Button>
	));

storiesOf("DayListItem", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Unselected", () => <DayListItem name="Monday" spots={5} />)
	.add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
	.add("Full", () => <DayListItem name="Monday" spots={0} />)
	.add("Clickable", () => (
		<DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
	));

storiesOf("DayList", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Monday", () => (
		<DayList days={days} day={"Monday"} setDay={action("setDay")} />
	))
	.add("Tuesday", () => (
		<DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
	));

storiesOf("InterviewerList", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Initial", () => (
		<InterviewerList
			interviewers={interviewers}
			setInterviewer={action("setInterviewer")}
		/>
	))
	.add("Preselected", () => (
		<InterviewerList
			interviewers={interviewers}
			interviewer={3}
			setInterviewer={action("setInterviewer")}
		/>
	));

storiesOf("InterviewerListItem", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Unselected", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
		/>
	))
	.add("Selected", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
			selected
		/>
	))
	.add("Clickable", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
			setInterviewer={action("setInterviewer")}
		/>
	));
storiesOf("Appointment", module)
	.addParameters({
		backgrounds: [{ name: "white", value: "#fff", default: true }]
	})
	.add("Appointment", () => <Appointment />)
	.add("Appointment with Time", () => <Header time={appointments.time} />)
	.add("Show", () => (
		<Show
			mode="SHOW"
			student={appointments.student}
			interviewer={appointments.interviewer}
			onEdit={action("onEdit")}
			onDelete={action("onDelete")}
		/>
	))
	.add("Confirm", () => (
		<Confirm
			onCancel={action("onCancel")}
			onConfirm={action("onConfirm")}
			message="Delete the Appointment?"
		/>
	))
	.add("Saving", () => <Status message="Saving" />)
	.add("Deleting", () => <Status message="Deleting" />)
	.add("Error Saving", () => (
		<Error message="Could not save appointment." onClose={action("onClose")} />
	))
	.add("Error Deleting", () => (
		<Error
			message="Could not delete appointment."
			onClose={action("onClose")}
		/>
	))
	.add("Create", () => (
		<Form
			mode="CREATE"
			interviewers={interviewers}
			onSave={action("onSave")}
			onCancel={action("onCancel")}
		/>
	))
	.add("Edit", () => (
		<Form
			mode="EDIT"
			name="Seb"
			interviewer={3}
			interviewers={interviewers}
			onSave={action("onSave")}
			onCancel={action("onCancel")}
		/>
	))
	.add("Appointment Empty", () => (
		<Fragment>
			<Appointment id={1} time="12pm" onAdd={action("onAdd")} />
			<Appointment id="last" time="1pm" onAdd={action("onAdd")} />
		</Fragment>
	))
	.add("Appointment Booked", () => (
		<Fragment>
			<Appointment
				id={1}
				time="12pm"
				interview={{ student: "Lydia Miller-Jones", interviewer }}
				onEdit={action("onEdit")}
				onDelete={action("onDelete")}
			/>
			<Appointment id="last" time="1pm" />
		</Fragment>
	))
	.add("Empty", () => <Empty mode="EMPTY" onAdd={action("onAdd")} />);