// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Card, Tag } from 'antd';

import { StoreContext } from './store/StoreContext';
import { Project } from './store';
import './cardOverride.css';

type TriggerType = string;

interface DialogOverview {
  name: string;
  triggers: TriggerType[];
}

type ProjectOverview = DialogOverview[];

const TriggerUnit: React.FC<{ trigger: TriggerType; index: number }> = ({ trigger, index }) => {
  return <Card.Grid style={{ width: '100%' }}>{`[${index}] ${trigger}`}</Card.Grid>;
};

const DialogOverview: React.FC<{ dialog: DialogOverview }> = ({ dialog }) => {
  const title = <h2>{dialog.name}</h2>;
  return (
    <Card title={title} style={{ width: 300, margin: '20px 0' }}>
      {dialog.triggers.map(($type, index) => (
        <TriggerUnit key={`tag:${dialog.name}/triggers[${index}]`} trigger={$type} index={index} />
      ))}
    </Card>
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
