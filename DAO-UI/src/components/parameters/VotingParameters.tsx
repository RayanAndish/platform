import React, { useState } from 'react';
import { VotingParams } from '../types/ContractParameters';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Slider
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface Props {
  params: VotingParams;
  onUpdate: (params: VotingParams) => void;
  isAdmin: boolean;
}

export const VotingParameters: React.FC<Props> = ({ params, onUpdate, isAdmin }) => {
  const [formData, setFormData] = useState<VotingParams>(params);
  const [errors, setErrors] = useState<Partial<Record<keyof VotingParams, string>>>({});

  // تبدیل ثانیه به روز برای نمایش
  const formatDays = (seconds: number): string => {
    return (seconds / (24 * 60 * 60)).toString();
  };

  // تبدیل روز به ثانیه برای ذخیره
  const parseDays = (days: string): number => {
    return Math.floor(parseFloat(days) * 24 * 60 * 60);
  };

  // تبدیل درصد به عدد بین 0 تا 1000
  const formatPercentage = (value: number): number => {
    return value / 10;
  };

  // اعتبارسنجی فرم
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VotingParams, string>> = {};

    if (formData.minVoters < 3) {
      newErrors.minVoters = 'حداقل تعداد رأی‌دهندگان باید 3 نفر باشد';
    }

    if (formData.votingPeriod < 24 * 60 * 60) { // حداقل 1 روز
      newErrors.votingPeriod = 'دوره رأی‌گیری باید حداقل 1 روز باشد';
    }

    if (formData.approvalThreshold > 1000) {
      newErrors.approvalThreshold = 'آستانه تصویب نمی‌تواند بیشتر از 100% باشد';
    }

    if (formData.quorum > 1000) {
      newErrors.quorum = 'حد نصاب نمی‌تواند بیشتر از 100% باشد';
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
  const handleChange = (field: keyof VotingParams, value: string | number) => {
    let parsedValue: number;
    
    if (field === 'votingPeriod') {
      parsedValue = parseDays(value as string);
    } else if (field === 'approvalThreshold' || field === 'quorum') {
      parsedValue = Math.floor(parseFloat(value as string) * 10);
    } else {
      parsedValue = parseInt(value as string) || 0;
    }

    setFormData(prev => ({ ...prev, [field]: parsedValue }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        پارامترهای رأی‌گیری
      </Typography>

      <Grid container spacing={3}>
        {/* حداقل تعداد رأی‌دهندگان */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداقل تعداد رأی‌دهندگان"
            type="number"
            value={formData.minVoters}
            onChange={e => handleChange('minVoters', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.minVoters}
            helperText={errors.minVoters}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداقل تعداد افرادی که باید در رأی‌گیری شرکت کنند">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* دوره رأی‌گیری */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="دوره رأی‌گیری (روز)"
            value={formatDays(formData.votingPeriod)}
            onChange={e => handleChange('votingPeriod', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.votingPeriod}
            helperText={errors.votingPeriod}
            InputProps={{
              endAdornment: (
                <Tooltip title="مدت زمانی که رأی‌گیری فعال خواهد بود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* آستانه تصویب */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            آستانه تصویب (درصد)
            <Tooltip title="درصد رأی مثبت لازم برای تصویب پیشنهاد">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Slider
            value={formatPercentage(formData.approvalThreshold)}
            onChange={(_, value) => handleChange('approvalThreshold', value as number)}
            disabled={!isAdmin}
            min={0}
            max={100}
            step={1}
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' }
            ]}
          />
          {errors.approvalThreshold && (
            <Typography color="error" variant="caption">
              {errors.approvalThreshold}
            </Typography>
          )}
        </Grid>

        {/* حد نصاب */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            حد نصاب (درصد)
            <Tooltip title="درصد مشارکت لازم برای معتبر بودن رأی‌گیری">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Slider
            value={formatPercentage(formData.quorum)}
            onChange={(_, value) => handleChange('quorum', value as number)}
            disabled={!isAdmin}
            min={0}
            max={100}
            step={1}
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' }
            ]}
          />
          {errors.quorum && (
            <Typography color="error" variant="caption">
              {errors.quorum}
            </Typography>
          )}
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