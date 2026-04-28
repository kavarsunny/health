import { useState, useEffect } from 'react';

const messages = [
  'Farm-Fresh Delivered to Your Door | Use code <strong>FRESH20</strong> for 20% OFF',
  'Free Shipping on orders above ₹499 | Order before 5 PM for same-day dispatch',
  'Shop for ₹599+ and grab a surprise gift! | Limited time offer',
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const prev = () => setCurrent((p) => (p - 1 + messages.length) % messages.length);
  const next = () => setCurrent((p) => (p + 1) % messages.length);

  return (
    <div className="ms-announcement-bar">
      <div className="ms-ann-arrows">
        <button className="ms-ann-btn" onClick={prev} aria-label="Previous">‹</button>
        <button className="ms-ann-btn" onClick={next} aria-label="Next">›</button>
      </div>
      {messages.map((msg, i) => (
        <span
          key={i}
          className={`ms-ann-slide ${i === current ? 'active' : ''}`}
          dangerouslySetInnerHTML={{ __html: msg }}
        />
      ))}
      <button className="ms-ann-close" onClick={() => setVisible(false)} aria-label="Close">×</button>
    </div>
  );
};

export default AnnouncementBar;
