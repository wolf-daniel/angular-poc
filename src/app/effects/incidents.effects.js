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
var effects_1 = require("@ngrx/effects");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
var IncidentsActions = require("../actions/incidents.actions");
var incidents_actions_1 = require("../actions/incidents.actions");
var incidents_backend_service_1 = require("../backend/incidents-backend.service");
var IncidentEffects = (function () {
    function IncidentEffects(actions, incidentsBackendService) {
        var _this = this;
        this.actions = actions;
        this.incidentsBackendService = incidentsBackendService;
        this.getIncidentList = this.actions
            .ofType(IncidentsActions.GET_INCIDENT_LIST_REQUEST)
            .mergeMap(function () { return _this.incidentsBackendService.fetchIncidents()
            .map(function (incidents) { return new incidents_actions_1.GetIncidentListSuccessAction(incidents); }); });
    }
    return IncidentEffects;
}());
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], IncidentEffects.prototype, "getIncidentList", void 0);
IncidentEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions, incidents_backend_service_1.IncidentsBackendService])
], IncidentEffects);
exports.IncidentEffects = IncidentEffects;
//# sourceMappingURL=incidents.effects.js.map