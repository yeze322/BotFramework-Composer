// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, ReactNode } from 'react';

import { StandardNodeWidth, HeaderHeight, StandardSectionHeight } from '../../../constants/ElementSizes';
import { ObiColors } from '../../../constants/ElementColors';

const containerCSS = css`
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  background-color: white;
  border-radius: 2px 2px 0 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const headerCSS = css`
  font-family: Segoe UI;
  font-size: 12px;
  line-height: 14px;
  color: black;
`;

const fullWidthSection = css`
  width: 100%;
  box-sizing: border-box;
`;

export interface CardTemplateProps {
  header: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickHeader?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickBody?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickFooter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const CardTemplate: FC<CardTemplateProps> = ({
  header,
  body,
  footer,
  onClick,
  onClickHeader,
  onClickBody,
  onClickFooter,
}) => {
  const renderHeader = (header: ReactNode) => (
    <div
      className="CardNode__Header"
      css={css`
        ${headerCSS};
        ${fullWidthSection};
        height: ${HeaderHeight}px;
      `}
      onClick={onClickHeader}
    >
      {header}
    </div>
  );

  const renderBody = (body: ReactNode) => (
    <div
      className="CardNode__Body"
      css={css`
        ${fullWidthSection};
        min-height: ${StandardSectionHeight}px;
        padding: 2px 8px;
      `}
      onClick={onClickBody}
    >
      <div
        css={{
          paddingTop: '3px',
          whiteSpace: 'initial',
          fontSize: '12px',
          lineHeight: '14px',
          fontFamily: 'Segoe UI',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
          display: 'inline-block',
        }}
      >
        {body}
      </div>
    </div>
  );

  const renderFooter = (footer: ReactNode) => (
    <div
      className="CardNode__Footer"
      css={css`
        ${fullWidthSection};
        min-height: ${StandardSectionHeight}px;
        padding: 2px 8px;
        border-top: 1px solid ${ObiColors.AzureGray3};
      `}
      onClick={onClickFooter}
    >
      {footer}
    </div>
  );
  const renderSeparateline = () => (
    <div style={{ borderBottom: '1px solid grey', height: 1, width: StandardNodeWidth }}></div>
  );
  return (
    <div
      className="CardNode"
      css={css`
        ${containerCSS};
        width: ${StandardNodeWidth}px;
        min-height: ${HeaderHeight}px;
      `}
      onClick={
        onClick
          ? e => {
              e.stopPropagation();
              onClick(e);
            }
          : undefined
      }
    >
      {renderHeader(header)}
      {body && renderBody(body)}
      {body && footer && renderSeparateline()}
      {footer && renderFooter(footer)}
    </div>
  );
};
