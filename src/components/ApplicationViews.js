import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./game/EventList.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./game/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./game/EventForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
            <EventProvider>
                <Route exact path="/games">
                    <GameList />
                    </Route>
                    <Route exact path="/games/new">
                        <GameForm />
                </Route>
                <Route exact path="/Events">
                    <EventList />
                </Route>
                <Route exact path="/Events/New">
                        <EventForm />
                </Route>
            </EventProvider>
            </GameProvider>
        </main>
    </>
}