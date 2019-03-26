import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ObiEditor } from '../components/obi-editor/ObiEditor';
import { checkTransformability } from '../transformers/autoTransform';
import { ActionTypes } from '../transformers/constants/ActionTypes';

/**
 * ResponsiveObiEditor is an encapsulation of the controlled component ObiEditor.
 * (Though ObiEditor was named as 'editor', it doesn't support editing yet;
 * so it's fully controlled for now.)
 *
 * ResponsiveObiEditor could be considered as a temporary implementation for
 * supporting some unfinalized behaviors. For example, navigating to a sub view
 * of 'steps' in OBI rules after clicking on an IntentRule node; or returning
 * to the father view after clicking the return node.
 *
 * Those unfinalized behaviors make the passed-in props not always consistent
 * with displayed data. Therefore, it's necessary to encapsulate the controlled
 * component 'ObiEditor' to a container. Considering the view switching behavior
 * we want to support, it's named as 'ResponsiveObiEditor'.
 */
export class ResponsiveObiEditor extends Component {
  state = {
    displayedJson: {},
    passedInJson: {},
  };

  constructor(props) {
    super(props);
  }

  /**
   * getDerivedStateFromProps exists for only one purpose. It enables a component
   * to update its internal state as the result of changes in props.
   * ref: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.passedInJson) {
      const obiJson = props.data;
      return {
        displayedJson: obiJson,
        passedInJson: obiJson,
      };
    }
    return null;
  }

  onClickNode(data) {
    if (checkTransformability(data)) {
      // Trigger a view change.
      this.setState({ displayedJson: data });
    } else {
      // TODO: determine when should form editor be triggered.
      switch (data.$type) {
        case ActionTypes.Navigation:
          this.setState({
            displayedJson: this.state.passedInJson,
          });
          break;
        default:
          break;
      }
    }

    // Bubbling the click event anyway to triger FormEditor.
    this.props.onClickDialog(data);
  }

  render() {
    const { width, height } = this.props;
    const { displayedJson } = this.state;
    return <ObiEditor data={displayedJson} width={width} height={height} onClickDialog={e => this.onClickNode(e)} />;
  }
}

ResponsiveObiEditor.propTypes = {
  // Obi raw json
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onClickDialog: PropTypes.func,
};
