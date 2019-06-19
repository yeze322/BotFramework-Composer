import { Boundary } from '../shared/Boundary';
import { ElementInterval } from '../shared/elementSizes';

import { measureSeqenceBoundary } from './containerBoundaryMeasurer';

const StepInterval = ElementInterval.y;
const ExtraEdgeLength = ElementInterval.y / 2;

export function sequentialLayouter(nodes, withHeadEdge = true, withTrailingEdge = true) {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return { boundary: new Boundary(), nodes: [], edges: [] };
  }

  const box = measureSeqenceBoundary(nodes, withHeadEdge, withTrailingEdge);

  nodes.reduce((offsetY, node) => {
    node.offset = { x: box.axisX - node.boundary.axisX, y: offsetY };
    return offsetY + node.boundary.height + StepInterval;
  }, 0);

  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const { id, boundary, offset } = nodes[i];
    const x = box.axisX;
    const y = boundary.height + offset.y;
    edges.push({
      id: `edge/${id}->next`,
      direction: 'y',
      x,
      y,
      length: StepInterval,
    });
  }

  if (withHeadEdge) {
    nodes.forEach(node => {
      node.offset.y += ExtraEdgeLength;
    });
    edges.forEach(edge => {
      edge.y += ExtraEdgeLength;
    });
    edges.unshift({
      id: `edge/head/${nodes[0].id}--before`,
      direction: 'y',
      x: box.axisX,
      y: 0,
      length: ExtraEdgeLength,
    });
  }

  if (withTrailingEdge) {
    edges.push({
      id: `edge/tail/${nodes[nodes.length - 1].id}--after`,
      direction: 'y',
      x: box.axisX,
      y: box.height - ExtraEdgeLength,
      length: ExtraEdgeLength,
    });
  }

  return { boundary: box, nodes, edges };
}
