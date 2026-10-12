import React from 'react';
import { useLocation } from 'react-router-dom';

export const PolicyPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Privacy Policy';
  let content = (
    <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
      <p>
        At ToyVerse India Pvt Ltd, we value your trust. This Privacy Policy details the types of personal information collected when you browse and purchase from our store, and how we protect and manage that information.
      </p>
      <h3 className="font-heading font-bold text-base text-slate-900 pt-2">1. Information We Collect</h3>
      <p>
        We collect personal credentials including your name, shipping address, email, phone number, and transaction identifiers strictly for processing orders and ensuring secure courier fulfillment.
      </p>
      <h3 className="font-heading font-bold text-base text-slate-900 pt-2">2. Payment Security</h3>
      <p>
        We do not store your credit card numbers or banking passwords. All digital payments are processed through PCI-DSS Level 1 compliant gateway partners like Razorpay with 256-bit SSL encryption.
      </p>
    </div>
  );

  if (path.includes('refund')) {
    title = '7-Day Return & Refund Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          We stand behind the quality of every toy sold on ToyVerse. If you are not 100% delighted with your purchase, our straightforward 7-day return policy is here for you.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">Eligibility for Return</h3>
        <p>
          Items can be returned within 7 calendar days of delivery if they are damaged in transit, defective, or missing components. The toy must be in its original packaging with all included accessories.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">Fast Doorstep Pickup & Refunds</h3>
        <p>
          Upon return approval, our courier partner will collect the product from your address. Refunds are initiated back to the original payment source within 24–48 hours of return pickup.
        </p>
      </div>
    );
  } else if (path.includes('shipping')) {
    title = 'Shipping & Delivery Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          ToyVerse partners with India’s leading logistics providers (BlueDart, Delhivery, Shadowfax) to ensure prompt and secure delivery to over 19,000+ PIN codes.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">Shipping Charges & Thresholds</h3>
        <p>
          Orders valued at ₹999 or higher receive <strong>Free Express Shipping</strong>. Orders below ₹999 incur a nominal delivery fee of ₹99.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">Delivery Timelines</h3>
        <p>
          Metros & Capital Cities: 2 to 3 Business Days.<br />
          Other Cities & Towns: 3 to 6 Business Days.
        </p>
      </div>
    );
  } else if (path.includes('terms')) {
    title = 'Terms & Conditions';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          Welcome to ToyVerse. By accessing this website and placing an order, you agree to comply with and be bound by the following Terms and Conditions.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">1. Use of the Site</h3>
        <p>
          ToyVerse products are offered for legitimate retail purchase by individuals across India. All product imagery, trademarks, logos, and descriptions are proprietary to ToyVerse and respective toy brands.
        </p>
        <h3 className="font-heading font-bold text-base text-slate-900 pt-2">2. Pricing & Currency</h3>
        <p>
          All prices displayed are listed in Indian National Rupees (INR ₹) inclusive of all applicable Goods and Services Tax (GST).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-6">
      <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 pb-4 border-b border-slate-200">
        {title}
      </h1>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        {content}
      </div>
    </div>
  );
};
