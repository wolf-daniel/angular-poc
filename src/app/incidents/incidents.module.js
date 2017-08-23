"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var incident_list_component_1 = require("./incident-list.component");
var incident_row_component_1 = require("./incident-row.component");
var incident_snooze_button_component_1 = require("./incident-snooze-button.component");
var incident_list_reducer_1 = require("../reducers/incident-list.reducer");
var snooze_reducer_1 = require("../reducers/snooze.reducer");
var folders_reducer_1 = require("../reducers/folders.reducer");
var incidents_effects_1 = require("../effects/incidents.effects");
var snooze_effects_1 = require("../effects/snooze.effects");
var folders_menu_component_1 = require("../folders/folders-menu.component");
var incidents_backend_service_1 = require("../backend/incidents-backend.service");
var snooze_backend_service_1 = require("../backend/snooze-backend.service");
var IncidentsModule = (function () {
    function IncidentsModule() {
    }
    return IncidentsModule;
}());
IncidentsModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            store_1.StoreModule.forRoot({
                incidentList: incident_list_reducer_1.incidentListReducer,
                snooze: snooze_reducer_1.snoozeReducer,
                folders: folders_reducer_1.foldersReducer
            }),
            effects_1.EffectsModule.forRoot([incidents_effects_1.IncidentEffects, snooze_effects_1.SnoozeEffects]),
        ],
        declarations: [
            folders_menu_component_1.FoldersMenu,
            incident_list_component_1.IncidentList,
            incident_row_component_1.IncidentRow,
            incident_snooze_button_component_1.IncidentSnoozeButton
        ],
        providers: [
            incidents_backend_service_1.IncidentsBackendService,
            snooze_backend_service_1.SnoozeBackendService
        ]
    })
], IncidentsModule);
exports.IncidentsModule = IncidentsModule;
//# sourceMappingURL=incidents.module.js.map