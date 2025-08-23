import { useState, useEffect } from 'react';
import { redditService, type RedditPost, type SubredditStats } from '@/services/reddit.api';

export const useRedditPosts = (subreddit: string, type: 'hot' | 'new' | 'top' = 'hot') => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedPosts: RedditPost[];
        switch (type) {
          case 'hot':
            fetchedPosts = await redditService.getHotPosts(subreddit, 10);
            break;
          case 'new':
            fetchedPosts = await redditService.getNewPosts(subreddit, 10);
            break;
          case 'top':
            fetchedPosts = await redditService.getTopPosts(subreddit, 'day', 10);
            break;
          default:
            fetchedPosts = await redditService.getHotPosts(subreddit, 10);
        }
        
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Reddit posts');
      } finally {
        setLoading(false);
      }
    };

    if (subreddit) {
      fetchPosts();
    }
  }, [subreddit, type]);

  return { posts, loading, error };
};

export const useSubredditAnalytics = (subreddits: string[]) => {
  const [analytics, setAnalytics] = useState<SubredditStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const stats = await redditService.getSubredditsAnalytics(subreddits);
        setAnalytics(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subreddit analytics');
      } finally {
        setLoading(false);
      }
    };

    if (subreddits.length > 0) {
      fetchAnalytics();
      
      // Refresh data every 5 minutes
      const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [subreddits]);

  return { analytics, loading, error };
};