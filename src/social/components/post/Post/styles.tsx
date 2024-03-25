import cx from 'clsx';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import UIOptionMenu from '~/core/components/OptionMenu';
import Skeleton from '~/core/components/Skeleton';

export const OptionMenu = styled(UIOptionMenu)<{ icon?: ReactNode }>`
  margin-left: auto;
`;

const PlainPostContainer = ({
                                className,
                                ...props
                            }: {
    className?: string;
    children?: ReactNode;
}) => <div className={cx('post', className)} {...props} />;

export const PostContainer = styled(PlainPostContainer)`
  padding: 1rem; /* Equivalent to 16px */
  background-color: #ffffff; /* White background */
  border: 1px solid #edeef2; /* Border */
  border-radius: 0.5rem; /* Equivalent to 4px */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
  margin-bottom: 1rem;
`;
export const PostHeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const ReviewButtonsContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.palette.base.shade4};
  margin-top: 6px;
  padding-top: 12px;
  display: flex;

  > * {
    flex: 1 1 0;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }
`;

export const ContentSkeleton = () => {
    return (
        <>
            <div>
                <Skeleton style={{fontSize: 8, maxWidth: 374}}/>
            </div>
            <div>
                <Skeleton style={{fontSize: 8, maxWidth: 448}}/>
            </div>
            <div style={{paddingBottom: 50}}>
                <Skeleton style={{fontSize: 8, maxWidth: 279}}/>
            </div>
        </>
    );
};
