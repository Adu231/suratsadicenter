// Surat Sadi Center - Frontend Shipping Service
// Validates Indian PIN codes, calculates estimated delivery dates, and checks serviceability

export const shippingService = {
  async checkServiceability(pincode, subtotal = 0) {
    const cleaned = (pincode || '').toString().trim();
    const isValidPattern = /^[1-9][0-9]{5}$/.test(cleaned);

    if (!isValidPattern) {
      return {
        isServiceable: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      };
    }

    // Default origin: 413534 (Dharashiv, Maharashtra)
    const isLocal = cleaned.startsWith('41');
    const isMaharashtra = cleaned.startsWith('40') || cleaned.startsWith('41') || cleaned.startsWith('42') || cleaned.startsWith('43') || cleaned.startsWith('44');

    const estimatedDays = isLocal ? '2 - 3 business days' : isMaharashtra ? '3 - 4 business days' : '4 - 6 business days';
    const shippingFee = subtotal >= 1499 ? 0 : 79;

    return {
      isServiceable: true,
      pincode: cleaned,
      originPincode: '413534',
      originCity: 'Dharashiv',
      state: isMaharashtra ? 'Maharashtra' : 'India (Pan-India Serviceable)',
      estimatedDays,
      shippingFee,
      isFreeShipping: shippingFee === 0,
      codAvailable: true,
      courierPartner: 'Express Surface (Demo Pan-India Logistics)'
    };
  },

  async getTracking(orderNumber) {
    return {
      orderNumber,
      carrier: 'Surat Sadi Center Pan-India Express',
      trackingUrl: '#',
      events: [
        { status: 'Order Confirmed', location: 'Dharashiv Hub (413534)', timestamp: 'Day 1' },
        { status: 'Quality Checked & Packed in Muslin Cloth', location: 'Dharashiv Hub', timestamp: 'Day 1' },
        { status: 'Dispatched via Surface Express', location: 'Pune Transit Center', timestamp: 'Day 2' },
        { status: 'Out for Delivery', location: 'Destination Hub', timestamp: 'Estimated Soon' }
      ]
    };
  }
};
