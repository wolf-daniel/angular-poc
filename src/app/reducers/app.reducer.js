"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var incident_list_reducer_1 = require("./incident-list.reducer");
var reducers = {
    incidentList: incident_list_reducer_1.incidentListReducer
};
function AppReducer() {
    return store_1.combineReducers(reducers);
}
exports.AppReducer = AppReducer;
//# sourceMappingURL=app.reducer.js.map