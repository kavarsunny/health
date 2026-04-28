import { Link } from 'react-router-dom';

const farmers = [
  {
    name: 'Ramu Patil',
    location: 'Nashik, Maharashtra',
    bio: 'Third-generation farmer growing premium organic grapes and tomatoes using natural methods passed down through 80 years of family wisdom.',
    tag: 'Organic Certified',
    weekly: '350+ kg weekly',
    avatar: 'RP',
    avatarBg: '#d1fae5',
    avatarColor: '#065f46',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=700&auto=format&fit=crop',
    products: ['Grapes', 'Tomatoes', 'Leafy Greens'],
  },
  {
    name: 'Kavitha Reddy',
    location: 'Kurnool, Andhra Pradesh',
    bio: 'Former software engineer turned full-time organic farmer. Kavitha inspired 20+ local farmers to go chemical-free and now supplies 3,000+ families monthly.',
    tag: 'Natural Farming',
    weekly: '200+ kg weekly',
    avatar: 'KR',
    avatarBg: '#dbeafe',
    avatarColor: '#1e40af',
    img: 'https://images.unsplash.com/photo-1595856461973-206d2d7c00e1?q=80&w=700&auto=format&fit=crop',
    products: ['Heirloom Vegetables', 'Millets', 'Herbs'],
  },
  {
    name: 'Suresh Choudhary',
    location: 'Sikar, Rajasthan',
    bio: 'Specialising in cold-pressed mustard oil and traditional Rajasthani spices using desert-adapted organic techniques refined over three generations.',
    tag: 'Traditional Farming',
    weekly: '180+ litres weekly',
    avatar: 'SC',
    avatarBg: '#fef3c7',
    avatarColor: '#92400e',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=700&auto=format&fit=crop',
    products: ['Mustard Oil', 'Spices', 'Dry Chilli'],
  },
];

const FarmerStories = () => (
  <section className="fs-section">
    <div className="container">
      <div className="fs-hdr">
        <div className="hh-section-eyebrow">Our Farming Community</div>
        <h2 className="hh-section-title">The Hands That Grow Your Food</h2>
        <p className="hh-section-sub">
          Every purchase you make directly empowers a real Indian farmer and their family.
        </p>
      </div>

      <div className="fs-grid">
        {farmers.map((f) => (
          <div key={f.name} className="fs-card">
            {/* Farm photo */}
            <div className="fs-img-wrap">
              <img src={f.img} alt={`${f.name}'s farm`} loading="lazy" />
              <div className="fs-img-veil" />
              <div className="fs-tag-pill">{f.tag}</div>
            </div>

            {/* Content */}
            <div className="fs-body">
              <div className="fs-quote">"</div>
              <p className="fs-bio">{f.bio}</p>

              <div className="fs-products">
                {f.products.map(p => <span key={p} className="fs-product-tag">{p}</span>)}
              </div>

              <div className="fs-author">
                <div className="fs-avatar" style={{ background: f.avatarBg, color: f.avatarColor }}>
                  {f.avatar}
                </div>
                <div>
                  <div className="fs-name">{f.name}</div>
                  <div className="fs-loc">
                    <i className="bi bi-geo-alt-fill" style={{ color: '#f59e0b', fontSize: '0.7rem' }} /> {f.location}
                  </div>
                  <div className="fs-weekly">{f.weekly}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/about" className="ms-btn-outline">
          Meet All Our Farmers <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>

    <style>{`
      .fs-section {
        background: #fafaf7;
        padding: 64px 0;
        border-top: 1px solid #e5e7eb;
      }
      .fs-hdr {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 40px;
      }
      .fs-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .fs-card {
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        border: 1.5px solid #f3f4f6;
        box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        transition: all 0.3s;
      }
      .fs-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 48px rgba(0,0,0,0.1);
        border-color: #e5e7eb;
      }
      .fs-img-wrap {
        position: relative;
        height: 200px;
        overflow: hidden;
      }
      .fs-img-wrap img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }
      .fs-card:hover .fs-img-wrap img { transform: scale(1.06); }
      .fs-img-veil {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%);
      }
      .fs-tag-pill {
        position: absolute;
        bottom: 12px;
        left: 12px;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(8px);
        font-size: 0.72rem;
        font-weight: 700;
        color: #374151;
        padding: 4px 12px;
        border-radius: 999px;
      }
      .fs-body {
        padding: 22px;
      }
      .fs-quote {
        font-size: 4rem;
        color: #f59e0b;
        opacity: 0.25;
        line-height: 0.7;
        font-family: Georgia, serif;
        margin-bottom: 8px;
      }
      .fs-bio {
        font-size: 0.88rem;
        color: #4b5563;
        line-height: 1.75;
        font-style: italic;
        margin-bottom: 14px;
      }
      .fs-products {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 16px;
      }
      .fs-product-tag {
        font-size: 0.7rem;
        font-weight: 600;
        background: #f0fdf4;
        color: #15803d;
        padding: 3px 9px;
        border-radius: 999px;
        border: 1px solid #bbf7d0;
      }
      .fs-author {
        display: flex;
        align-items: center;
        gap: 10px;
        border-top: 1px solid #f3f4f6;
        padding-top: 14px;
      }
      .fs-avatar {
        width: 44px; height: 44px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 0.92rem;
        flex-shrink: 0;
      }
      .fs-name {
        font-size: 0.92rem;
        font-weight: 700;
        color: #111827;
        font-family: var(--font-display);
      }
      .fs-loc {
        font-size: 0.73rem;
        color: #6b7280;
        margin-top: 1px;
      }
      .fs-weekly {
        font-size: 0.73rem;
        color: #9ca3af;
        margin-top: 1px;
      }
      @media (max-width: 991px) {
        .fs-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 575px) {
        .fs-grid { grid-template-columns: 1fr; }
        .fs-section { padding: 44px 0; }
        .fs-img-wrap { height: 180px; }
      }
    `}</style>
  </section>
);

export default FarmerStories;
