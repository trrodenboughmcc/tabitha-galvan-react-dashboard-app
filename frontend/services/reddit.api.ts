import { apiClient, API_ENDPOINTS } from '@/lib/api/client.constants';

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  url: string;
  permalink: string;
  subreddit: string;
  selftext?: string;
  thumbnail?: string;
}

export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

export interface SubredditStats {
  totalPosts: number;
  averageScore: number;
  averageComments: number;
  topPost: RedditPost;
  subreddit: string;
}

export const redditService = {
  /**
   * Get hot posts from a specific subreddit
   */
  async getHotPosts(subreddit: string, limit: number = 10): Promise<RedditPost[]> {
    try {
      const response = await apiClient.get<RedditResponse>(
        `${API_ENDPOINTS.REDDIT}/r/${subreddit}/hot.json?limit=${limit}`
      );
      
      return response.data.children.map(child => child.data);
    } catch (error) {
      console.error(`Error fetching hot posts from r/${subreddit}:`, error);
      throw new Error(`Failed to fetch posts from r/${subreddit}`);
    }
  },

  /**
   * Get new posts from a specific subreddit
   */
  async getNewPosts(subreddit: string, limit: number = 10): Promise<RedditPost[]> {
    try {
      const response = await apiClient.get<RedditResponse>(
        `${API_ENDPOINTS.REDDIT}/r/${subreddit}/new.json?limit=${limit}`
      );
      
      return response.data.children.map(child => child.data);
    } catch (error) {
      console.error(`Error fetching new posts from r/${subreddit}:`, error);
      throw new Error(`Failed to fetch new posts from r/${subreddit}`);
    }
  },

  /**
   * Get top posts from a specific subreddit with time filter
   */
  async getTopPosts(
    subreddit: string, 
    timeFilter: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all' = 'day',
    limit: number = 10
  ): Promise<RedditPost[]> {
    try {
      const response = await apiClient.get<RedditResponse>(
        `${API_ENDPOINTS.REDDIT}/r/${subreddit}/top.json?t=${timeFilter}&limit=${limit}`
      );
      
      return response.data.children.map(child => child.data);
    } catch (error) {
      console.error(`Error fetching top posts from r/${subreddit}:`, error);
      throw new Error(`Failed to fetch top posts from r/${subreddit}`);
    }
  },

  /**
   * Get multiple subreddits data for analytics
   */
  async getSubredditsAnalytics(subreddits: string[]): Promise<SubredditStats[]> {
    try {
      const promises = subreddits.map(async (subreddit) => {
        const posts = await this.getHotPosts(subreddit, 25);
        
        const totalPosts = posts.length;
        const averageScore = posts.reduce((sum, post) => sum + post.score, 0) / totalPosts;
        const averageComments = posts.reduce((sum, post) => sum + post.num_comments, 0) / totalPosts;
        const topPost = posts.reduce((top, post) => post.score > top.score ? post : top, posts[0]);

        return {
          totalPosts,
          averageScore: Math.round(averageScore),
          averageComments: Math.round(averageComments),
          topPost,
          subreddit,
        };
      });

      return Promise.all(promises);
    } catch (error) {
      console.error('Error fetching subreddit analytics:', error);
      throw new Error('Failed to fetch subreddit analytics');
    }
  },

  /**
   * Search posts across Reddit
   */
  async searchPosts(query: string, limit: number = 10): Promise<RedditPost[]> {
    try {
      const response = await apiClient.get<RedditResponse>(
        `${API_ENDPOINTS.REDDIT}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance`
      );
      
      return response.data.children.map(child => child.data);
    } catch (error) {
      console.error(`Error searching posts for "${query}":`, error);
      throw new Error(`Failed to search posts for "${query}"`);
    }
  }
};