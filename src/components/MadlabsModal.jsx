import React, { useEffect } from 'react';

export default function MadlabsModal({ onClose }) {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box modal-madlabs" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="madlabs-title"
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-header">
          <div className="modal-tag">ENTERPRISE ARCHITECTURE</div>
          <h2 id="madlabs-title" className="modal-title">MAD LABS Infrastructure & Engineering Standards</h2>
        </div>

        <div className="modal-body">
          <p className="modal-lead">
            MAD LABS builds scalable, zero-downtime digital operations for global enterprises and institutional clients.
          </p>

          <div className="madlabs-specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
            <div className="spec-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--color-primary-green)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Cloud Native Infrastructure</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                Microservices and serverless architectures on AWS, GCP, and Azure with multi-region high availability.
              </p>
            </div>

            <div className="spec-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--color-primary-green)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <i className="fa-solid fa-shield-virus"></i>
              </div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Zero Trust Security</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                End-to-end encryption at rest and in transit, strict RBAC, automated penetration testing, and ISO/PCI compliance.
              </p>
            </div>

            <div className="spec-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--color-primary-green)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.35rem' }}>Automated CI/CD & Telemetry</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                Zero-downtime deployment pipelines, automated rollbacks, and 24/7 synthetic telemetry monitoring.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Close
            </button>
            <a 
              href="https://madlabs.lk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Visit madlabs.lk <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
