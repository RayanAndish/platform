# @dao/contracts

این پکیج شامل قراردادهای هوشمند، ABI‌ها و تایپ‌های TypeScript برای پلتفرم DAO است.

## نصب

```bash
# با npm
npm install @dao/contracts

# با yarn
yarn add @dao/contracts
```

## استفاده

### در Frontend (dao-ui)

```typescript
// استفاده از تایپ‌ها
import { StakingParams, VotingParams } from '@dao/contracts';

// استفاده از ABI
import { ContractParameters__factory } from '@dao/contracts/typechain-types';
```

### در Backend

```typescript
import { ContractParameters__factory } from '@dao/contracts/typechain-types';
import { StakingParams } from '@dao/contracts';

const contract = ContractParameters__factory.connect(address, provider);
```

## توسعه

### پیش‌نیازها

- Node.js >= 16
- Yarn یا npm
- Hardhat

### دستورات

```bash
# نصب وابستگی‌ها
yarn install

# کامپایل قراردادها و تولید تایپ‌ها
yarn build

# پاک کردن فایل‌های تولید شده
yarn clean
```

## نکات مهم برای توسعه‌دهندگان

1. **به‌روزرسانی قراردادها**:
   - پس از هر تغییر در قراردادها، دستور `yarn build` را اجرا کنید
   - نسخه پکیج را در `package.json` افزایش دهید
   - تغییرات را در CHANGELOG.md ثبت کنید

2. **انتقال به Hyperledger Fabric**:
   - این پکیج برای سازگاری با Hyperledger Fabric طراحی شده است
   - برای انتقال به Fabric:
     1. قراردادها را به Chaincode تبدیل کنید
     2. تایپ‌های TypeScript را برای Fabric SDK به‌روز کنید
     3. ABI‌ها را با تعاریف Fabric جایگزین کنید

3. **مدیریت وابستگی‌ها**:
   - از `@dao/contracts` در پروژه‌های `dao-ui` و `backend` استفاده کنید
   - نسخه پکیج را در `package.json` پروژه‌ها مشخص کنید
   - از workspace برای توسعه محلی استفاده کنید

4. **تست و استقرار**:
   - قبل از انتشار نسخه جدید، همه تست‌ها را اجرا کنید
   - تغییرات را در محیط تست بررسی کنید
   - از CI/CD برای استقرار خودکار استفاده کنید

## ساختار فایل‌ها

```
contracts/
├── artifacts/          # فایل‌های ABI تولید شده
├── contracts/          # قراردادهای هوشمند
├── typechain-types/    # تایپ‌های TypeScript تولید شده
├── dist/              # کد کامپایل شده
└── src/               # کد منبع TypeScript
```

## مشارکت

1. یک branch جدید ایجاد کنید
2. تغییرات خود را اعمال کنید
3. تست‌ها را اجرا کنید
4. یک Pull Request ایجاد کنید

## لایسنس

MIT
