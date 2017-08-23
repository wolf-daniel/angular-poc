"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var IncidentsActions = require("../actions/incidents.actions");
var SnoozeActions = require("../actions/snooze.actions");
var incidents_state_1 = require("../states/incidents.state");
function incidentListReducer(state, action) {
    if (state === void 0) { state = incidents_state_1.IncidentListInitialState; }
    switch (action.type) {
        case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
            return __assign({}, state, { incidents: action.incidents });
        case SnoozeActions.SNOOZE_REQUEST:
            return __assign({}, state, { incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = null;
                    }
                    return incident;
                }) });
        case SnoozeActions.SNOOZE_SUCCESS:
            return __assign({}, state, { incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'snoozed';
                    }
                    return incident;
                }) });
        case SnoozeActions.UNSNOOZE_REQUEST:
            return __assign({}, state, { incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                }) });
        case SnoozeActions.UNDO_SNOOZE:
            return __assign({}, state, { incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                }) });
        case IncidentsActions.SELECT_INCIDENT:
            return __assign({}, state, { selectedIncidentIds: state.selectedIncidentIds.concat([action.incidentId]) });
        case IncidentsActions.DESELECT_INCIDENT:
            return __assign({}, state, { selectedIncidentIds: state.selectedIncidentIds.filter(function (id) { return id !== action.incidentId; }) });
        default:
            return __assign({}, state);
    }
}
exports.incidentListReducer = incidentListReducer;
//# sourceMappingURL=incident-list.reducer.js.map