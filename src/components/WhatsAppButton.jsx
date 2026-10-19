import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.js';

export const WhatsAppButton = ({ message = 'Hello Surat Sadi Center, I would like to inquire about sarees and ethnic wear.' }) => {
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title={`Chat with Surat Sadi Center on WhatsApp (${STORE_CONFIG.phone})`}
      aria-label="Chat with Surat Sadi Center on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};
