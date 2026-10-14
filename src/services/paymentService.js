// Surat Sadi Center - Frontend Payment Mock Service

export const paymentService = {
  getAvailableMethods() {
    return [
      {
        id: 'cod',
        name: 'Cash on Delivery (COD)',
        description: 'Pay cash or UPI to the courier upon delivery at your doorstep.',
        enabled: true,
        isDemoRecommended: true
      },
      {
        id: 'online',
        name: 'Online Payment (UPI, Cards, NetBanking)',
        description: 'Online payment gateway is disabled in this demo MVP.',
        enabled: false,
        disabledMessage: 'Online payment is not enabled in this demo. Please choose Cash on Delivery to test the order workflow.'
      }
    ];
  }
};