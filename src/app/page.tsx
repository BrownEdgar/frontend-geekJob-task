import { OrderSummary } from '@/components/cart/OrderSummary';
import { OrderTableSection } from '@/components/cart/OrderTableSection';
import { CheckoutSection } from '@/components/checkout/CheckoutSection';
import { CustomerForm } from '@/components/checkout/CustomerForm';
import { OrderCheckoutPanel } from '@/components/checkout/OrderCheckoutPanel';
import { DesignTool } from '@/components/design/DesignTool';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTitle } from '@/components/layout/PageTitle';
import { cn } from '@/lib/cn';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-12 lg:px-8">
        <PageTitle />

        {/* Mobile: vertical layout */}
        <div className="flex flex-col lg:hidden">
          <CustomerForm />
          <OrderTableSection />
          <OrderSummary />
          <CheckoutSection showSubmit={false} />
        </div>

        {/* Desktop: responsive layout with row wrap */}
        <div
          className={cn(
            'hidden gap-2 lg:grid',
            'lg:grid-cols-1',
            'xl:grid-cols-2',
            '2xl:grid-cols-[1.2fr_1.2fr_0.9fr]'
          )}
        >
          <div className="flex min-w-0 flex-col gap-2">
            <OrderTableSection />
          </div>

          <DesignTool />

          <div className={cn('max-w-[500px] min-w-0', 'xl:col-span-2', '2xl:col-span-1')}>
            <OrderCheckoutPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
