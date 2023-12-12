import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { ytapiCalls } from "../Api/ytapi";
import { VodsContainer } from "./VodsContainer"
import { cleanVodData } from "../utils/cleanVodData";

const styles = {
    background: {
        backgroundColor: '#55326d',
        paddingTop: '25px',
    },
    title: {
        color: '#ffffff',
        margin: 'auto',
        width: '50%',
        textAlign: 'center',
        marginBottom: '2vh'
    },
    button: {
        backgroundColor: '#dbc03b',
        borderRadius: '25px',
        height: '40px',
        width: '240px',
        margin: 'auto',
        textAlign: 'center',
        marginBottom: '2vh',
        
    },
    buttonWrapper: {
        margin: 'auto',
        width: '50%',
        textAlign: 'center',
        marginBottom: '2vh'
    },
    vodContainer: {
        margin: 'auto',
        width: '50%',
        textAlign: 'center',
    },
    pageButtonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '2vh',
        paddingBottom: '2vh'
    },
    pageButton: {
        backgroundColor: '#dbc03b',
        borderRadius: '25px',
        width: '110px'
    }
}

export function Home() {
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [vodList, setVodList] = useState([]);
    const [showVods, setShowVods] = useState(false);
    const [hideTeams, setHideTeams] = useState(true);
    const [page, setPage] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ytapiCalls.getVideos(page);
                setVodList(cleanVodData(response.items));
                setNextPage(response.nextPageToken)
                if (response.prevPageToken) {
                    setPrevPage(response.prevPageToken)
                } else {
                    setPrevPage("")
                }
                setShowVods(true)
            } catch (error) {
                console.error('Error fetching YouTube video data:', error);
                console.error('Error caught:', error.message);
                console.error('Error name:', error.name);
                console.error('Error stack trace:', error.stack);

                // Example: Accessing HTTP response details if available
                if (error.response) {
                    console.error('HTTP Status Code:', error.response.status);
                    console.error('Response Data:', error.response.data);
                    console.error('Response Headers:', error.response.headers);
  }
            }
        };
        fetchData()
    },[page]);

    const handleHideTeams = () => {
        setHideTeams(!hideTeams)
    }

    const backButton = "< Last Page"
    const nextButton = "Next Page >"

    return (
        <div style={styles.background}>
        <h1 style={styles.title}>Welcome to Sliggy's VODs!</h1>
        <h3 style={styles.title}>Here you will find spoiler-free links to all of Sliggy's Watch Party VODs</h3>
        <h5 style={styles.title}>Click the button below to show all team names</h5>

        <div style={styles.buttonWrapper}>
            <button style={styles.button} onClick={() => handleHideTeams()}>Toggle All Team Name Spoilers</button>
        </div>

        <div style={styles.pageButtonWrapper}>
            {prevPage !== "" && <button style={styles.pageButton} onClick={() => setPage(prevPage)}>{backButton}</button>
            || <div></div>}
            <button style={styles.pageButton} onClick={() => setPage(nextPage)}>{nextButton}</button>
        </div>

        {showVods && (
            <VodsContainer vodList={vodList} hide={hideTeams} />
        )}

        <div style={styles.pageButtonWrapper}>
            {prevPage !== "" 
            && <button style={styles.pageButton} onClick={() => setPage(prevPage)}>{backButton}</button>
            || <div></div>}
            <button style={styles.pageButton} onClick={() => setPage(nextPage)}>{nextButton}</button>
        </div>
        </div>
        
    )
}