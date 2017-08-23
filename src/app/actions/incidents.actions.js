"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_INCIDENT_LIST_REQUEST = 'GET_INCIDENT_LIST_REQUEST';
exports.GET_INCIDENT_LIST_SUCCESS = 'GET_INCIDENT_LIST_SUCCESS';
exports.SELECT_INCIDENT = 'SELECT_INCIDENT';
exports.DESELECT_INCIDENT = 'DESELECT_INCIDENT';
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
var SelectIncidentAction = (function () {
    function SelectIncidentAction(incidentId) {
        this.incidentId = incidentId;
        this.type = exports.SELECT_INCIDENT;
    }
    return SelectIncidentAction;
}());
exports.SelectIncidentAction = SelectIncidentAction;
var DeselectIncidentAction = (function () {
    function DeselectIncidentAction(incidentId) {
        this.incidentId = incidentId;
        this.type = exports.DESELECT_INCIDENT;
    }
    return DeselectIncidentAction;
}());
exports.DeselectIncidentAction = DeselectIncidentAction;
//# sourceMappingURL=incidents.actions.js.map