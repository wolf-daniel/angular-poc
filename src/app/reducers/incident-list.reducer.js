"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncidentsActions = require("../actions/incidents.actions");
var SnoozeActions = require("../actions/snooze.actions");
var incidents_state_1 = require("../states/incidents.state");
function incidentListReducer(state, action) {
    if (state === void 0) { state = incidents_state_1.IncidentListInitialState; }
    switch (action.type) {
        case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
            return Object.assign({}, state, {
                incidents: action.incidents,
            });
        case SnoozeActions.SNOOZE_REQUEST:
            return Object.assign({}, state, {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = null;
                    }
                    return incident;
                })
            });
        case SnoozeActions.SNOOZE_SUCCESS:
            return Object.assign({}, state, {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'snoozed';
                    }
                    return incident;
                })
            });
        case SnoozeActions.UNSNOOZE_REQUEST:
            return Object.assign({}, state, {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                })
            });
        case SnoozeActions.UNDO_SNOOZE:
            return Object.assign({}, state, {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                })
            });
        case IncidentsActions.SELECT_INCIDENT:
            return Object.assign({}, state, {
                selectedIncidentIds: state.selectedIncidentIds.concat([action.incidentId])
            });
        case IncidentsActions.DESELECT_INCIDENT:
            return Object.assign({}, state, {
                selectedIncidentIds: state.selectedIncidentIds.filter(function (id) { return id !== action.incidentId; })
            });
        default:
            return Object.assign({}, state);
    }
}
exports.incidentListReducer = incidentListReducer;
//# sourceMappingURL=incident-list.reducer.js.map