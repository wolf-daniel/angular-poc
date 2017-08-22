"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncidentsActions = require("../actions/incidents.actions");
var incidents_state_1 = require("../states/incidents.state");
function incidentListReducer(state, action) {
    if (state === void 0) { state = incidents_state_1.IncidentListInitialState; }
    console.log('state:', state, 'action:', action);
    switch (action.type) {
        case IncidentsActions.INCIDENT_LIST_GET:
            return {
                incidents: action.incidents
            };
        default:
            return state;
    }
}
exports.incidentListReducer = incidentListReducer;
//# sourceMappingURL=incident-list.reducer.js.map