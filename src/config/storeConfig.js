// Surat Sadi Center — Centralized Store & WhatsApp Configuration
export const STORE_CONFIG = {
  name: 'Surat Sadi Center',
  tagline: 'Premium Handloom, Paithani & Bridal Sarees',
  owner: 'Prop. Sumit Asalkar',
  phone: '9890076010',
  displayPhone: '+91 9890076010',
  whatsappNumber: '919890076010',
  address: 'Behind Eet Gram Panchayat, Dist. Dharashiv, Maharashtra - 413534',
  pincode: '413534',
  city: 'Dharashiv',
  state: 'Maharashtra',
  freeShippingThreshold: 1499,
  currencySymbol: '₹',
  operatingHours: '9:30 AM – 9:00 PM IST (All 7 Days)'
};

/**
 * Generate a prefilled WhatsApp enquiry URL for a single saree product
 */
export function getWhatsAppProductEnquiryUrl(product) {
  if (!product) {
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Surat Sadi Center, I would like to explore your saree collection.')}`;
  }

  const message = [
    `*Hello Surat Sadi Center,*`,
    `I am interested in inquiring about this saree:`,
    ``,
    `🏷️ *Product:* ${product.name}`,
    `🆔 *Item SKU:* ${product.sku || product.id}`,
    `💰 *Price:* ₹${(product.price || 0).toLocaleString('en-IN')}`,
    `🧵 *Fabric:* ${product.fabric || 'Pure Silk'}`,
    `🎨 *Colour:* ${product.colour || 'N/A'}`,
    ``,
    `Could you please share photos/video or confirm availability? Thank you!`
  ].join('\n');

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a prefilled WhatsApp order message for the entire cart
 */
export function getWhatsAppCartOrderUrl(items = [], total = 0, customer = null) {
  if (!items || items.length === 0) {
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Surat Sadi Center, I have an inquiry regarding saree orders.')}`;
  }

  const itemsList = items.map((item, idx) => {
    return `${idx + 1}. *${item.name}* (Qty: ${item.quantity}) — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
  }).join('\n');

  const customerDetails = customer && customer.name ? [
    ``,
    `👤 *Customer Name:* ${customer.name}`,
    `📞 *Phone:* ${customer.phone || 'N/A'}`,
    `📍 *Delivery City / PIN:* ${customer.city || ''} ${customer.pincode ? `(${customer.pincode})` : ''}`
  ].join('\n') : '';

  const message = [
    `*Namaskar Surat Sadi Center,*`,
    `I would like to place an order for the following saree(s):`,
    ``,
    itemsList,
    ``,
    `💰 *Total Amount:* ₹${total.toLocaleString('en-IN')}`,
    customerDetails,
    ``,
    `Please confirm stock availability and Cash on Delivery dispatch schedule. Thank you!`
  ].filter(line => line !== null).join('\n');

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
