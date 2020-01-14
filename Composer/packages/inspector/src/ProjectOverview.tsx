// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Tag } from 'antd';

import { StoreContext } from './store/StoreContext';
import { Project } from './store';

type TriggerType = string;

interface DialogOverview {
  name: string;
  triggers: TriggerType[];
}

type ProjectOverview = DialogOverview[];

const TriggerUnit: React.FC<{ trigger: TriggerType; index: number }> = ({ trigger, index }) => {
  const displayedText = trigger.replace('Microsoft.On', '').replace('Microsoft.', '');
  return (
    <Tag
      title={trigger}
      style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis' }}
    >{`[${index}] ${displayedText}`}</Tag>
  );
};

const DialogOverview: React.FC<{ dialog: DialogOverview }> = ({ dialog }) => {
  return (
    <div style={{ width: 150, margin: 10, padding: 10, border: '1px solid black' }}>
      <div>
        <b>Dialog: </b>
        {dialog.name}
      </div>
      <div>
        <b>{dialog.triggers.length} Triggers: </b>
        {dialog.triggers.map(($type, index) => (
          <TriggerUnit key={`tag:${dialog.name}/triggers[${index}]`} trigger={$type} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectOverview: React.FC<{ project: ProjectOverview }> = ({ project }) => {
  return (
    <div>
      {project.map((dialog, index) => (
        <DialogOverview key={`dialogs[${index}]`} dialog={dialog} />
      ))}
    </div>
  );
};
const ProjectOverviewMemo = React.memo(ProjectOverview);

/**
 * Put Main dialog ahead.
 */
const sortDialogNames = (names: string[]): string[] => {
  const mainIndex = names.findIndex(x => x === 'Main' || x === 'main');
  if (mainIndex === -1) return names;

  const resultNames = [...names];
  const mainDialogs = resultNames.splice(mainIndex, 1);
  resultNames.sort();
  return [...mainDialogs, ...resultNames];
};

/** Outline input project json */
const getProjectOverview = (project: Project): ProjectOverview => {
  const dialogNames = sortDialogNames(Object.keys(project));

  return dialogNames.reduce((overviews, dialogName) => {
    const dialogRaw = project[dialogName];
    const dialogOverview: DialogOverview = {
      name: dialogName,
      triggers: dialogRaw.triggers.map(trigger => trigger.$type),
    };
    return [...overviews, dialogOverview];
  }, [] as ProjectOverview);
};

export const ProjectOverviewContainer = () => {
  const { store } = useContext(StoreContext);
  const { project } = store;
  const projectOverview = getProjectOverview(project);
  return <ProjectOverviewMemo project={projectOverview} />;
};
