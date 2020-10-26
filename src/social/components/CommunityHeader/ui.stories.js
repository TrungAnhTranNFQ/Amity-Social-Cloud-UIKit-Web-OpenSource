import React from 'react';

import StyledCommunityHeader from './styles';

export default {
  title: 'Ui Only/Social/Community',
};

export const UiCommunityHeader = args => <StyledCommunityHeader {...args} />;

UiCommunityHeader.storyName = 'Header';

UiCommunityHeader.args = {
  communityId: 'communityId',
  isActive: false,
  avatarFileUrl: 'https://via.placeholder.com/150x150',
  searchInput: '',
  isSearchResult: false,
};

UiCommunityHeader.argTypes = {
  communityId: { control: { type: 'text' } },
  isActive: { control: { type: 'boolean' } },
  avatarFileUrl: { control: { type: 'text' } },
  onClick: { action: 'onClick()' },
  isSearchResult: { control: { type: 'boolean' } },
  searchInput: { control: { type: 'text' } },
};
