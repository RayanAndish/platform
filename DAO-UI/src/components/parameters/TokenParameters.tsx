import React, { useState } from 'react';
import { TokenParams, helpers } from '@core/types/ContractParameters';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Grid,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { ethers } from 'ethers';

interface Props {
  params: TokenParams;
  onUpdate: (params: TokenParams) => void;
  isAdmin: boolean;
}

export const TokenParameters: React.FC<Props> = ({ params, onUpdate, isAdmin }) => {
  const [formData, setFormData] = useState<TokenParams>(params);
  const [errors, setErrors] = useState<Partial<Record<keyof TokenParams, string>>>({});

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

  // اعتبارسنجی فرم
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TokenParams, string>> = {};

    // بررسی مقادیر عددی
    if (formData.transferFee > 1000) {
      newErrors.transferFee = 'کارمزد انتقال نمی‌تواند بیشتر از 100% باشد';
    }
    if (formData.burnRate > 1000) {
      newErrors.burnRate = 'نرخ سوزاندن نمی‌تواند بیشتر از 100% باشد';
    }
    if (formData.minTransferAmount.gt(formData.maxTransferAmount)) {
      newErrors.minTransferAmount = 'حداقل مقدار باید کمتر از حداکثر مقدار باشد';
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
  const handleChange = (field: keyof TokenParams, value: string | boolean) => {
    if (typeof value === 'boolean') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (field === 'transferFee' || field === 'burnRate') {
      setFormData(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [field]: parseBigNumber(value) }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        پارامترهای توکن
      </Typography>

      <Grid container spacing={3}>
        {/* عرضه اولیه */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="عرضه اولیه"
            value={formatValue(formData.initialSupply)}
            onChange={e => handleChange('initialSupply', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.initialSupply}
            helperText={errors.initialSupply}
            InputProps={{
              endAdornment: (
                <Tooltip title="مقدار اولیه توکن‌هایی که در زمان ایجاد قرارداد ضرب می‌شوند">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* حداکثر عرضه */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداکثر عرضه"
            value={formatValue(formData.maxSupply)}
            onChange={e => handleChange('maxSupply', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.maxSupply}
            helperText={errors.maxSupply}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداکثر تعداد توکن‌هایی که می‌توانند وجود داشته باشند">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* حداقل مقدار انتقال */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداقل مقدار انتقال"
            value={formatValue(formData.minTransferAmount)}
            onChange={e => handleChange('minTransferAmount', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.minTransferAmount}
            helperText={errors.minTransferAmount}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداقل مقدار توکن که می‌تواند در یک تراکنش منتقل شود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* حداکثر مقدار انتقال */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="حداکثر مقدار انتقال"
            value={formatValue(formData.maxTransferAmount)}
            onChange={e => handleChange('maxTransferAmount', e.target.value)}
            disabled={!isAdmin}
            error={!!errors.maxTransferAmount}
            helperText={errors.maxTransferAmount}
            InputProps={{
              endAdornment: (
                <Tooltip title="حداکثر مقدار توکن که می‌تواند در یک تراکنش منتقل شود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* کارمزد انتقال */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="کارمزد انتقال (درصد)"
            value={formData.transferFee / 10}
            onChange={e => handleChange('transferFee', (parseFloat(e.target.value) * 10).toString())}
            disabled={!isAdmin}
            error={!!errors.transferFee}
            helperText={errors.transferFee}
            InputProps={{
              endAdornment: (
                <Tooltip title="درصد کارمزد که در هر انتقال دریافت می‌شود">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* نرخ سوزاندن */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="نرخ سوزاندن (درصد)"
            value={formData.burnRate / 10}
            onChange={e => handleChange('burnRate', (parseFloat(e.target.value) * 10).toString())}
            disabled={!isAdmin}
            error={!!errors.burnRate}
            helperText={errors.burnRate}
            InputProps={{
              endAdornment: (
                <Tooltip title="درصد توکن‌هایی که در هر تراکنش سوزانده می‌شوند">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>

        {/* وضعیت انتقال */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.transfersPaused}
                onChange={e => handleChange('transfersPaused', e.target.checked)}
                disabled={!isAdmin}
              />
            }
            label="توقف انتقال‌ها"
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