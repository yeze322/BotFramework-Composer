// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { LgMetaData } from '../../../src';

describe('LgMetaData', () => {
  it('can construct an instance via constructor', () => {
    const instance = new LgMetaData('activity', '123456');

    expect(instance.type).toEqual('activity');
    expect(instance.designerId).toEqual('123456');

    expect(instance.toLgTemplateName).toBeDefined();
    expect(instance.toLgTemplateRef).toBeDefined();
    expect(instance.toLgTemplateRefString).toBeDefined();
  });

  it('can generate correct output strings', () => {
    const instance = new LgMetaData('activity', '123456');

    expect(instance.toLgTemplateName()).toEqual('bfdactivity-123456');

    expect(instance.toLgTemplateRefString()).toEqual('[bfdactivity-123456]');
    expect(instance.toLgTemplateRefString(['1', '2'])).toEqual('[bfdactivity-123456(1,2)]');
  });

  it('can construct instance via `parse()` method', () => {
    expect(LgMetaData.parse('bfdactivity-123456')).toBeInstanceOf(LgMetaData);
  });
});
