import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Steps, message } from 'antd';
import { kycService } from '@/services/kyc.service';
import { web3Service } from '@/services/web3.service';
import styles from '@/styles/components/KYCForm.module.css';

const { Step } = Steps;

export const KYCForm: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isIran, setIsIran] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const checkLocation = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryCode = data.country_code;
      setIsIran(countryCode === 'IR');
      return countryCode;
    } catch (error) {
      console.error('Error checking location:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const countryCode = await checkLocation();
      if (countryCode) {
        form.setFieldsValue({ country: countryCode });
      }
    };
    init();
  }, [form, checkLocation]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const address = await web3Service.getAddress();
      await kycService.startKYCProcess(address, values);
      message.success(t('kyc.success'));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error(t('kyc.error'));
    } finally {
      setLoading(false);
    }
  };

  const renderKYCForm = () => {
    if (isIran === null) return null;

    return (
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label={t('kyc.fullName')}
          name="fullName"
          rules={[{ required: true, message: t('kyc.fullNameRequired') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('kyc.nationalId')}
          name="nationalId"
          rules={[{ required: true, message: t('kyc.nationalIdRequired') }]}
        >
          <Input />
        </Form.Item>

        {isIran ? (
          <Form.Item
            label={t('kyc.mobileNumber')}
            name="mobileNumber"
            rules={[{ required: true, message: t('kyc.mobileNumberRequired') }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            label={t('kyc.passportNumber')}
            name="passportNumber"
            rules={[{ required: true, message: t('kyc.passportNumberRequired') }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('kyc.submit')}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const steps = [
    {
      title: t('kyc.step1'),
      content: t('kyc.connectWallet'),
    },
    {
      title: t('kyc.step2'),
      content: renderKYCForm(),
    },
    {
      title: t('kyc.step3'),
      content: t('kyc.verification'),
    },
  ];

  return (
    <div className={styles.container}>
      <h2>{t('kyc.title')}</h2>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.content}>{steps[currentStep].content}</div>
    </div>
  );
};

export default KYCForm; 