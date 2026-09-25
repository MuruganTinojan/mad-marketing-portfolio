import React, { useEffect } from 'react';

export default function SuccessModal({ data, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!data) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inquiry Received"
    >
      <div className="modal-dialog" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content-body modal-success-box">
          <div className="success-check-icon">
            <i className="fa-solid fa-check"></i>
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--text-primary)' }}>
            Inquiry Transmitted
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Thank you, <strong>{data.name}</strong>! Your inquiry regarding <strong>{data.subject}</strong> has been logged to our strategy queue and routed directly to our WhatsApp operations desk (+94 76 355 5873).
          </p>

          {data.waUrl && (
            <a
              href={data.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                background: '#25D366',
                color: '#000',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '18px' }}></i> Continue in WhatsApp Chat
            </a>
          )}

          <button
            className="btn btn-secondary"
            onClick={onClose}
            style={{ width: '100%', marginTop: '10px' }}
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
