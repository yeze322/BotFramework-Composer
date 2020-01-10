// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, useState } from 'react';
import axios from 'axios';

import { StoreContext } from './store/StoreContext';
import { setProject } from './actions/messengerActions';
import { RuntimeUrl } from './messengers/config';

export const BotConnector = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [url, setUrl] = useState(RuntimeUrl);

  const connectBot = () => {
    axios({
      method: 'get',
      url: RuntimeUrl + '/api/dialog',
    }).then(response => {
      console.log('data = ', response.data);
      dispatch(setProject(response.data));
    });
  };

  return (
    <div>
      <input value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={connectBot}>Connect</button>
    </div>
  );
};
