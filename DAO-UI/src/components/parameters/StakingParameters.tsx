import React, { useState } from 'react';
import { StakingParams } from '../types/ContractParameters';
import { ethers } from 'ethers';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface Props {
  params: StakingParams;
  onUpdate: (params: StakingParams) => void;
  isAdmin: boolean;
}

export const StakingParameters: React.FC<Props> = ({ params, onUpdate, isAdmin }) => {
  const [formData, setFormData] = useState<StakingParams>(params);
  const [errors, setErrors] = useState<Partial<Record<keyof StakingParams, string>>>({});

  // تبدیل BigNumber به رشته برای نمایش
  const formatValue = (value: ethers.BigNumber): string => {
    return ethers.utils.formatEther(value);
  };

  // تبدیل رشته به BigNumber برای ذخیره
  const parseBigNumber = (value: string): ethers.BigNumber => {
    try {
      return ethers.utils.parseEther(value);
    } catch {
      return ethers.BigNumber.from(0);
    }
  };

  // تبدیل ثانیه به روز برای نمایش
  const formatDays = (seconds: number): string => {
    return (seconds / (24 * 60 * 60)).toString();
  };

  // تبدیل روز به ثانیه برای ذخیره
  const parseDays = (days: string): number => {
    return Math.floor(parseFloat(days) * 24 * 60 * 60);
  };

  // اعتبارسنجی فرم
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StakingParams, string>> = {};

    if (formData.minStakeAmount.gt(formData.maxStakeAmount)) {
      newErrors.minStakeAmount = 'حداقل مقدار باید کمتر از حداکثر مقدار باشد';
    }

    if (formData.rewardRate > 1000) {
      newErrors.rewardRate = 'نرخ پاداش نمی‌تواند بیشتر از 100% باشد';
    }

    if (formData.lockPeriod < 24 * 60 * 60) { // حداقل 1 روز
      newErrors.lockPeriod = 'دوره قفل باید حداقل 1 روز باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ذخیره تغییرات
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (validateForm()) {
      onUpdate(formData);
    }
  };

  // به‌روزرسانی مقادیر فرم
  const handleChange = (field: keyof StakingParams, value: string) => {
    if (field === 'rewardRate') {
      setFormData(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    } else if (field === 'lockPeriod') {
      setFormData(prev => ({ ...prev, [field]: parseDays(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: parseBigNumber(value) }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        پارامترهای استیکینگ
      </Typography>

      <Grid container spacing={3}>
        {/* حداقل مقدار استیک */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداقل مقدار استیک"
            value={formatValue(formData.minStakeAmount)}
            onChange={e => handleChange('minStakeAmount', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.minStakeAmount}
            helperText={errors.minStakeAmount}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداقل مقدار توکن که می‌تواند استیک شود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* حداکثر مقدار استیک */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداکثر مقدار استیک"
            value={formatValue(formData.maxStakeAmount)}
            onChange={e => handleChange('maxStakeAmount', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.maxStakeAmount}
            helperText={errors.maxStakeAmount}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداکثر مقدار توکن که می‌تواند استیک شود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* نرخ پاداش */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="نرخ پاداش سالانه (درصد)"
            value={formData.rewardRate / 10}
            onChange={e => handleChange('rewardRate', (parseFloat(e.target.value) * 10).toString())}
            disabled={!isAdmin}
            error={!!errors.rewardRate}
            helperText={errors.rewardRate}
            InputProps={{
              endAdornment: (
                <Tooltip title="درصد پاداش سالانه برای توکن‌های استیک شده">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* دوره قفل */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="دوره قفل (روز)"
            value={formatDays(formData.lockPeriod)}
            onChange={e => handleChange('lockPeriod', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.lockPeriod}
            helperText={errors.lockPeriod}
            InputProps={{
              endAdornment: (
                <Tooltip title="مدت زمانی که توکن‌ها باید قفل بمانند">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>
      </Grid>

      {isAdmin && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={Object.keys(errors).length > 0}
          >
            ذخیره تغییرات
          </Button>
        </Box>
      )}
    </Box>
  );
}; 