import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { useState, useRef, useEffect } from "react"
import { VodTitle } from './VodTitle'

const styles = {
    text: {
        margin: 'auto',
        color: 'white'
    },
    link: {
        color: 'white',
    },
    accordionWrapper: {
        
    },
    titleWrapper: {
        color: 'white',
        backgroundColor: '#46215e',
        borderRadius: '10px',
        textAlign: 'center',
        height: '50px',
        fontSize: '25px',
        width: '80%',
        margin: 'auto',
        marginBottom:'10px',
        marginTop: '10px'
    },
    contentWrapper: {
        backgroundColor: '#46215e',
        width: '80%',
        margin: 'auto',
        padding: '8px'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    mapNumber: {
        color: 'white',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
}

export const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
}

export function MapVodAccordion({ videoData, teams, hide }) {
    const [isActive, setIsActive] = useState(false)

    const contentEl = useRef(null);

    const handleShowVods = () => {
        setIsActive(!isActive)
    }

    return (
        <div style={styles.accordionWrapper}>
            <div style={styles.titleWrapper}>
                <p style={styles.text}>
                    <VodTitle team1={teams.split(',')[0]} team2={teams.split(',')[1]} hideAllTeams={hide} fun={handleShowVods} />
                </p>
            </div>
            <div 
            ref={el => contentEl.current = el}
            style={{
                height: isActive ? contentEl.current?.scrollHeight : '0px',
                overflow: 'hidden',
                transition: 'height ease 0.3s'
            }}
            >
                {videoData.toReversed().map(video => (
                    <div style={styles.contentWrapper}>
                        <div style={styles.content}>
                            <div style={styles.mapNumber}>Map {video.mapNumber}</div>
                            <a style={styles.link} href={`https://www.youtube.com/watch?v=${video.id}`}>
                                <FontAwesomeIcon className='fa-2x1' icon={faYoutube} size="3x" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
