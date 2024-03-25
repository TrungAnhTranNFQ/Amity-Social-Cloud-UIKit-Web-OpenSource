import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {PageTypes} from '~/social/constants';

import MainLayout from '~/social/layouts/Main';

import CommunitySideMenu from '~/social/components/CommunitySideMenu';

import ExplorePage from '~/social/pages/Explore';
import NewsFeedPage from '~/social/pages/NewsFeed';
import CommunityFeedPage from '~/social/pages/CommunityFeed';
import UserFeedPage from '~/social/pages/UserFeed';
import CategoryCommunitiesPage from '~/social/pages/CategoryCommunities';
import CommunityEditPage from '~/social/pages/CommunityEdit';
import ProfileSettings from '~/social/components/ProfileSettings';
import {useNavigation} from '~/social/providers/NavigationProvider';
import useSDK from '~/core/hooks/useSDK';
import {ViewStoriesPage} from '~/social/v4/pages/StoryPage';
import {usePageBehavior} from '~/social/v4/providers/PageBehaviorProvider';
import useCommunitiesCollection from "~/social/hooks/collections/useCommunitiesCollection";
import useCommunitiesList from "~/social/hooks/useCommunitiesList";

const ApplicationContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledCommunitySideMenu = styled(CommunitySideMenu)`
  display: none;

  @media (min-width: 768px) {
    min-height: 100%;
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface CommunityProps {
    className?: string;
    pageType: string;
    chosenCommunityId: string;
    activeCommunity?: string;
}

const communitiesQueryParam = {membership: 'member', limit: 20} as Parameters<typeof useCommunitiesList>[0];

const Community = ({className, pageType, chosenCommunityId, activeCommunity}: CommunityProps) => {
    const {page, onBack, onClickCommunity} = useNavigation();
    const {navigationBehavior} = usePageBehavior();

    const {client} = useSDK();
    const [socialSettings, setSocialSettings] = React.useState<Amity.SocialSettings | null>(null);
    const {communities, hasMore, loadMore, isLoading, loadMoreHasBeenCalled} =
        useCommunitiesCollection(communitiesQueryParam);
    console.log(communities)
    const [hasClickedCommunity, setHasClickedCommunity] = useState(false);
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (client === null) return;

        async function run() {
            const settings = await client?.getSocialSettings();

            if (settings) {
                setSocialSettings(settings);
            }
        }

        run();
    }, [client]);

    const filteredCommunities = useMemo(() => {
        if (!communities.length) return [];
        return communities.filter((community) => community?.tags?.includes(pageType));
    }, [communities]);

    useEffect(() => {
        // if (chosenCommunityId) {
        //     if ((pageType === "type_team" || pageType === "type_account") && !hasClickedCommunity) {
        //         onClickCommunity(chosenCommunityId);
        //         setHasClickedCommunity(true);
        //     }
        // } else {
        // setFilteredCommunities(prev => prev = communities.filter((community) => community.tags.includes(pageType)));
        if (filteredCommunities.length && (pageType === "type_team" || pageType === "type_account") && !hasClickedCommunity) {
            onClickCommunity(chosenCommunityId ?? filteredCommunities[0].communityId);
            setHasClickedCommunity(true);
        }
        // }

    });

    return (
        <ApplicationContainer>
            <MainLayout aside={<StyledCommunitySideMenu activeCommunity={page.communityId}/>}>
                {(pageType !== 'type_team' && pageType !== 'type_account') && page.type === PageTypes.Explore &&
                    <ExplorePage/>}

                {(pageType !== 'type_team' && pageType !== 'type_account') && page.type === PageTypes.NewsFeed &&
                    <NewsFeedPage toggleOpen={toggleOpen} isOpen={open}/>}

                {(pageType === 'type_team' || pageType === 'type_account') && isLoading &&
                    <div role="status" className="max-w-[550px] mx-auto mt-7 animate-pulse">
                        <div
                            className="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700 mb-8">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path
                                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                        </div>
                        <div role="status"
                             className="p-4 mb-6 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex mb-4">
                                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>
                                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </div>
                            <div className="flex justify-between">
                                <div className="ml-10 flex ">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700 mr-2"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700 mr-2"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700 mr-2"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700 mr-2"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status"
                             className="p-4 mb-6 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div
                                className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path
                                        d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                </svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div className="flex items-center mt-4">
                                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>
                                <div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>

                    </div>}
                {page.type === PageTypes.CommunityFeed && (
                    <CommunityFeedPage
                        communityId={page.communityId}
                        isNewCommunity={page.isNewCommunity}
                        isOpen={open}
                        toggleOpen={toggleOpen}
                    />
                )}

                {page.type === PageTypes.ViewStory && (
                    <Wrapper>
                        <ViewStoriesPage pageId="story_page" targetId={page.targetId!} onClose={onBack}/>
                    </Wrapper>
                )}

                {page.type === PageTypes.CommunityEdit && (
                    <CommunityEditPage communityId={page.communityId} tab={page.tab}/>
                )}

                {page.type === PageTypes.Category && (
                    <CategoryCommunitiesPage categoryId={page.categoryId}/>
                )}

                {page.type === PageTypes.UserFeed && (
                    <UserFeedPage userId={page.userId} socialSettings={socialSettings}/>
                )}

                {page.type === PageTypes.UserEdit && <ProfileSettings userId={page.userId}/>}
            </MainLayout>
        </ApplicationContainer>
    );
};

export default Community;
