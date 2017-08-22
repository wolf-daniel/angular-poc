import {Incident} from '../incidents/incident';

export interface IncidentListState {
  incidents: Incident[];
}

export const IncidentListInitialState: IncidentListState = {
  incidents: []
};
