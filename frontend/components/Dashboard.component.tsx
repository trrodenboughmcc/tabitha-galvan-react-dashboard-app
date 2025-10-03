'use client';

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { AppBar, Toolbar, IconButton, Badge, Typography, Box, Container, alpha } from "@mui/material";
import { Dashboard as DashboardIcon, Notifications, Settings, People, TrendingUp, ShoppingCart, Analytics, Computer, Phone, Tablet } from "@mui/icons-material";
import { MetricCard } from "@/components/MetricCard.component";
import { ChartCard } from "@/components/ChartCard.component";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { SparkLineChart } from "@mui/x-charts";
import { miniMetrics, dashboardSparklines } from "@/data/sparklineData";
import { barChartData } from "@/data/barChartData";
import { pieChartData, marketShareData } from "@/data/pieChartData";
import { scatterChartData, performanceData } from "@/data/scatterChartData";
import React from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);
const layouts = {
    lg: [
        { i: "revenue", x: 0, y: 0, w: 1, h: 2 },
        { i: "users", x: 1, y: 0, w: 1, h: 2 },
        { i: "sales", x: 2, y: 0, w: 1, h: 2 },
        { i: "conversion", x: 3, y: 0, w: 1, h: 2 },
        { i: "device", x: 0, y: 2, w: 2, h: 3 },
        { i: "quarterly", x: 2, y: 2, w: 2, h: 3 },
        { i: "marketShare", x: 0, y: 5, w: 2, h: 3 },
        { i: "productPerf", x: 2, y: 5, w: 1, h: 3 },
        { i: "teamPerf", x: 3, y: 5, w: 1, h: 3 },
        { i: "pageViews", x: 0, y: 8, w: 1, h: 2 },
        { i: "bounceRate", x: 1, y: 8, w: 1, h: 2 },
        { i: "sessionDuration", x: 2, y: 8, w: 1, h: 2 },
    ]
};

