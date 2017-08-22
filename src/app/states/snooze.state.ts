export interface SnoozeState {
  snoozedIncidentIds: string[];
}

export const SnoozeInitialState: SnoozeState = {
  snoozedIncidentIds: []
};
