'use client';

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
    alpha,
    Chip,
    CircularProgress
} from "@mui/material";
import {
    TrendingUp,
    People,
    ShoppingCart,
    Analytics,
    Computer,
    Phone,
    Tablet,
    Reddit
} from "@mui/icons-material";
import { useRedditPosts, useSubredditAnalytics } from '@/hooks/useReddit.hook';
import { MetricCard } from "@/components/MetricCard.component";
import { ChartCard } from "@/components/ChartCard.component";
import { useMemo } from 'react';

export const RedditTest = () => {
    const { posts: programmingPosts, loading: postsLoading } = useRedditPosts('programming', 'hot');
    const { posts: reactPosts } = useRedditPosts('reactjs', 'hot');
    const { posts: javascriptPosts } = useRedditPosts('javascript', 'hot');
    const { posts: webdevPosts } = useRedditPosts('webdev', 'hot');
    const { analytics, loading: analyticsLoading } = useSubredditAnalytics(['programming', 'javascript', 'reactjs', 'webdev', 'frontend']);

    // Transform Reddit data for charts
    const chartData = useMemo(() => {
        if (!analytics.length) return null;

        // Bar Chart Data - Subreddit performance comparison
        const barChartData = {
            dataset: analytics.map(stat => ({
                subreddit: `r/${stat.subreddit}`,
                averageScore: stat.averageScore,
                averageComments: stat.averageComments,
                totalPosts: stat.totalPosts
            })),
            series: [
                { 
                    dataKey: 'averageScore', 
                    label: 'Average Score',
                    color: '#3b82f6'
                },
                { 
                    dataKey: 'averageComments', 
                    label: 'Average Comments',
                    color: '#10b981'
                }
            ],
            xAxis: [{ scaleType: "band" as const, dataKey: 'subreddit' }]
        };

        // Pie Chart Data - Post distribution by subreddit
        const pieChartData = analytics.map((stat, index) => ({
            id: index,
            value: stat.totalPosts,
            label: `r/${stat.subreddit}`,
            color: ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'][index % 5]
        }));

        // Scatter Chart Data - Score vs Comments correlation
        const scatterData = {
            series: [{
                data: analytics.map(stat => ({
                    x: stat.averageScore,
                    y: stat.averageComments,
                    id: stat.subreddit
                })),
                label: 'Score vs Comments',
                color: '#8b5cf6'
            }]
        };

        // Performance scatter chart (using top posts data)
        const performanceData = {
            series: [{
                data: programmingPosts.slice(0, 10).map((post, index) => ({
                    x: index + 1,
                    y: post.score,
                    id: post.id
                })),
                label: 'Post Performance',
                color: '#ef4444'
            }]
        };

        return {
            barChart: barChartData,
            pieChart: pieChartData,
            scatterChart: scatterData,
            performanceChart: performanceData
        };
    }, [analytics, programmingPosts]);

    // Sparkline data for metrics
    const sparklineData = useMemo(() => {
        if (!programmingPosts.length) return null;

        const scores = programmingPosts.slice(0, 10).map(post => post.score);
        const comments = programmingPosts.slice(0, 10).map(post => post.num_comments);
        const upvoteRatios = programmingPosts.slice(0, 10).map(() => Math.random() * 0.3 + 0.7); // Mock upvote ratio
        const engagement = programmingPosts.slice(0, 10).map(post => post.score + post.num_comments);

        return {
            scores,
            comments,
            upvoteRatios,
            engagement
        };
    }, [programmingPosts]);

    // Calculate metrics from Reddit data
    const metrics = useMemo(() => {
        if (!analytics.length || !programmingPosts.length) return null;

        const totalScore = analytics.reduce((sum, stat) => sum + stat.averageScore, 0);
        const totalComments = analytics.reduce((sum, stat) => sum + stat.averageComments, 0);
        const totalPosts = analytics.reduce((sum, stat) => sum + stat.totalPosts, 0);
        const topPost = programmingPosts.reduce((top, post) => post.score > top.score ? post : top, programmingPosts[0]);

        return {
            avgScore: Math.round(totalScore / analytics.length),
            totalComments: Math.round(totalComments),
            totalPosts,
            topPostScore: topPost?.score || 0
        };
    }, [analytics, programmingPosts]);

    if (postsLoading || analyticsLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress size={60} />
                <Typography variant="h6" color="text.secondary">
                    Loading Reddit Analytics...
                </Typography>
            </Box>
        );
    }

    if (!chartData || !sparklineData || !metrics) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="error">
                    Failed to load Reddit data
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
            p: 3
        }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <Reddit sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h3" component="h1" color="text.primary" sx={{ fontWeight: 800 }}>
                            Reddit Analytics Dashboard
                        </Typography>
                    </Stack>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>
                        Real-time insights from popular programming subreddits
                    </Typography>
                </Box>

                {/* KPI Metrics */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    mb: 5
                }}>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Average Score"
                            value={metrics.avgScore.toString()}
                            icon={TrendingUp}
                            data={sparklineData.scores}
                            color="#10b981"
                            trend="+15.2%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Total Comments"
                            value={metrics.totalComments.toString()}
                            icon={People}
                            data={sparklineData.comments}
                            color="#3b82f6"
                            trend="+23.1%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Total Posts"
                            value={metrics.totalPosts.toString()}
                            icon={ShoppingCart}
                            data={sparklineData.engagement}
                            color="#ef4444"
                            trend="+8.7%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Top Post Score"
                            value={metrics.topPostScore.toString()}
                            icon={Analytics}
                            data={sparklineData.upvoteRatios.map(ratio => ratio * 100)}
                            color="#8b5cf6"
                            trend="+42.3%"
                        />
                    </Box>
                </Box>

                {/* Main Charts */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    mb: 5
                }}>
                    <Box sx={{ flex: '2 1 600px', minWidth: 500 }}>
                        <ChartCard title="Subreddit Performance Comparison">
                            <BarChart
                                {...chartData.barChart}
                                height={320}
                                margin={{ left: 70, right: 20, top: 20, bottom: 80 }}
                                grid={{ vertical: true, horizontal: true }}
                                sx={{
                                    '& .MuiChartsAxis-root': {
                                        '& .MuiChartsAxis-tickLabel': {
                                            fontSize: '0.875rem',
                                            fill: '#94a3b8',
                                        },
                                        '& .MuiChartsAxis-line': {
                                            stroke: '#475569',
                                        },
                                    },
                                    '& .MuiChartsGrid-line': {
                                        stroke: '#334155',
                                        strokeOpacity: 0.5,
                                    },
                                }}
                            />
                        </ChartCard>
                    </Box>
                    <Box sx={{ flex: '1 1 350px', minWidth: 350 }}>
                        <ChartCard title="Posts Distribution by Subreddit">
                            <PieChart
                                series={[{
                                    data: chartData.pieChart,
                                    highlightScope: { fade: "global", highlight: "item" },
                                    innerRadius: 60,
                                    outerRadius: 120,
                                    paddingAngle: 2,
                                    cornerRadius: 8,
                                }]}
                                height={320}
                                margin={{ right: 150 }}
                            />
                        </ChartCard>
                    </Box>
                </Box>

                {/* Secondary Charts */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    mb: 5
                }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: 450 }}>
                        <ChartCard title="Score vs Comments Correlation">
                            <ScatterChart
                                series={chartData.scatterChart.series}
                                height={320}
                                margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                                grid={{ vertical: true, horizontal: true }}
                                xAxis={[{ label: "Average Score" }]}
                                yAxis={[{ label: "Average Comments" }]}
                                sx={{
                                    '& .MuiChartsAxis-root': {
                                        '& .MuiChartsAxis-tickLabel': {
                                            fontSize: '0.875rem',
                                            fill: '#94a3b8',
                                        },
                                        '& .MuiChartsAxis-line': {
                                            stroke: '#475569',
                                        },
                                    },
                                    '& .MuiChartsGrid-line': {
                                        stroke: '#334155',
                                        strokeOpacity: 0.5,
                                    },
                                }}
                            />
                        </ChartCard>
                    </Box>
                    <Box sx={{ flex: '1 1 500px', minWidth: 450 }}>
                        <ChartCard title="Hot Posts Performance (r/programming)">
                            <ScatterChart
                                series={chartData.performanceChart.series}
                                height={320}
                                margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                                grid={{ vertical: true, horizontal: true }}
                                xAxis={[{ label: "Post Rank" }]}
                                yAxis={[{ label: "Score" }]}
                                sx={{
                                    '& .MuiChartsAxis-root': {
                                        '& .MuiChartsAxis-tickLabel': {
                                            fontSize: '0.875rem',
                                            fill: '#94a3b8',
                                        },
                                        '& .MuiChartsAxis-line': {
                                            stroke: '#475569',
                                        },
                                    },
                                    '& .MuiChartsGrid-line': {
                                        stroke: '#334155',
                                        strokeOpacity: 0.5,
                                    },
                                }}
                            />
                        </ChartCard>
                    </Box>
                </Box>

                {/* Reddit Analytics Cards */}
                <Typography variant="h5" fontWeight={700} mb={4} color="text.primary">
                    Subreddit Insights
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4
                }}>
                    <Box sx={{ flex: '1 1 320px', minWidth: 300 }}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            height: '100%',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                backdropFilter: 'blur(10px)',
                            },
                        }}>
                            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        r/programming Activity
                                    </Typography>
                                    <Computer sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    {programmingPosts.length}
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={sparklineData.scores}
                                        height={60}
                                        color={'rgba(255,255,255,0.9)'}
                                        area
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ flex: '1 1 320px', minWidth: 300 }}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            border: 'none',
                            height: '100%',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 25px 50px rgba(239, 68, 68, 0.4)',
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                backdropFilter: 'blur(10px)',
                            },
                        }}>
                            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Engagement Rate
                                    </Typography>
                                    <Phone sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    {Math.round((sparklineData.comments.reduce((a, b) => a + b, 0) / sparklineData.scores.reduce((a, b) => a + b, 0)) * 100)}%
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={sparklineData.engagement}
                                        height={60}
                                        color={'rgba(255,255,255,0.9)'}
                                        area
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ flex: '1 1 320px', minWidth: 300 }}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            height: '100%',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 25px 50px rgba(16, 185, 129, 0.4)',
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                backdropFilter: 'blur(10px)',
                            },
                        }}>
                            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Top Post Score
                                    </Typography>
                                    <Tablet sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    {metrics.topPostScore}
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={sparklineData.upvoteRatios.map(ratio => ratio * 100)}
                                        height={60}
                                        color={'rgba(255,255,255,0.9)'}
                                        area
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Top Posts Section */}
                <Typography variant="h5" fontWeight={700} mb={4} mt={6} color="text.primary">
                    Top Posts from r/programming
                </Typography>
                <Stack spacing={2}>
                    {programmingPosts.slice(0, 5).map((post) => (
                        <Card key={post.id} sx={{ 
                            background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
                            border: '1px solid',
                            borderColor: alpha('#94a3b8', 0.15),
                            '&:hover': {
                                borderColor: alpha('#3b82f6', 0.3),
                            }
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" noWrap color="text.primary" mb={2}>
                                    {post.title}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                    <Chip 
                                        label={`↑ ${post.score}`} 
                                        size="small" 
                                        sx={{ 
                                            backgroundColor: alpha('#10b981', 0.2),
                                            color: '#10b981',
                                            fontWeight: 600
                                        }} 
                                    />
                                    <Chip 
                                        label={`💬 ${post.num_comments}`} 
                                        size="small" 
                                        sx={{ 
                                            backgroundColor: alpha('#3b82f6', 0.2),
                                            color: '#3b82f6',
                                            fontWeight: 600
                                        }} 
                                    />
                                    <Chip 
                                        label={`u/${post.author}`} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ 
                                            borderColor: alpha('#94a3b8', 0.3),
                                            color: 'text.secondary'
                                        }}
                                    />
                                    <Chip 
                                        label={new Date(post.created_utc * 1000).toLocaleDateString()} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ 
                                            borderColor: alpha('#94a3b8', 0.3),
                                            color: 'text.secondary'
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};