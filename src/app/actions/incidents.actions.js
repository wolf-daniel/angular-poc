"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_INCIDENT_LIST_REQUEST = 'GET_INCIDENT_LIST_REQUEST';
exports.GET_INCIDENT_LIST_SUCCESS = 'GET_INCIDENT_LIST_SUCCESS';
var GetIncidentListAction = (function () {
    function GetIncidentListAction(incidents) {
        this.incidents = incidents;
        this.type = exports.GET_INCIDENT_LIST_REQUEST;
    }
    return GetIncidentListAction;
}());
exports.GetIncidentListAction = GetIncidentListAction;
var GetIncidentListSuccessAction = (function () {
    function GetIncidentListSuccessAction(incidents) {
        this.incidents = incidents;
        this.type = exports.GET_INCIDENT_LIST_SUCCESS;
    }
    return GetIncidentListSuccessAction;
}());
exports.GetIncidentListSuccessAction = GetIncidentListSuccessAction;
//# sourceMappingURL=incidents.actions.js.map