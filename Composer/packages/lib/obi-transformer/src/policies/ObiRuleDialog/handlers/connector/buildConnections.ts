import { TraceableYieldHandler } from '../../../../connectors/types/ConnectionPolicy';
import { ConnectorEdge } from '../../../../connectors/types/ConnectorResults';
import { TraceableData } from '../../../../types/TraceableData';

// Welcome should be connected to the only 'recognizer' directly.
export const yieldWelcomeConnections: TraceableYieldHandler<null> = (welcomeElements, root) => {
  return [
    {
      from: welcomeElements[0].path,
      to: root['recognizer'][0].path,
      why: 'WelcomeJump',
    },
  ];
};

// 'Intent's should be connected to the only 'recognizer' by their intent names.
export const yieldIntentConnections: TraceableYieldHandler<any> = (intentElements, root) => {
  const edges: ConnectorEdge<TraceableData<any>>[] = [];
  const recognizer = root['recognizer'][0];

  for (const intent of intentElements) {
    const intentKey = intent.data['intent'];
    const connection = recognizer.data['rules'][intentKey];

    if (connection) {
      edges.push({
        from: recognizer.path,
        to: intent.path,
        why: 'IntentJump',
        payload: {
          path: `${recognizer.path}.rules.${intentKey}`,
          data: connection,
        },
      });
    }
  }
  return edges;
};
