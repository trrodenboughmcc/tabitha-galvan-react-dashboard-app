'use client';

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
    alpha,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar
} from "@mui/material";
import {
    TrendingUp,
    People,
    ShoppingCart,
    Analytics,
    Computer,
    Phone,
    Tablet,
    Dashboard as DashboardIcon,
    Notifications,
    Settings,
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
    Timeline,
    AccountCircle,
    ExitToApp,
    Language,
    Palette,
    NotificationsOff,
    MarkEmailRead,
    Delete,
    FilterList,
    LightMode,
    VpnKey,
    Support,
    Home
} from "@mui/icons-material";
import { useState, MouseEvent, JSX } from "react";
import { barChartData } from "@/data/barChartData";
import { pieChartData, marketShareData } from "@/data/pieChartData";
import { scatterChartData, performanceData } from "@/data/scatterChartData";
import { miniMetrics, dashboardSparklines } from "@/data/sparklineData";
import { MetricCard } from "@/components/MetricCard.component";
import { SparkLineChart } from "@mui/x-charts";
import { ChartCard } from "@/components/ChartCard.component";

export const Dashboard = (): JSX.Element => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);

    const handleNotificationOpen = (event: MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleSettingsOpen = (event: MouseEvent<HTMLElement>) => {
        setSettingsAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };
    return (
        <Box sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        }}>
            {/* Sticky Header */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid',
                    borderColor: alpha('#94a3b8', 0.15),
                    color: 'text.primary'
                }}
            >
                <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <DashboardIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                        <Typography variant="h6" component="div" fontWeight={700} color="text.primary">
                            Analytics Dashboard
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        <IconButton
                            color="inherit"
                            onClick={handleNotificationOpen}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: alpha('#ef4444', 0.1),
                                    color: 'error.main',
                                }
                            }}
                        >
                            <Badge badgeContent={4} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>

                        <IconButton
                            color="inherit"
                            onClick={handleSettingsOpen}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: alpha('#94a3b8', 0.1),
                                    color: 'text.primary',
                                }
                            }}
                        >
                            <Settings />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Navigation Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 280,
                    }
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: alpha('#94a3b8', 0.15) }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{
                            width: 40,
                            height: 40,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                        }}>
                            JD
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                John Doe
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                john@company.com
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <BarChartIcon fontSize="small" sx={{ color: 'info.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Analytics" />
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <PieChartIcon fontSize="small" sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Timeline fontSize="small" sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Trends" />
                </MenuItem>

                <Divider sx={{ mx: 2, borderColor: alpha('#94a3b8', 0.15) }} />

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" sx={{ color: 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Menu>

            {/* Notifications Menu */}
            <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 380,
                        maxWidth: 420,
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: alpha('#94a3b8', 0.15) }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={700} color="text.primary">
                            Notifications
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ color: 'text.secondary' }}>
                                <FilterList fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'success.main' }}>
                                <MarkEmailRead fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>

                <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                    <ListItemIcon>
                        <Box sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha('#10b981', 0.15),
                            color: 'success.main'
                        }}>
                            <TrendingUp fontSize="small" />
                        </Box>
                    </ListItemIcon>
                    <Box sx={{ ml: 1 }}>
                        <ListItemText
                            primary="Revenue increased by 12%"
                            secondary="Your monthly revenue target has been exceeded"
                            primaryTypographyProps={{ fontWeight: 600, color: 'text.primary' }}
                            secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.875rem' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            2 minutes ago
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                    <ListItemIcon>
                        <Box sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha('#3b82f6', 0.15),
                            color: 'primary.main'
                        }}>
                            <People fontSize="small" />
                        </Box>
                    </ListItemIcon>
                    <Box sx={{ ml: 1 }}>
                        <ListItemText
                            primary="New user milestone reached"
                            secondary="Congratulations! You've reached 250K active users"
                            primaryTypographyProps={{ fontWeight: 600, color: 'text.primary' }}
                            secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.875rem' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            15 minutes ago
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                    <ListItemIcon>
                        <Box sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha('#f59e0b', 0.15),
                            color: 'warning.main'
                        }}>
                            <ShoppingCart fontSize="small" />
                        </Box>
                    </ListItemIcon>
                    <Box sx={{ ml: 1 }}>
                        <ListItemText
                            primary="Sales target exceeded"
                            secondary="Q4 sales performance is 15% above target"
                            primaryTypographyProps={{ fontWeight: 600, color: 'text.primary' }}
                            secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.875rem' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            1 hour ago
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                    <ListItemIcon>
                        <Box sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha('#06b6d4', 0.15),
                            color: 'info.main'
                        }}>
                            <Analytics fontSize="small" />
                        </Box>
                    </ListItemIcon>
                    <Box sx={{ ml: 1 }}>
                        <ListItemText
                            primary="Weekly report available"
                            secondary="Your analytics summary for this week is ready"
                            primaryTypographyProps={{ fontWeight: 600, color: 'text.primary' }}
                            secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.875rem' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            3 hours ago
                        </Typography>
                    </Box>
                </MenuItem>

                <Box sx={{ p: 2, borderTop: '1px solid', borderColor: alpha('#94a3b8', 0.15) }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" sx={{ color: 'error.main' }}>
                            <Delete fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <NotificationsOff fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>
            </Menu>

            {/* Settings Menu */}
            <Menu
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleSettingsClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 280,
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: alpha('#94a3b8', 0.15) }}>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                        Settings
                    </Typography>
                </Box>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings" />
                </MenuItem>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <Palette fontSize="small" sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Appearance" />
                </MenuItem>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <LightMode fontSize="small" sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Theme Mode" />
                </MenuItem>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <Language fontSize="small" sx={{ color: 'info.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </MenuItem>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <Notifications fontSize="small" sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                </MenuItem>

                <Divider sx={{ mx: 2, borderColor: alpha('#94a3b8', 0.15) }} />

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <VpnKey fontSize="small" sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Privacy & Security" />
                </MenuItem>

                <MenuItem onClick={handleSettingsClose}>
                    <ListItemIcon>
                        <Support fontSize="small" sx={{ color: 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Help & Support" />
                </MenuItem>
            </Menu>

            <Container maxWidth="xl" sx={{ py: 6 }}>
                {/* Header */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" component="h1" color="text.primary" mb={1} sx={{ fontWeight: 800 }}>
                        Real-time Analytics
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>
                        Monitor your business performance and key metrics
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
                            title="Revenue"
                            value="$4.9M"
                            icon={TrendingUp}
                            data={miniMetrics.revenue}
                            color="#10b981"
                            trend="+12.5%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Active Users"
                            value="223K"
                            icon={People}
                            data={miniMetrics.users}
                            color="#3b82f6"
                            trend="+8.2%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Sales Volume"
                            value="1,284"
                            icon={ShoppingCart}
                            data={miniMetrics.sales}
                            color="#ef4444"
                            trend="+15.3%"
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 280px', minWidth: 280 }}>
                        <MetricCard
                            title="Conversion Rate"
                            value="3.6%"
                            icon={Analytics}
                            data={miniMetrics.conversion}
                            color="#8b5cf6"
                            trend="+2.1%"
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
                    <Box sx={{ flex: '1 1 350px', minWidth: 350 }}>
                        <ChartCard title="Device Distribution">
                            <PieChart
                                series={[{
                                    data: pieChartData,
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
                    <Box sx={{ flex: '2 1 600px', minWidth: 500 }}>
                        <ChartCard title="Quarterly Performance Overview">
                            <BarChart
                                {...barChartData}
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
                        <ChartCard title="Browser Market Share">
                            <PieChart
                                series={[{
                                    data: marketShareData,
                                    innerRadius: 50,
                                    outerRadius: 110,
                                    paddingAngle: 3,
                                    cornerRadius: 6,
                                }]}
                                height={320}
                                margin={{ right: 150 }}
                            />
                        </ChartCard>
                    </Box>
                </Box>

                {/* Analytics Charts */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    mb: 5
                }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: 450 }}>
                        <ChartCard title="Product Performance Analysis">
                            <ScatterChart
                                series={scatterChartData.series}
                                height={320}
                                margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                                grid={{ vertical: true, horizontal: true }}
                                xAxis={[{ label: "Marketing Spend ($)" }]}
                                yAxis={[{ label: "Revenue ($)" }]}
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
                        <ChartCard title="Team Performance Correlation">
                            <ScatterChart
                                series={performanceData.series}
                                height={320}
                                margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                                grid={{ vertical: true, horizontal: true }}
                                xAxis={[{ label: "Experience Level" }]}
                                yAxis={[{ label: "Performance Score" }]}
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

                {/* Website Analytics */}
                <Typography variant="h5" fontWeight={700} mb={4} color="text.primary">
                    Website Analytics
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
                                        Page Views
                                    </Typography>
                                    <Computer sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    1,890
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={dashboardSparklines.pageViews}
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
                                        Bounce Rate
                                    </Typography>
                                    <Phone sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    31%
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={dashboardSparklines.bounceRate}
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
                                        Session Duration
                                    </Typography>
                                    <Tablet sx={{ opacity: 0.9, fontSize: 32 }} />
                                </Stack>
                                <Typography variant="h3" fontWeight={800} mb={3}>
                                    4:50
                                </Typography>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={dashboardSparklines.sessionDuration}
                                        height={60}
                                        color={'rgba(255,255,255,0.9)'}
                                        area
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}