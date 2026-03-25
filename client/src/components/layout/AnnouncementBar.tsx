import { useState } from 'react';

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <span>🌿 Farm-Fresh Delivered to Your Door &nbsp;|&nbsp; Use code <strong>FRESH20</strong> for 20% OFF &nbsp;|&nbsp; Free shipping on orders above ₹499 🚚</span>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#000',
          fontSize: '1rem',
          lineHeight: 1,
          padding: '0 4px',
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default AnnouncementBar;
