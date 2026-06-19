'use client';

import {
  CARD_FIELDS,
  type CardField,
  type CheckoutFormValues,
  checkoutSchema,
  emptyCheckoutValues,
  isCardField,
  sanitizeCardField,
} from '@/lib/validation';

import { type ReactNode, createContext, useCallback, useContext, useMemo } from 'react';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

interface CheckoutFormContextValue {
  setCheckoutField: (field: keyof CheckoutFormValues, value: string) => void;
}

const CheckoutFormContext = createContext<CheckoutFormContextValue | null>(null);

export function useCheckoutFormContext(): CheckoutFormContextValue {
  const ctx = useContext(CheckoutFormContext);
  if (!ctx) {
    throw new Error('useCheckoutFormContext must be used within CheckoutFormProvider');
  }
  return ctx;
}

export function CheckoutFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: emptyCheckoutValues as DefaultValues<CheckoutFormValues>,
    mode: 'onTouched',
  });

  const { setValue, trigger, getValues } = methods;

  const setCheckoutField = useCallback(
    (field: keyof CheckoutFormValues, rawValue: string) => {
      const value = isCardField(field) ? sanitizeCardField(field as CardField, rawValue) : rawValue;
      const paymentMethod = field === 'paymentMethod' ? value : (getValues('paymentMethod') ?? '');
      const shouldValidate =
        field === 'paymentMethod' || (isCardField(field) && paymentMethod === 'credit-card');

      setValue(field, value as never, { shouldValidate });
      if (field === 'paymentMethod' && value === 'credit-card') {
        void trigger([...CARD_FIELDS]);
      }
    },
    [getValues, setValue, trigger]
  );

  const contextValue = useMemo(() => ({ setCheckoutField }), [setCheckoutField]);

  return (
    <CheckoutFormContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </CheckoutFormContext.Provider>
  );
}
