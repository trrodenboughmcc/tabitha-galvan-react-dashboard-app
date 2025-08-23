'use client';

import { Card, alpha, CardContent, Typography, Box } from "@mui/material";

export const ChartCard = ({ title, children, fullHeight = false }: {
  title: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}) => (
  <Card sx={{ 
    height: fullHeight ? 480 : 400,
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
    border: '1px solid',
    borderColor: alpha('#94a3b8', 0.15),
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(20px)',
    '&:hover': {
      borderColor: alpha('#3b82f6', 0.3),
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
    }
  }}>
    <CardContent sx={{ p: 4, height: '100%' }}>
      <Typography variant="h6" fontWeight={700} mb={3} color="text.primary" sx={{ letterSpacing: '-0.01em' }}>
        {title}
      </Typography>
      <Box sx={{ height: fullHeight ? 420 : 320 }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);