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
var core_2 = require("@angular/core");
var angular2_virtual_scroll_1 = require("angular2-virtual-scroll");
var incidents_component_1 = require("./incidents.component");
var incident_list_component_1 = require("./incident-list/incident-list.component");
var incident_row_component_1 = require("./incident-row/incident-row.component");
var incident_snooze_button_component_1 = require("./incident-snooze-button/incident-snooze-button.component");
var folders_menu_component_1 = require("../folders/folders-menu.component");
var incidents_backend_service_1 = require("../../backend/incidents-backend.service");
var snooze_backend_service_1 = require("../../backend/snooze-backend.service");
var snooze_message_component_1 = require("./snooze-message/snooze-message.component");
var incident_checked_component_1 = require("./incident-checked/incident-checked.component");
var incident_list_top_bar_component_1 = require("./incident-list-top-bar/incident-list-top-bar.component");
var incidents_store_1 = require("../../stores/incidents.store");
var folders_backend_service_1 = require("../../backend/folders-backend.service");
var folders_store_1 = require("../../stores/folders.store");
var snooze_store_1 = require("../../stores/snooze.store");
var socket_util_service_1 = require("../../utils/socket-util.service");
var IncidentsModule = (function () {
    function IncidentsModule() {
    }
    return IncidentsModule;
}());
IncidentsModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            angular2_virtual_scroll_1.VirtualScrollModule
        ],
        declarations: [
            incidents_component_1.Incidents,
            folders_menu_component_1.FoldersMenu,
            incident_list_component_1.IncidentList,
            incident_row_component_1.IncidentRow,
            incident_checked_component_1.IncidentChecked,
            incident_snooze_button_component_1.IncidentSnoozeButton,
            incident_list_top_bar_component_1.IncidentListTopBar,
            snooze_message_component_1.SnoozeMessage
        ],
        providers: [
            incidents_backend_service_1.IncidentsBackendService,
            snooze_backend_service_1.SnoozeBackendService,
            folders_backend_service_1.FoldersBackendService,
            incidents_store_1.default,
            folders_store_1.default,
            snooze_store_1.default,
            socket_util_service_1.default,
            {
                provide: core_2.APP_INITIALIZER,
                useFactory: function (socketUtil) { return function () { return socketUtil.connect(); }; },
                deps: [socket_util_service_1.default],
                multi: true
            }
        ]
    })
], IncidentsModule);
exports.IncidentsModule = IncidentsModule;
//# sourceMappingURL=incidents.module.js.map