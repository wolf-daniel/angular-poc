import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      incidents: [
        {
          id: '1',
          status: 'CRITICAL',
          sourceSystem: 'nagios',
          folderId: 'active',
          entities: [
            {
              id: '101',
              host: 'api-1',
              check: 'aaa'
            }
          ]
        },
        {
          id: '2',
          status: 'WARNING',
          sourceSystem: 'new relic',
          folderId: 'snoozed',
          entities: [
            {
              id: '201',
              host: 'mongo-1',
              check: 'aaa'
            },
            {
              id: '202',
              host: 'mongo-1',
              check: 'bbb'
            }
          ]
        },
        {
          id: '3',
          status: 'CRITICAL',
          sourceSystem: 'sentry',
          folderId: 'active',
          entities: [
            {
              id: '301',
              host: 'api-2',
              check: 'aaa'
            }
          ]
        },
        {
          id: '4',
          status: 'RESOLVED',
          sourceSystem: 'sentry',
          folderId: 'active',
          entities: [
            {
              id: '401',
              host: 'perf-1',
              check: 'aaa'
            }
          ]
        }
      ],
      snooze: [
        {
          id: '2'
        }
      ],
      heroes: [
        { id: 0,  name: 'Zero' },
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ]
    };
  }
}
