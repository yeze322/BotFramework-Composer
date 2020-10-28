// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* tslint:disable */
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    collapseGroups: true,
  });
}
