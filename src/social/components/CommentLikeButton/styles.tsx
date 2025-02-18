import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components';
import {SecondaryButton} from '~/core/components/Button';
import {ThumbsUp} from '~/icons';
import {FormattedMessage} from "react-intl";

const isLikedStyle = css`
  color: ${({theme}) => theme.palette.primary.main};
`;

export const StyledLikeButton = styled(SecondaryButton)`
  background-color: transparent;
  ${({active}) => active && isLikedStyle}

  > :not(:first-child) {
    margin-left: 5px;
  }
`;

export const BaseLikeIcon = styled(ThumbsUp)<{ icon?: ReactNode }>`
  font-size: 16px;
`;

export const IsLikedLikeIcon = styled(BaseLikeIcon)<{ icon?: ReactNode }>`
  ${isLikedStyle}
`;

export const LikeIcon = ({isLiked}: { isLiked?: boolean }) =>
    isLiked ? <IsLikedLikeIcon/> : <BaseLikeIcon/>;

interface StyledCommentLikeButtonProps {
    isActive?: boolean;
    isDisabled?: boolean;
    totalLikes?: number;
    onClick?: () => void;
}

const StyledCommentLikeButton = ({
                                     onClick,
                                     isActive,
                                     isDisabled,
                                     totalLikes,
                                 }: StyledCommentLikeButtonProps) => (
    <StyledLikeButton active={isActive} disabled={isDisabled} onClick={onClick}>
        {/*<LikeIcon isLiked={isActive}/>*/}
        <i className="fa-duotone fa-thumbs-up !text-lg mr-2"></i> {totalLikes && totalLikes > 0 ?
        <span className="mr-1">{totalLikes}</span> : ''} <FormattedMessage
        id={isActive ? 'post.liked' : 'post.like'}/>
    </StyledLikeButton>
);

export default StyledCommentLikeButton;
