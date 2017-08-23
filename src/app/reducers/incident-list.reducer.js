"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncidentsActions = require("../actions/incidents.actions");
var SnoozeActions = require("../actions/snooze.actions");
var incidents_state_1 = require("../states/incidents.state");
function incidentListReducer(state, action) {
    if (state === void 0) { state = incidents_state_1.IncidentListInitialState; }
    switch (action.type) {
        case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
            return {
                incidents: action.incidents,
                selectedIncidentIds: state.selectedIncidentIds
            };
        case SnoozeActions.SNOOZE_REQUEST:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = null;
                    }
                    return incident;
                }),
                selectedIncidentIds: state.selectedIncidentIds
            };
        case SnoozeActions.SNOOZE_SUCCESS:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'snoozed';
                    }
                    return incident;
                }),
                selectedIncidentIds: state.selectedIncidentIds
            };
        case SnoozeActions.UNSNOOZE_REQUEST:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                }),
                selectedIncidentIds: state.selectedIncidentIds
            };
        case SnoozeActions.UNDO_SNOOZE:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                }),
                selectedIncidentIds: state.selectedIncidentIds
            };
        case IncidentsActions.SELECT_INCIDENT:
            return {
                incidents: state.incidents,
                selectedIncidentIds: state.selectedIncidentIds.concat([action.incidentId])
            };
        case IncidentsActions.DESELECT_INCIDENT:
            return {
                incidents: state.incidents,
                selectedIncidentIds: state.selectedIncidentIds.filter(function (id) { return id !== action.incidentId; })
            };
        default:
            return state;
    }
}
exports.incidentListReducer = incidentListReducer;
//# sourceMappingURL=incident-list.reducer.js.map