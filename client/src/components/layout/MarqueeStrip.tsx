const items = [
  '🌾 Organic Wheat', '🥦 Fresh Broccoli', '🍅 Sun-Ripened Tomatoes', '🥕 Himalayan Carrots',
  '🌽 Sweet Corn', '🍇 Black Grapes', '🫚 Cold-Pressed Oils', '🍓 Strawberries',
  '🧅 Red Onions', '🥑 Avocados', '🌿 Fresh Herbs', '🍋 Organic Lemons',
  '🫛 Green Peas', '🌾 Brown Rice', '🥬 Baby Spinach', '🫐 Blueberries',
];

const MarqueeStrip = () => (
  <div className="hh-marquee-strip">
    <div className="hh-marquee-inner">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="hh-marquee-item">
          {item}
          <span className="dot" />
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeStrip;
