"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanVodData = cleanVodData;
exports.VideoData = void 0;

var _MapVod = require("../Components/MapVod");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoData = function VideoData(title, id, team1, team2, bestOf, uploadDate) {
  _classCallCheck(this, VideoData);

  this.title = title;
  this.id = id;
  this.team1 = team1;
  this.team2 = team2;
  this.bestof = bestOf;
  this.mapNumber = 0;
  this.uploadDate = uploadDate;
};

exports.VideoData = VideoData;

function cleanVodData(vodData) {
  var cleanData = [];
  var sortedData = {};
  var videos = vodData;
  var i = 0;

  while (i < videos.length) {
    var uploadDate = new Date(videos[i].snippet.publishedAt);
    var title = videos[i].snippet.title.toLowerCase();
    var teams = findTeams(title);
    var bestOf = 3;

    if (title.includes("final") || title.includes("finals")) {
      bestOf = 5;
    }

    var seriesData = [];
    var thisVideoData = new VideoData(title, videos[i].contentDetails.videoId, teams[0], teams[1], bestOf, uploadDate);
    seriesData.push(thisVideoData);
    var j = 1;

    while (j < bestOf) {
      if (i + j < videos.length) {
        var otherTeams = findTeams(videos[i + j].snippet.title.toLowerCase());
        var otherDate = new Date(videos[i + j].snippet.publishedAt);

        var sortedTeams = function sortedTeams(teams) {
          return teams.slice().sort();
        };

        if (JSON.stringify(sortedTeams(teams)) === JSON.stringify(sortedTeams(otherTeams)) && JSON.stringify(uploadDate.getDate(), uploadDate.getMonth(), uploadDate.getFullYear()) === JSON.stringify(otherDate.getDate(), otherDate.getMonth(), otherDate.getFullYear())) {
          var otherVideoData = new VideoData(videos[i + j].snippet.title.toLowerCase(), videos[i + j].contentDetails.videoId, otherTeams[0], otherTeams[1], bestOf, otherDate);
          seriesData.push(otherVideoData);
          j++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    var numberOfDummyLinks = bestOf - j;
    var mapDiff = 0;

    while (numberOfDummyLinks > 0) {
      var dummyData = new VideoData(title, '', teams[0], teams[1], bestOf, uploadDate);
      dummyData.mapNumber = bestOf - mapDiff;
      cleanData.push(dummyData);
      mapDiff += 1;
      numberOfDummyLinks--;
    }

    for (var k = 0; k < seriesData.length; k++) {
      seriesData[k].mapNumber = bestOf - mapDiff;
      mapDiff += 1;
      cleanData.push(seriesData[k]);
    }

    i += j;
  }

  ;

  for (var _i = 0; _i < cleanData.length; _i++) {
    var date = cleanData[_i].uploadDate.toLocaleString("en-Us", _MapVod.dateOptions);

    var _teams = [cleanData[_i].team1, cleanData[_i].team2];

    if (sortedData[date] !== null && sortedData[date] !== undefined) {
      if (sortedData[date][_teams] !== null && sortedData[date][_teams] !== undefined) {
        sortedData[date][_teams].push(cleanData[_i]);
      } else {
        sortedData[date][_teams] = [cleanData[_i]];
      }
    } else {
      sortedData[date] = {};
      sortedData[date][_teams] = [cleanData[_i]];
    }
  }

  console.log(sortedData);
  return sortedData;
}

;

function findTeams(title) {
  title = title.toLowerCase();
  var regex = / v /i;
  var index = title.search(regex);
  var team1 = title.slice(0, index);
  var searchTerms = ["map", "grand", "lower", "upper", "final", "finals", "bind", "haven", "split", "ascent", "icebox", "breeze", "fracture", "pearl", "lotus", "sunset", "playoffs", "emea"];
  var termIndex = [];

  for (var i = 0; i < searchTerms.length; i++) {
    termIndex[i] = title.indexOf(searchTerms[i]);
  }

  var minIndex = title.length;

  for (var j = 0; j < termIndex.length; j++) {
    if (termIndex[j] !== -1 && termIndex[j] > index && termIndex[j] < minIndex) {
      minIndex = termIndex[j];
    }
  }

  var team2 = title.slice(index + 3, minIndex);
  console.log(team1);
  console.log(index);
  return [team1, team2];
}