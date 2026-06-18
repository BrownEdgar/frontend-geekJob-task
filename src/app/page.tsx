import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTitle } from '@/components/layout/PageTitle';
import { OrderTable } from '@/components/cart/OrderTable';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { DesignTool } from '@/components/design/DesignTool';
import { CustomerForm } from '@/components/checkout/CustomerForm';
import { CheckoutSection } from '@/components/checkout/CheckoutSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 lg:px-8">
        <PageTitle />

        {/* Mobile: vertical layout */}
        <div className="flex flex-col gap-8 lg:hidden">
          <CustomerForm />
          <OrderTable />
          <OrderSummary className="items-end" />
          <CheckoutSection showNotes showSubmit={false} />
        </div>

        {/* Desktop: 3-column layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-6">
            <OrderTable />
            <OrderSummary className="items-end" />
          </div>

          <DesignTool />

          <div className="flex flex-col gap-6">
            <CustomerForm />
            <OrderSummary className="items-stretch" />
            <CheckoutSection showNotes={false} showSubmit />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
