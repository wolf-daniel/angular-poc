"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INCIDENT_LIST_GET = 'INCIDENT_LIST_GET';
var GetIncidentList = (function () {
    function GetIncidentList(incidents) {
        this.incidents = incidents;
        this.type = exports.INCIDENT_LIST_GET;
    }
    return GetIncidentList;
}());
exports.GetIncidentList = GetIncidentList;
//# sourceMappingURL=incidents.actions.js.map