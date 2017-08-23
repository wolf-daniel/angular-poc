export interface SnoozeState {
  snoozedIncidentIds: string[];
  ongoingSnoozeIncidentIds: string[];
}

export const SnoozeInitialState: SnoozeState = {
  snoozedIncidentIds: [],
  ongoingSnoozeIncidentIds: []
};
