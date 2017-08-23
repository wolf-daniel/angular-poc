import {Incident} from '../incidents/incident';

export interface IncidentListState {
  incidents: Incident[];
  selectedIncidentIds: string[];
}

export const IncidentListInitialState: IncidentListState = {
  incidents: [],
  selectedIncidentIds: []
};
