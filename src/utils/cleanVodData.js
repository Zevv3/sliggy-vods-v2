import { dateOptions } from "../Components/MapVod"

export class VideoData {
    constructor(title, id, team1, team2, bestOf, uploadDate) {
        this.title = title
        this.id = id
        this.team1 = team1
        this.team2 = team2
        this.bestof = bestOf
        this.mapNumber = 0
        this.uploadDate = uploadDate
    }
}

export function cleanVodData(vodData) {
    const cleanData = [];
    const sortedData = {};
    const videos = vodData;

    let i = 0
    while (i < videos.length) {
        const uploadDate = new Date(videos[i].snippet.publishedAt)
        const title = videos[i].snippet.title.toLowerCase()
        const teams = findTeams(title)
        let bestOf = 3;
        if (title.includes("final") || title.includes("finals")){
            bestOf = 5;
        }

        const seriesData = []

        const thisVideoData = new VideoData(title, videos[i].contentDetails.videoId, teams[0], teams[1], bestOf, uploadDate)
        seriesData.push(thisVideoData)

        let j = 1
        while (j < bestOf) {
            if (i + j < videos.length){
                const otherTeams = findTeams(videos[i+j].snippet.title.toLowerCase())
                const otherDate = new Date(videos[i+j].snippet.publishedAt)
                const sortedTeams = teams => teams.slice().sort();
                if (JSON.stringify(sortedTeams(teams)) === JSON.stringify(sortedTeams(otherTeams))
                    &&
                    JSON.stringify(uploadDate.getDate(), uploadDate.getMonth(), uploadDate.getFullYear() )
                    ===
                    JSON.stringify(otherDate.getDate(), otherDate.getMonth(), otherDate.getFullYear())
                    ) {
                        const otherVideoData = new VideoData(videos[i+j].snippet.title.toLowerCase(), videos[i+j].contentDetails.videoId, otherTeams[0], otherTeams[1], bestOf, otherDate)
                        seriesData.push(otherVideoData)
                        j++
                } else {
                    break
                }
            } else {
                break
            }
        }

        let numberOfDummyLinks = bestOf - j;
        let mapDiff = 0
        while (numberOfDummyLinks > 0) {
            const dummyData = new VideoData(title, '', teams[0], teams[1], bestOf, uploadDate)
            dummyData.mapNumber = bestOf - mapDiff
            cleanData.push(dummyData)
            mapDiff += 1
            numberOfDummyLinks--
        }
        
        for (let k = 0; k < seriesData.length; k++) {
            seriesData[k].mapNumber = bestOf - mapDiff
            mapDiff += 1
            cleanData.push(seriesData[k])
        }

        i += j
    };

    for (let i = 0; i < cleanData.length; i++) {
        const date = cleanData[i].uploadDate.toLocaleString("en-Us", dateOptions)
        const teams = [cleanData[i].team1, cleanData[i].team2]
        if (sortedData[date] !== null && sortedData[date] !== undefined) {
            if (sortedData[date][teams] !== null && sortedData[date][teams] !== undefined){
                sortedData[date][teams].push(cleanData[i])
            } else {
                sortedData[date][teams] = [cleanData[i]]
            }
        } else {
            sortedData[date] = {}
            sortedData[date][teams] = [cleanData[i]]

        }
    }
    console.log(sortedData)
    return sortedData
};

function findTeams(title) {
    title = title.toLowerCase()
    const regex = / v /i;
    const index = title.search(regex);
    const team1 = title.slice(0, index);

    const searchTerms = ["map", "grand", "lower", "upper", "final", "finals",
    "bind", "haven", "split", "ascent", "icebox", "breeze", "fracture", "pearl", 
    "lotus", "sunset", "playoffs", "emea"]
    
    var termIndex = []
    
    for (var i = 0; i < searchTerms.length; i++) {
        
        termIndex[i] = title.indexOf(searchTerms[i])
    }

    var minIndex = title.length
    for (var j = 0; j < termIndex.length; j++) {
        if (termIndex[j] !== -1 && termIndex[j] > index && termIndex[j] < minIndex) {
            minIndex = termIndex[j]
        }
    }

    const team2 = title.slice(index + 3, minIndex)
    console.log(team1)
    console.log(index)
    return [team1, team2]
}