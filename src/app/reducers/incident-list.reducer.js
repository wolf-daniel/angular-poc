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
                incidents: action.incidents
            };
        case SnoozeActions.SNOOZE_REQUEST:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'snoozed';
                    }
                    return incident;
                })
            };
        case SnoozeActions.UNSNOOZE_REQUEST:
            return {
                incidents: state.incidents.map(function (incident) {
                    if (incident.id === action.incidentId) {
                        incident.folderId = 'active';
                    }
                    return incident;
                })
            };
        default:
            return state;
    }
}
exports.incidentListReducer = incidentListReducer;
//# sourceMappingURL=incident-list.reducer.js.map