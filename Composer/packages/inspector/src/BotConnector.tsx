// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

import { StoreContext } from './store/StoreContext';
import { init } from './actions/messengerActions';
import { RuntimeUrl } from './messengers/config';

export const BotConnector = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [url, setUrl] = useState(RuntimeUrl);
  const [loading, setLoading] = useState(false);

  const connectBot = () => {
    setLoading(true);
    const tracePromise = axios({
      method: 'get',
      url: RuntimeUrl + '/api/dialog',
    }).then(response => {
      return response.data;
    });

    const projectPromise = axios({
      method: 'get',
      url: RuntimeUrl + '/api/resource',
    }).then(response => response.data);

    Promise.all([tracePromise, projectPromise]).then(([trace, project]) => {
      setLoading(false);
      dispatch(init({ project, trace }));
    });
  };

  return (
    <div>
      <input value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={connectBot}>Connect</button>
      <Spin tip="Connecting..." spinning={loading} />
    </div>
  );
};
