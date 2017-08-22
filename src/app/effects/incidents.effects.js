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
var http_1 = require("@angular/http");
var effects_1 = require("@ngrx/effects");
require("rxjs/add/operator/concatMap");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var IncidentsActions = require("../actions/incidents.actions");
var IncidentEffects = (function () {
    function IncidentEffects(actions, http) {
        var _this = this;
        this.actions = actions;
        this.http = http;
        this.baseUrl = 'api/incidents';
        this.getIncidentList = this.actions
            .ofType(IncidentsActions.INCIDENT_LIST_GET)
            .map(function (action) {
            console.log('effects - action:', action);
            return _this.fetchIncidents();
        })
            .map(function (res) {
            console.log('effects - res:', res);
            return res;
        });
    }
    IncidentEffects.prototype.fetchIncidents = function () {
        return this.http
            .get("" + this.baseUrl)
            .toPromise()
            .then(function (response) {
            var data = response.json().data;
            console.log('fetchIncidents - data:', data);
            return data;
        });
    };
    return IncidentEffects;
}());
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], IncidentEffects.prototype, "getIncidentList", void 0);
IncidentEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions, http_1.Http])
], IncidentEffects);
exports.IncidentEffects = IncidentEffects;
//# sourceMappingURL=incidents.effects.js.map