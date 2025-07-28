



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GitHubSearchUsersResponse, GitHubUserDetails, GitHubApiError } from '../../common/types/index';


const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN ;

export const githubApi = createApi({
  reducerPath: 'githubApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    prepareHeaders: (headers) => {
   
      if (GITHUB_ACCESS_TOKEN) {
        headers.set('Authorization', `token ${GITHUB_ACCESS_TOKEN}`);
      }
      headers.set('Accept', 'application/vnd.github.v3+json'); 
      return headers;
    },
  }),
  endpoints: (builder) => ({
   
    searchUsers: builder.query<GitHubSearchUsersResponse, string>({
      query: (query: string) => {
      
        return {
          url: `search/users?q=${encodeURIComponent(query)}%20in:login&per_page=12`,
        };
      },
    }),
 
    getUserDetails: builder.query<GitHubUserDetails, string>({
      query: (username: string) => `users/${username}`,
    }),
  }),
});


export const { useSearchUsersQuery, useGetUserDetailsQuery } = githubApi;
export type { GitHubApiError }; 
