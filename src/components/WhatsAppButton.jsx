import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = ({ message = 'Hello Surat Sadi Center, I would like to inquire about sarees.' }) => {
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919876543210?text=${encoded}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999
      }}
      title="Chat with Surat Sadi Center on WhatsApp"
      aria-label="Chat with Surat Sadi Center on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};
