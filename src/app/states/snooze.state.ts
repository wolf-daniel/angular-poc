export interface SnoozeState {
  snoozedIncidentIds: string[];
  ongoingSnoozeIncidentIds: string[];
  ongoing: {
    id: string,
    confirmed: boolean
  };
}

export const SnoozeInitialState: SnoozeState = {
  snoozedIncidentIds: [],
  ongoingSnoozeIncidentIds: [],
  ongoing: {
    id: null,
    confirmed: false
  }
};
