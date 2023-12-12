import { useEffect, useState } from "react";
import { ytapiCalls } from "../Api/ytapi";
import { MapVodAccordion } from "./MapVod";
import React from "react";

const styles = {
    vodsWrapper: {
        margin: 'auto',
        width: '90%',
    },
    dateHeader: {
        color: 'white',
        fontSize: '25px',
        margin: 'auto',
        width: '90%',
        marginBottom: '10px',
        marginTop: '10px'
    },
    accordionWrapper: {
        alignItems: 'center'
    }
}

export function VodsContainer({ vodList, hide }) {
    return (
        <div style={styles.vodsWrapper}>
            {/* I think we want to map the vodList here to a series of accordions
             */}
            <div>
                {Object.entries(vodList).map(([date, teamsList]) => (
                    <div style={styles.accordionWrapper}>
                        <h2 style={styles.dateHeader}>{date}</h2>
                        {Object.entries(teamsList).map(([teams, videos]) => (
                            <MapVodAccordion videoData={videos} teams={teams}
                            hide={hide} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};