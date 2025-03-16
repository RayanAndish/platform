import { Router } from 'express';
import { ethers } from 'ethers';
import { ContractParameters } from '@core/types/ContractParameters';
import { ParameterService } from '../services/ParameterService';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { logger } from '../utils/logger';
import { cache } from '../utils/cache';

const router = Router();
const parameterService = new ParameterService(
  process.env.CONTRACT_PARAMETERS_ADDRESS!,
  new ethers.providers.JsonRpcProvider(process.env.RPC_URL),
  prisma,
  cache
);

/**
 * @route GET /api/parameters
 * @desc دریافت تمام پارامترها
 */
router.get('/', cache.middleware(3600), async (req, res) => {
  try {
    const params = await parameterService.getContractParameters();
    res.json(params);
  } catch (error) {
    logger.error('Error fetching parameters:', error);
    res.status(500).json({ error: 'خطا در دریافت پارامترها' });
  }
});

/**
 * @route GET /api/parameters/:section
 * @desc دریافت پارامترهای یک بخش خاص
 */
router.get('/:section', cache.middleware(3600), async (req, res) => {
  try {
    const params = await parameterService.getContractParameters();
    const section = req.params.section as keyof ContractParameters;

    if (params[section]) {
      res.json(params[section]);
    } else {
      res.status(404).json({ error: 'بخش مورد نظر یافت نشد' });
    }
  } catch (error) {
    logger.error('Error fetching section parameters:', error);
    res.status(500).json({ error: 'خطا در دریافت پارامترها' });
  }
});

/**
 * @route PUT /api/parameters
 * @desc به‌روزرسانی پارامترها
 */
router.put(
  '/',
  authenticate,
  authorize(['admin']),
  validate({
    body: {
      section: { type: 'string', required: true },
      params: { type: 'object', required: true }
    }
  }),
  async (req, res) => {
    try {
      const { section, params } = req.body;
      
      // اعتبارسنجی پارامترها
      if (!parameterService.validateParameters({ [section]: params })) {
        return res.status(400).json({ error: 'پارامترهای نامعتبر' });
      }

      // دریافت امضاکننده از درخواست
      const signer = new ethers.Wallet(
        req.user.privateKey,
        new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
      );

      // به‌روزرسانی پارامترها
      await parameterService.updateParameters({ [section]: params }, signer);

      // حذف از کش
      await cache.del('contract_parameters');
      await cache.del(`contract_parameters_${section}`);

      res.json({ success: true });
    } catch (error) {
      logger.error('Error updating parameters:', error);
      res.status(500).json({ error: 'خطا در به‌روزرسانی پارامترها' });
    }
  }
);

/**
 * @route GET /api/parameters/history
 * @desc دریافت تاریخچه تغییرات پارامترها
 */
router.get('/history', authenticate, async (req, res) => {
  try {
    const history = await prisma.parameterHistory.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    res.json(history);
  } catch (error) {
    logger.error('Error fetching parameters history:', error);
    res.status(500).json({ error: 'خطا در دریافت تاریخچه پارامترها' });
  }
});

/**
 * @route POST /api/parameters/validate
 * @desc اعتبارسنجی پارامترها قبل از ذخیره
 */
router.post(
  '/validate',
  authenticate,
  validate({
    body: {
      section: { type: 'string', required: true },
      params: { type: 'object', required: true }
    }
  }),
  async (req, res) => {
    try {
      const { section, params } = req.body;
      const isValid = parameterService.validateParameters({ [section]: params });
      res.json({ isValid });
    } catch (error) {
      logger.error('Error validating parameters:', error);
      res.status(500).json({ error: 'خطا در اعتبارسنجی پارامترها' });
    }
  }
);

export default router; 