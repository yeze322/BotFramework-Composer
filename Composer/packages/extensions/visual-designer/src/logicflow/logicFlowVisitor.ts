import { FlowGroup, FlowBaseNode, FlowTypes, DecisionNode, LoopNode } from './models/LogicFlowNodes';
import { Boundary } from '../shared/Boundary';
import {
  calculateSequenceBoundary,
  calculateSwitchCaseBoundary,
  calculateForeachBoundary,
} from '../layouters/calculateNodeBoundary';
import { GraphBox } from './models/GraphBox';
import { DiamondSize, LoopIconSize } from '../shared/elementSizes';

export const dfsVisitLogicFlow = (node: FlowBaseNode, visit: (node: FlowBaseNode) => void): void => {
  if (!node || !node['@']) return;

  switch (node['@']) {
    case FlowTypes.Flow:
      (node as FlowGroup).steps.forEach(x => dfsVisitLogicFlow(x, visit));
      break;
    case FlowTypes.Decision:
      (node as DecisionNode).branches.forEach(x => dfsVisitLogicFlow(x, visit));
      break;
    case FlowTypes.Loop:
      dfsVisitLogicFlow((node as LoopNode).flow, visit);
      break;
    case FlowTypes.Element:
    default:
      break;
  }
  visit(node);
};

export const calculateNodeBoundary = (
  node: FlowBaseNode,
  measureBoundary: (id: string, nodeType: FlowTypes, data: any) => Boundary
): void => {
  if (!node || !node['@']) return;
  switch (node['@']) {
    case FlowTypes.Flow:
      node.boundary = calculateSequenceBoundary((node as FlowGroup).steps.map(x => new GraphBox(x.id, x.boundary)));
      break;
    case FlowTypes.Decision:
      node.boundary = calculateSwitchCaseBoundary(
        new GraphBox(node.id, measureBoundary(node.id, node['@'], node.data)),
        new GraphBox(node.id, new Boundary(DiamondSize.width, DiamondSize.height)),
        (node as DecisionNode).branches.map(x => new GraphBox(x.id, x.boundary))
      );
      break;
    case FlowTypes.Loop:
      node.boundary = calculateForeachBoundary(
        new GraphBox(node.id, measureBoundary(node.id, node['@'], node.data)),
        new GraphBox(node.id, (node as LoopNode).flow.boundary),
        new GraphBox(node.id, new Boundary(LoopIconSize.width, LoopIconSize.height)),
        new GraphBox(node.id, new Boundary(LoopIconSize.width, LoopIconSize.height))
      );
      break;
    case FlowTypes.Element:
    default:
      node.boundary = measureBoundary(node.id, node['@'], node.data);
      break;
  }
  console.log('measure: ', node.id, node.boundary);
};
