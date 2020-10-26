import styled from 'styled-components';

import customizableComponent from '~/core/hocs/customization';

import UITabs from '~/core/components/Tabs';

export const FeedHeaderTabs = styled(UITabs)`
  background: #ffffff;
  border-radius: 4px 4px 0 0;
  border: 1px solid #edeef2;
`;

export default customizableComponent('FeedHeaderTabs', FeedHeaderTabs);
