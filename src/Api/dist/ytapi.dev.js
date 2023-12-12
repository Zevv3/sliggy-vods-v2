"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ytapiCalls = void 0;

var _Secrets = require("../Secrets");

var playistId = "UU686rU5x6L1KoPL5kE9RL4Q";
var url = "https://youtube.googleapis.com/youtube/v3";
var ytapiCalls = {
  getVideos: function getVideos() {
    var page,
        response,
        _args = arguments;
    return regeneratorRuntime.async(function getVideos$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(url, "/playlistItems?part=snippet,contentDetails,status&playlistId=").concat(playistId, "&maxResults=50&pageToken=").concat(page, "&key=").concat(_Secrets.API_KEY), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 6;
              break;
            }

            throw new Error('Failed to fetch playlist data from YouTube');

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(response.json());

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
exports.ytapiCalls = ytapiCalls;