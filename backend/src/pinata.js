"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCIDHelia = putCIDHelia;
exports.getFromCID = getFromCID;
var pinata_1 = require("pinata");
var PRIVATE_CONSTANTS_1 = require("./PRIVATE_CONSTANTS");
var unixfs_1 = require("@helia/unixfs");
var http_1 = require("@helia/http");
var pinata = new pinata_1.PinataSDK({
    pinataJwt: PRIVATE_CONSTANTS_1.JWT,
    pinataGateway: PRIVATE_CONSTANTS_1.IPFS_GATEWAY_URL,
});
function putCIDHelia(data) {
    return __awaiter(this, void 0, void 0, function () {
        var helia, fs, fileCid, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, http_1.createHeliaHTTP)()];
                case 1:
                    helia = _a.sent();
                    fs = (0, unixfs_1.unixfs)(helia);
                    return [4 /*yield*/, fs.addBytes(new TextEncoder().encode(data))];
                case 2:
                    fileCid = _a.sent();
                    res = fs.cat(fileCid);
                    console.log(res);
                    return [2 /*return*/, res];
            }
        });
    });
}
function getFromCID(CID) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, signedUrlRequest, signedUrl, request, contentType, data, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(CID);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    payload = JSON.stringify({
                        url: PRIVATE_CONSTANTS_1.IPFS_GATEWAY_URL + CID,
                        expires: 500000, // Number of seconds
                        date: new Date().getTime(), // Current date
                        method: "GET" // GET for retrieving files
                    });
                    return [4 /*yield*/, fetch("https://api.pinata.cloud/v3/files/sign", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(PRIVATE_CONSTANTS_1.JWT),
                            },
                            body: payload
                        })];
                case 2:
                    signedUrlRequest = _b.sent();
                    return [4 /*yield*/, signedUrlRequest.json()];
                case 3:
                    signedUrl = _b.sent();
                    return [4 /*yield*/, fetch(signedUrl.data)];
                case 4:
                    request = _b.sent();
                    contentType = ((_a = request.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.split(";")[0]) || null;
                    data = void 0;
                    if (!(contentType === null || contentType === void 0 ? void 0 : contentType.includes("application/json"))) return [3 /*break*/, 6];
                    return [4 /*yield*/, request.json()];
                case 5:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 6:
                    if (!(contentType === null || contentType === void 0 ? void 0 : contentType.includes("text/"))) return [3 /*break*/, 8];
                    return [4 /*yield*/, request.text()];
                case 7:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, request.blob()];
                case 9:
                    data = _b.sent();
                    _b.label = 10;
                case 10:
                    console.log(data);
                    return [2 /*return*/, data];
                case 11:
                    error_1 = _b.sent();
                    console.log("error", error_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
