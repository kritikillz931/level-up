
import React, { useContext, useState, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";

export const EventForm = () => {
	const { createEvent } = useContext(EventContext);
	const { games, getGames } = useContext(GameContext);
	const history = useHistory();

	const [currentEvent, setCurrentEvent] = useState({
		name: "",
		game: 0,
		description: "",
		date: "",
		time: "",
	});

	useEffect(() => {
		getGames();
	}, []);

	const changeEventState = (event) => {
		const newEventState = { ...currentEvent };

		newEventState[event.target.name] = event.target.value;

		setCurrentEvent(newEventState);
	};

	return (
		<form className="eventForm">
			<h2 className="eventForm__name">New Event</h2>
			<fieldset>
				<div className="form-group">
					<select name="game" onChange={changeEventState} style={{padding: ".5rem"}}>
            <option style={{fontStyle: "italic"}}>Choose Game</option>
						{games.map((game) => {
							return <option value={game.id}>{game.name}</option>;
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<input
						placeholder="Name"
						type="text"
						name="name"
						required
						autoFocus
						className="gameFormSet"
						onChange={changeEventState}
					/>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<input
						type="text"
						placeholder="Description"
						name="description"
						required
						autoFocus
						className="gameFormSet"
						value={currentEvent.maker}
						onChange={changeEventState}
					/>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="date">Date: </label>
					<input
						type="date"
						name="date"
						required
						autoFocus
						className="gameFormSet"
						onChange={changeEventState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="time">Time: </label>
					<input
						type="time"
						name="time"
						required
						autoFocus
						className="gameFormSet"
						onChange={changeEventState}
					/>
				</div>
			</fieldset>

			{/* You create the rest of the input fields for each Event property */}

			<button
				type="submit"
				onClick={(evt) => {
					// Prevent form from being submitted
					evt.preventDefault();

					const Event = {
						name: currentEvent.name,
						game: currentEvent.game,
						description: currentEvent.description,
						date: currentEvent.date,
						time: currentEvent.time,
					};

					// Send POST request to your API
					createEvent(Event).then(() => history.push("/events"));
				}}
				className="eventFormSubmitButton"
			>
				Create
			</button>
		</form>
	);
};