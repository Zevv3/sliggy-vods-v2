import { useState, useRef, useEffect } from "react"

const styles = {
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'white',
        alignSelf: 'center',
        width: '80%',
        cursor: 'pointer'
    },
    button: {
        backgroundColor: '#dbc03b',
        borderRadius: '25px',
        height: '40px',
        width: '230px',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '5px',
        alignSelf: 'flex-start'
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}

export function VodTitle({ team1, team2, hideAllTeams, fun }) {
    const [hideTeams, setHideTeams] = useState(true)
    const [hideAll, setHideAll] = useState(hideAllTeams)

    useEffect(() => {
        setHideAll(hideAllTeams)
    },[hideAllTeams])

    const handleHideTeams = () => {
        setHideTeams(!hideTeams)
    }

    return (
        <div style={styles.titleWrapper}>
            <button style={styles.button} onClick={() => handleHideTeams()}>Toggle Series Team Names</button>

            <p style={styles.text} onClick={fun}>
                {!hideTeams && team1.toUpperCase() 
                || !hideAll && team1.toUpperCase() || "Team 1"} vs. {!hideTeams && team2.toUpperCase() 
                || !hideAll && team2.toUpperCase() || "Team 2"}
            </p>
        </div>
    )
}