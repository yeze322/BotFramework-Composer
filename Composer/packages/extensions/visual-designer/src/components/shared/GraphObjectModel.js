import React from 'react';

import { Boundary } from './Boundary';

export class GraphObjectModel {
  id = '';
  data = {};
  ref = React.createRef();
  boundary = new Boundary();
  offset = { x: 0, y: 0 };
}
