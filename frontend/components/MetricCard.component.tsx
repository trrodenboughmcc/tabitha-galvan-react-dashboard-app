'use client';

import { Card, CardContent, Chip, Typography, Box, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import React from 'react';

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  data, 
  color, 
  trend 
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  data: number[];
  color: string;
  trend: string;
}) => (
  <Card sx={{ 
    height: '100%',
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
    border: '1px solid',
    borderColor: alpha('#94a3b8', 0.15),
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: `0 20px 40px ${alpha(color, 0.2)}, 0 0 0 1px ${alpha(color, 0.1)}`,
      borderColor: alpha(color, 0.3),
    }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1, mb: 1.5, color: 'text.primary', fontWeight: 700 }}>
            {value}
          </Typography>
          <Chip
            label={trend}
            size="small"
            color="success"
            variant="filled"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          />
        </Box>
        <Box sx={{ 
          p: 2, 
          borderRadius: 3, 
          background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.25)} 100%)`,
          color: color,
          border: `1px solid ${alpha(color, 0.2)}`,
        }}>
          <Icon sx={{ fontSize: 28 }} />
        </Box>
      </Stack>
      <Box sx={{ height: 60, mt: 2 }}>
        <SparkLineChart
          data={data}
          height={60}
          color={color}
          area
          sx={{ width: '100%' }}
        />
      </Box>
    </CardContent>
  </Card>
);