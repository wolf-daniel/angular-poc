export interface SnoozeState {
  snoozedIncidentIds: string[];
  ongoing: {
    id: string,
    confirmed: boolean
  };
}

export const SnoozeInitialState: SnoozeState = {
  snoozedIncidentIds: [],
  ongoing: {
    id: null,
    confirmed: false
  }
};
