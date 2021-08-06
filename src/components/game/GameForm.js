import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'



export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        numberOfPlayers: 0,
        name: "",
        maker: "",
        description: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const handleControlledInput = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}
                >Register New Game</button>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        defaultValue={currentGame.name}
                        onChange={handleControlledInput}
                    />
                    <label htmlFor="name">Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        defaultValue={currentGame.numberOfPlayers}
                        onChange={handleControlledInput}
                    />
                    <label htmlFor="name">Maker: </label>                    
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={currentGame.maker}
                        onChange={handleControlledInput}
                    />
                    <label htmlFor="name">Description: </label>                    
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInput}
                    />
                    <fieldset>
				<div className="form-group">
					<label htmlFor="gameType">Game Type: </label>
					<select name="gameTypeId"onChange={handleControlledInput}>
						{gameTypes.map((type) => {
							return <option value={type.id}>{type.label}</option>;
						})}
					</select>
				</div>
			</fieldset>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        name: currentGame.name,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        description: currentGame.description,
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}