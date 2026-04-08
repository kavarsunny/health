import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    tag: 'Nutrition',
    date: 'March 20, 2026',
    title: '10 Superfoods That Boost Your Immunity Naturally',
    excerpt: 'Discover the power of nature\'s best superfoods — from turmeric to moringa — and how incorporating them into your daily diet can significantly strengthen your immune system.',
    to: '/blog/superfoods-immunity',
  },
  {
    tag: 'Farming',
    date: 'March 15, 2026',
    title: 'How Organic Farming is Transforming Rural India',
    excerpt: 'Meet the farmers who are changing the face of agriculture by adopting sustainable practices and building a healthier future for their communities and consumers alike.',
    to: '/blog/organic-farming-india',
  },
  {
    tag: 'Recipes',
    date: 'March 10, 2026',
    title: '5 Quick & Healthy Farm-to-Table Recipes for Weekdays',
    excerpt: 'Fresh, simple, and delicious — these recipes use seasonal produce delivered straight from our farms to help you eat better without spending hours in the kitchen.',
    to: '/blog/healthy-recipes',
  },
];

const BlogSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ms-section ms-section-alt overflow-hidden">
      <div className="container">
        <div className="ms-section-header text-center mb-5">
          <div className="ms-section-eyebrow">Insights & Journal</div>
          <h2 className="ms-section-title">Latest from Our Blog</h2>
        </div>

        <div className="ms-blog-swapper" style={{ minHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div 
            key={current} 
            className="ms-blog-swap-item fade-in text-center" 
            style={{ maxWidth: '800px', animation: 'fadeIn 0.8s ease-out' }}
          >
            <div className="mb-2">
              <span className="ms-blog-tag me-3">{blogs[current].tag}</span>
              <span className="ms-blog-date">{blogs[current].date}</span>
            </div>
            <Link to={blogs[current].to} style={{ textDecoration: 'none' }}>
              <h3 className="ms-blog-title-lg mb-3" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ms-primary)' }}>
                {blogs[current].title}
              </h3>
            </Link>
            <p className="ms-blog-excerpt mx-auto" style={{ fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '650px', color: 'var(--ms-text-muted)' }}>
              {blogs[current].excerpt}
            </p>
            <Link to={blogs[current].to} className="ms-pill-btn mt-4" style={{ display: 'inline-flex', padding: '10px 24px' }}>
              Read Article <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-5">
          {blogs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? 'var(--ms-primary)' : 'var(--ms-border-dark)',
                border: 'none',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
