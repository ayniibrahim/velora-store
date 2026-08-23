import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Truck, ArrowRight, Printer } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedPromo,
    formatPrice,
    lastOrder,
    setLastOrder,
    navigateTo
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 382-9011',
    address: '740 Park Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    zip: '10021',
    country: 'United States',
    shippingMethod: 'express', // 'express' | 'white-glove'
    paymentMethod: 'card', // 'card' | 'apple-pay'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '•••',
    saveInfo: true
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder: OrderDetails = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: formData.shippingMethod === 'white-glove' ? cartShipping + 45 : cartShipping,
        total: formData.shippingMethod === 'white-glove' ? cartTotal + 45 : cartTotal,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod === 'card' ? 'Visa ending in 4242' : 'Apple Pay',
        status: 'Confirmed'
      };

      setLastOrder(completedOrder);
      clearCart();
      setIsProcessing(false);
      setStep('confirmation');
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (step === 'confirmation') {
      setStep('shipping');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        id="checkout-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={step === 'confirmation' ? handleClose : undefined}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl bg-[#fbf9f5] shadow-2xl border border-[#d2c4ba] overflow-hidden">
          {/* Top Bar */}
          <div className="bg-[#1b1c1a] text-white p-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg tracking-[0.2em] font-bold">VELORA</span>
              <span className="text-[10px] text-[#c4a78d] tracking-widest uppercase hidden sm:inline">
                • Concierge Checkout
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-[#999] hover:text-white p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Header */}
          {step !== 'confirmation' && (
            <div className="bg-[#f0ebe3] px-6 py-3 border-b border-[#d2c4ba] flex items-center justify-center gap-6 sm:gap-12 text-xs font-semibold uppercase tracking-wider">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#1b1c1a]' : 'text-[#715a44]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'shipping' ? 'bg-[#1b1c1a] text-white' : 'bg-[#c4a78d] text-white'
                }`}>1</span>
                <span>Shipping Address</span>
              </div>
              <div className="w-8 h-[1px] bg-[#d2c4ba]" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#1b1c1a]' : 'text-[#999]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'payment' ? 'bg-[#1b1c1a] text-white' : 'bg-[#d2c4ba] text-white'
                }`}>2</span>
                <span>Payment & Review</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-6 sm:p-8">
            {/* Step 1: Shipping Address */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Shipping Fields */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-[#1b1c1a] font-medium border-b border-[#d2c4ba] pb-2">
                      Client Contact & Delivery Destination
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                          Last Name
                        </label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                        Email Address (for order confirmation)
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                        Street Address
                      </label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                          City
                        </label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                          State / Region
                        </label>
                        <input
                          required
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                          Postal Code
                        </label>
                        <input
                          required
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Speed & Summary */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-[#1b1c1a] font-medium border-b border-[#d2c4ba] pb-2">
                      Delivery Method
                    </h3>

                    <div className="space-y-3">
                      <label className={`block p-3.5 border cursor-pointer transition-colors ${
                        formData.shippingMethod === 'express' ? 'border-[#1b1c1a] bg-white' : 'border-[#d2c4ba] bg-[#f5f3ef]'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="express"
                              checked={formData.shippingMethod === 'express'}
                              onChange={handleInputChange}
                              className="accent-[#1b1c1a]"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#1b1c1a]">Complimentary Express Global</p>
                              <p className="text-[11px] text-[#777]">2–4 business days • Insured tracking</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#715a44]">
                            {cartShipping === 0 ? 'FREE' : formatPrice(cartShipping)}
                          </span>
                        </div>
                      </label>

                      <label className={`block p-3.5 border cursor-pointer transition-colors ${
                        formData.shippingMethod === 'white-glove' ? 'border-[#1b1c1a] bg-white' : 'border-[#d2c4ba] bg-[#f5f3ef]'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="white-glove"
                              checked={formData.shippingMethod === 'white-glove'}
                              onChange={handleInputChange}
                              className="accent-[#1b1c1a]"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#1b1c1a]">Velora White-Glove VIP Courier</p>
                              <p className="text-[11px] text-[#777]">Next business day • Silk hanger & keepsake box</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#1b1c1a]">+$45.00</span>
                        </div>
                      </label>
                    </div>

                    {/* Order summary mini */}
                    <div className="bg-[#f5f3ef] p-4 border border-[#d2c4ba] mt-4 text-xs space-y-2">
                      <div className="flex justify-between font-medium text-[#5f5e5e]">
                        <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                        <span>{formatPrice(cartSubtotal)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-[#715a44]">
                          <span>Discount ({appliedPromo.code})</span>
                          <span>-{formatPrice(cartDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-[#1b1c1a] pt-2 border-t border-[#d2c4ba]">
                        <span>Total Due</span>
                        <span>{formatPrice(formData.shippingMethod === 'white-glove' ? cartTotal + 45 : cartTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d2c4ba] flex justify-end">
                  <button
                    type="submit"
                    className="luxury-btn-primary px-8 py-3.5 text-xs font-semibold tracking-widest flex items-center gap-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-[#1b1c1a] font-medium border-b border-[#d2c4ba] pb-2 flex items-center justify-between">
                      <span>Secure Payment Selection</span>
                      <Lock className="w-4 h-4 text-[#715a44]" />
                    </h3>

                    <div className="space-y-3">
                      <label className={`block p-3.5 border cursor-pointer transition-colors ${
                        formData.paymentMethod === 'card' ? 'border-[#1b1c1a] bg-white' : 'border-[#d2c4ba] bg-[#f5f3ef]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="accent-[#1b1c1a]"
                          />
                          <CreditCard className="w-4 h-4 text-[#1b1c1a]" />
                          <span className="text-xs font-bold text-[#1b1c1a]">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                        </div>
                      </label>

                      {formData.paymentMethod === 'card' && (
                        <div className="p-4 bg-white border border-[#d2c4ba] space-y-3 mt-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2 text-xs font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                                Expiration
                              </label>
                              <input
                                type="text"
                                name="cardExp"
                                value={formData.cardExp}
                                onChange={handleInputChange}
                                className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                                Security CVC
                              </label>
                              <input
                                type="text"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2 text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <label className={`block p-3.5 border cursor-pointer transition-colors ${
                        formData.paymentMethod === 'apple-pay' ? 'border-[#1b1c1a] bg-white' : 'border-[#d2c4ba] bg-[#f5f3ef]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="apple-pay"
                            checked={formData.paymentMethod === 'apple-pay'}
                            onChange={handleInputChange}
                            className="accent-[#1b1c1a]"
                          />
                          <span className="text-xs font-bold text-[#1b1c1a]">Apple Pay / Google Pay Instant</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Final Review Breakdown */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-[#1b1c1a] font-medium border-b border-[#d2c4ba] pb-2">
                      Review Order Items
                    </h3>

                    <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 text-xs border-b border-[#d2c4ba]/40 pb-2">
                          <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover" />
                          <div className="flex-1">
                            <p className="font-serif font-medium text-[#1b1c1a] line-clamp-1">{item.product.name}</p>
                            <p className="text-[#777]">{item.selectedColor} • {item.selectedSize} (x{item.quantity})</p>
                          </div>
                          <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#f0ebe3] p-4 border border-[#d2c4ba] text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span>Shipping to:</span>
                        <span className="text-[#1b1c1a] font-medium">{formData.city}, {formData.country}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#1b1c1a] pt-2 border-t border-[#d2c4ba]">
                        <span>Grand Total</span>
                        <span>{formatPrice(formData.shippingMethod === 'white-glove' ? cartTotal + 45 : cartTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d2c4ba] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="text-xs text-[#715a44] underline uppercase tracking-wider font-semibold"
                  >
                    ← Edit Shipping Details
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="luxury-btn-primary px-8 py-3.5 text-xs font-semibold tracking-widest flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Authorizing Payment...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>AUTHORIZE & PLACE ORDER</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 'confirmation' && lastOrder && (
              <div className="text-center py-6 sm:py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#c4a78d]/20 text-[#715a44] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-[11px] tracking-[0.25em] text-[#715a44] uppercase font-semibold">
                    Payment Succeeded • Order Confirmed
                  </span>
                  <h2 className="font-serif text-3xl text-[#1b1c1a] font-medium mt-1">
                    Thank You, {lastOrder.customer.firstName}
                  </h2>
                  <p className="text-xs text-[#5f5e5e] mt-2">
                    Order Reference: <strong className="text-[#1b1c1a] font-mono">{lastOrder.orderId}</strong>
                  </p>
                  <p className="text-xs text-[#5f5e5e] max-w-md mx-auto mt-1">
                    An official receipt and tracking link have been dispatched to <span className="text-[#1b1c1a] font-medium">{lastOrder.customer.email}</span>.
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="max-w-xl mx-auto bg-white border border-[#d2c4ba] p-6 text-left text-xs space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#d2c4ba]">
                    <span className="font-serif text-sm font-semibold tracking-wider">ORDER SUMMARY</span>
                    <span className="text-[#777]">{lastOrder.date}</span>
                  </div>

                  <div className="space-y-3">
                    {lastOrder.items.map((it) => (
                      <div key={it.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[#1b1c1a]">{it.product.name}</p>
                          <p className="text-[#777] text-[11px]">{it.selectedColor} / {it.selectedSize} × {it.quantity}</p>
                        </div>
                        <span className="font-medium text-[#1b1c1a]">
                          {formatPrice(it.product.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#d2c4ba] space-y-1 text-[#5f5e5e]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(lastOrder.subtotal)}</span>
                    </div>
                    {lastOrder.discount > 0 && (
                      <div className="flex justify-between text-[#715a44]">
                        <span>Privilege Discount</span>
                        <span>-{formatPrice(lastOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{lastOrder.shipping === 0 ? 'Complimentary' : formatPrice(lastOrder.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#1b1c1a] pt-2 border-t border-[#d2c4ba]">
                      <span>Total Paid</span>
                      <span>{formatPrice(lastOrder.total)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#d2c4ba] text-[11px] text-[#777] flex justify-between items-center">
                    <span>Delivering to: {lastOrder.customer.address}, {lastOrder.customer.city}</span>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1 text-[#1b1c1a] font-semibold underline"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Receipt
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      handleClose();
                      navigateTo('shop');
                    }}
                    className="luxury-btn-primary px-8 py-3.5 text-xs font-semibold tracking-widest"
                  >
                    CONTINUE EXPLORING ATELIER
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      navigateTo('home');
                    }}
                    className="luxury-btn-ghost px-8 py-3.5 text-xs font-semibold tracking-widest"
                  >
                    RETURN TO HOME
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
