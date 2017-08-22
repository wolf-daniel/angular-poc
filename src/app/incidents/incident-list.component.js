"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var IncidentsActions = require("../actions/incidents.actions");
var IncidentList = (function () {
    function IncidentList(store) {
        this.store = store;
        this.incidents$ = store.select('incidents');
    }
    IncidentList.prototype.ngOnInit = function () {
        this.store.dispatch({
            type: IncidentsActions.INCIDENT_LIST_GET
        });
    };
    return IncidentList;
}());
IncidentList = __decorate([
    core_1.Component({
        selector: 'incident-list',
        templateUrl: './incident-list.component.html',
        styleUrls: ['./incident-list.component.css']
    }),
    __metadata("design:paramtypes", [store_1.Store])
], IncidentList);
exports.IncidentList = IncidentList;
//# sourceMappingURL=incident-list.component.js.map