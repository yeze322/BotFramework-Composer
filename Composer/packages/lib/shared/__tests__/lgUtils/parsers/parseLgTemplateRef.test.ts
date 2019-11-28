// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { LgTemplateRef } from '../../../src';
import parseLgTemplateRef from '../../../src/lgUtils/parsers/parseLgTemplateRef';

describe('parseLgTemplateRef', () => {
  it('should return null when inputs are invalid', () => {
    expect(parseLgTemplateRef('')).toEqual(null);
    expect(parseLgTemplateRef('xxx')).toEqual(null);
    expect(parseLgTemplateRef('[0]')).toEqual(null);
  });

  it('should return LgTemplateRef when inputs are valid', () => {
    const a = parseLgTemplateRef('[bfdactivity-123456]');
    expect(a).toEqual(new LgTemplateRef('bfdactivity-123456'));

    const b = parseLgTemplateRef('[greeting(1,2)]');
    expect(b).toEqual(new LgTemplateRef('greeting', ['1', '2']));
  });
});
