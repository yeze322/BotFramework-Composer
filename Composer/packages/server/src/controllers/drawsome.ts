import { writeFileSync } from 'fs';

import { Request, Response } from 'express';

import settings from '../settings/settings.json';

import { Path } from './../utility/path';

async function updateDrawsomeBot(req: Request, res: Response) {
  const folderPath = Path.resolve(settings.development.defaultFolder);
  const targetPath = `${folderPath}/DrawsomeBot/Main/Main.dialog`;
  writeFileSync(targetPath, JSON.stringify(req.body, null, '\t'));
  res.status(200).json({
    path: targetPath,
    data: req.body,
  });
}

export const DrawsomeController = {
  updateDrawsomeBot,
};
