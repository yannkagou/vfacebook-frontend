import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

import HomeView from '../views/HomeView.vue'
import FeedView from '../views/FeedView.vue'
import ChatView from '../views/ChatView.vue'
import VideoView from '../views/VideoView.vue'
import MarketView from '../views/MarketView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import PostNotifView from '../views/PostNotifView.vue'
import GroupesView from '../views/GroupesView.vue'
import GamesView from '../views/GamesView.vue'

import SearchView from '../views/SearchView.vue'

import ProfileView from '../views/ProfileView.vue'
import ProfilePostsView from '../views/ProfilePostsView.vue'
import FriendsView from '../views/FriendsView.vue'
import ProfilePhotosView from '../views/ProfilePhotosView.vue'
import ProfileLikesView from '../views/ProfileLikesView.vue'
import ProfileVideosView from '../views/ProfileVideosView.vue'
import ProfileAboutView from '../views/ProfileAboutView.vue'
import EditProfileView from '../views/EditProfileView.vue'

import PageView from '../views/PageView.vue'
import PageListView from '../views/PageListView.vue'
import PagePostsView from '../views/PagePostsView.vue'
import PagePhotosView from '../views/PagePhotosView.vue'
import PageFollowersView from '../views/PageFollowersView.vue'
import PageVideosView from '../views/PageVideosView.vue'
import PageAboutView from '../views/PageAboutView.vue'
import PageEditView from '../views/PageEditView.vue'

import MarketCategoryView from '../views/MarketCategoryView.vue'
import MarketProductListView from '../views/MarketProductListView.vue'
import MarketProductSearchView from '../views/MarketProductSearchView.vue'
import MarketProductProfileView from '../views/MarketProductProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'feed',
          component: FeedView
        },
        {
          path: 'video',
          name: 'video',
          component: VideoView
        },
        {
          path: 'market',
          // name: 'market',
          component: MarketView,
          children: [
            {
              path: '',
              name: 'market_product_list',
              component: MarketProductListView
            },
            {
              path: '/:query',
              name: 'market_product_search',
              component: MarketProductSearchView
            },
            {
              path: 'profile/:id',
              name: 'market_product_profile',
              component: MarketProductProfileView
            },
            {
              path: 'category/:name',
              name: 'market_category_list',
              component: MarketCategoryView
            },
          ]
        },
        {
          path: 'groupes',
          name: 'groupes',
          component: GroupesView
        },
        {
          path: 'games',
          name: 'games',
          component: GamesView
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: NotificationsView
        },
        {
          path: '/:id',
          name: 'postnotifications',
          component: PostNotifView
        },
        {
          path: 'search',
          name: 'search',
          component: SearchView
        },
        {
          path: 'page/:id',
          component: PageView,
          children: [
            {
              path: '',
              name: 'page_posts',
              component: PagePostsView
            },
            {
              path: 'page_photos',
              name: 'page_photos',
              component: PagePhotosView
            },
            {
              path: 'page_about',
              name: 'page_about',
              component: PageAboutView
            },
            {
              path: 'page_videos',
              name: 'page_videos',
              component: PageVideosView
            },
            {
              path: 'page_edit',
              name: 'page_edit',
              component: PageEditView
            },
            {
              path: 'page_followers',
              name: 'page_followers',
              component: PageFollowersView
            }
          ]
        },
        {
          path: 'pagelist',
          name: 'pagelist',
          component: PageListView
        },
        {
          path: 'chat',
          name: 'chat',
          component: ChatView
        },
        {
          path: 'profile/:id',
          component: ProfileView,
          children: [
            {
              path: '',
              name: 'p_posts',
              component: ProfilePostsView
            },
            {
              path: 'p_photos',
              name: 'p_photos',
              component: ProfilePhotosView
            },
            {
              path: 'p_videos',
              name: 'p_videos',
              component: ProfileVideosView
            },
            {
              path: 'p_likes',
              name: 'p_likes',
              component: ProfileLikesView
            },
            {
              path: 'p_about',
              name: 'p_about',
              component: ProfileAboutView
            },
            {
              path: 'p_edit',
              name: 'p_edit',
              component: EditProfileView
            },
            {
              path: 'friends',
              name: 'friends',
              component: FriendsView
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

export default router