export const Dashboard = () => {
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => setNotificationAnchorEl(event.currentTarget);
    const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => setSettingsAnchorEl(event.currentTarget);
    const handleNotificationClose = () => setNotificationAnchorEl(null);
    const handleSettingsClose = () => setSettingsAnchorEl(null);
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
            <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)', backdropFilter: 'blur(20px)', borderBottom: '1px solid', borderColor: alpha('#94a3b8', 0.15), color: 'text.primary' }}>
                <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <DashboardIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                        <Typography variant="h6" component="div" fontWeight={700} color="text.primary">Analytics Dashboard</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton color="inherit" onClick={handleNotificationOpen} sx={{ color: 'text.secondary', '&:hover': { backgroundColor: alpha('#ef4444', 0.1), color: 'error.main' } }}>
                            <Badge badgeContent={4} color="error"><Notifications /></Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={handleSettingsOpen} sx={{ color: 'text.secondary', '&:hover': { backgroundColor: alpha('#94a3b8', 0.1), color: 'text.primary' } }}>
                            <Settings />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" component="h1" color="text.primary" mb={1} sx={{ fontWeight: 800 }}>Real-time Analytics</Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>Monitor your business performance and key metrics</Typography>
                </Box>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                    cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
                    rowHeight={180}
                    isDraggable
                    isResizable
                >
                    <div key="revenue">
                        <MetricCard title="Revenue" value="$4.9M" icon={TrendingUp} data={miniMetrics.revenue} color="#10b981" trend="+12.5%" />
                    </div>
                    <div key="users">
                        <MetricCard title="Active Users" value="223K" icon={People} data={miniMetrics.users} color="#3b82f6" trend="+8.2%" />
                    </div>
                    <div key="sales">
                        <MetricCard title="Sales Volume" value="1,284" icon={ShoppingCart} data={miniMetrics.sales} color="#ef4444" trend="+15.3%" />
                    </div>
                    <div key="conversion">
                        <MetricCard title="Conversion Rate" value="3.6%" icon={Analytics} data={miniMetrics.conversion} color="#8b5cf6" trend="+2.1%" />
                    </div>
                    <div key="device">
                        <ChartCard title="Device Distribution">
                            <PieChart series={[{ data: pieChartData, highlightScope: { fade: "global", highlight: "item" }, innerRadius: 60, outerRadius: 120, paddingAngle: 2, cornerRadius: 8 }]} height={320} margin={{ right: 150 }} />
                        </ChartCard>
                    </div>
                    <div key="quarterly">
                        <ChartCard title="Quarterly Performance Overview">
                            <BarChart {...barChartData} height={320} margin={{ left: 70, right: 20, top: 20, bottom: 80 }} grid={{ vertical: true, horizontal: true }} sx={{ '& .MuiChartsAxis-root': { '& .MuiChartsAxis-tickLabel': { fontSize: '0.875rem', fill: '#94a3b8' }, '& .MuiChartsAxis-line': { stroke: '#475569' } }, '& .MuiChartsGrid-line': { stroke: '#334155', strokeOpacity: 0.5 } }} />
                        </ChartCard>
                    </div>
                    <div key="marketShare">
                        <ChartCard title="Browser Market Share">
                            <PieChart series={[{ data: marketShareData, innerRadius: 50, outerRadius: 110, paddingAngle: 3, cornerRadius: 6 }]} height={320} margin={{ right: 150 }} />
                        </ChartCard>
                    </div>
                    <div key="productPerf">
                        <ChartCard title="Product Performance Analysis">
                            <ScatterChart series={scatterChartData.series} height={320} margin={{ left: 70, right: 20, top: 20, bottom: 50 }} grid={{ vertical: true, horizontal: true }} xAxis={[{ label: "Marketing Spend ($)" }]} yAxis={[{ label: "Revenue ($)" }]} sx={{ '& .MuiChartsAxis-root': { '& .MuiChartsAxis-tickLabel': { fontSize: '0.875rem', fill: '#94a3b8' }, '& .MuiChartsAxis-line': { stroke: '#475569' } }, '& .MuiChartsGrid-line': { stroke: '#334155', strokeOpacity: 0.5 } }} />
                        </ChartCard>
                    </div>
                    <div key="teamPerf">
                        <ChartCard title="Team Performance Correlation">
                            <ScatterChart series={performanceData.series} height={320} margin={{ left: 70, right: 20, top: 20, bottom: 50 }} grid={{ vertical: true, horizontal: true }} xAxis={[{ label: "Experience Level" }]} yAxis={[{ label: "Performance Score" }]} sx={{ '& .MuiChartsAxis-root': { '& .MuiChartsAxis-tickLabel': { fontSize: '0.875rem', fill: '#94a3b8' }, '& .MuiChartsAxis-line': { stroke: '#475569' } }, '& .MuiChartsGrid-line': { stroke: '#334155', strokeOpacity: 0.5 } }} />
                        </ChartCard>
                    </div>
                    <div key="pageViews">
                        <ChartCard title="Page Views">
                            <Typography variant="h3" fontWeight={800} mb={3}>1,890</Typography>
                            <Box sx={{ height: 60 }}>
                                <SparkLineChart data={dashboardSparklines.pageViews} height={60} color={'rgba(255,255,255,0.9)'} area />
                            </Box>
                        </ChartCard>
                    </div>
                    <div key="bounceRate">
                        <ChartCard title="Bounce Rate">
                            <Typography variant="h3" fontWeight={800} mb={3}>31%</Typography>
                            <Box sx={{ height: 60 }}>
                                <SparkLineChart data={dashboardSparklines.bounceRate} height={60} color={'rgba(255,255,255,0.9)'} area />
                            </Box>
                        </ChartCard>
                    </div>
                    <div key="sessionDuration">
                        <ChartCard title="Session Duration">
                            <Typography variant="h3" fontWeight={800} mb={3}>4:50</Typography>
                            <Box sx={{ height: 60 }}>
                                <SparkLineChart data={dashboardSparklines.sessionDuration} height={60} color={'rgba(255,255,255,0.9)'} area />
                            </Box>
                        </ChartCard>
                    </div>
                </ResponsiveGridLayout>
            </Container>
        </Box>
    );
}