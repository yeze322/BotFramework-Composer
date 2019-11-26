// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { LgTemplateName, LgTemplateRefString, LgText } from './stringTypes';
import LgTemplateRef from './LgTemplateRef';

export default class LgMetaData {
  type: string;
  designerId: string;

  constructor(lgType: string, designerId: string) {
    this.type = lgType;
    this.designerId = designerId;
  }

  toLgTemplateName(): LgTemplateName {
    return `bfd${this.type}-${this.designerId}`;
  }

  toLgTemplateRef(lgParams?: string[]): LgTemplateRef {
    return new LgTemplateRef(this.toLgTemplateName(), lgParams);
  }

  toLgTemplateRefString(lgParams?: string[]): LgTemplateRefString {
    return this.toLgTemplateRef(lgParams).toString();
  }

  toLgText(lgParams?: string[]): LgText {
    return this.toLgTemplateRef(lgParams).toLgText();
  }
}
