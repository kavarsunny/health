import { Link } from 'react-router-dom';

const blogs = [
  {
    tag: 'Nutrition',
    tagColor: '#16a34a',
    tagBg: '#d1fae5',
    date: 'March 20, 2026',
    title: '10 Superfoods That Boost Your Immunity Naturally',
    excerpt: 'Discover the power of nature\'s best superfoods — from turmeric to moringa — and how they can dramatically strengthen your immune system.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    to: '/blog/superfoods-immunity',
    readTime: '5 min read',
  },
  {
    tag: 'Farming',
    tagColor: '#1d4ed8',
    tagBg: '#dbeafe',
    date: 'March 15, 2026',
    title: 'How Organic Farming is Transforming Rural India',
    excerpt: 'Meet the farmers who are changing agriculture by adopting sustainable practices and building a healthier future for communities.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    to: '/blog/organic-farming-india',
    readTime: '7 min read',
  },
  {
    tag: 'Recipes',
    tagColor: '#dc2626',
    tagBg: '#fee2e2',
    date: 'March 10, 2026',
    title: '5 Quick & Healthy Farm-to-Table Recipes for Weekdays',
    excerpt: 'Fresh, simple, and delicious — these seasonal recipes help you eat better without spending hours in the kitchen.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop',
    to: '/blog/healthy-recipes',
    readTime: '4 min read',
  },
];

const BlogSection = () => (
  <section className="hh-blog-section">
    <div className="container">
      <div className="hh-blog-hdr">
        <div>
          <div className="hh-section-eyebrow">Insights & Journal</div>
          <h2 className="hh-section-title">From Our Blog</h2>
          <p className="hh-section-sub">Tips, stories, and recipes from our farming community.</p>
        </div>
        <Link to="/blog" className="hh-stores-viewall d-none d-md-flex">
          All Articles <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="row g-3">
        {blogs.map((blog) => (
          <div key={blog.to} className="col-12 col-md-4">
            <Link to={blog.to} className="hh-blog-card">
              <div className="hh-blog-img-wrap">
                <img src={blog.img} alt={blog.title} loading="lazy" />
                <div className="hh-blog-img-overlay" />
              </div>
              <div className="hh-blog-body">
                <div className="hh-blog-meta">
                  <span className="hh-blog-tag" style={{ background: blog.tagBg, color: blog.tagColor }}>
                    {blog.tag}
                  </span>
                  <span className="hh-blog-readtime">
                    <i className="bi bi-clock" /> {blog.readTime}
                  </span>
                </div>
                <h3 className="hh-blog-title">{blog.title}</h3>
                <p className="hh-blog-excerpt">{blog.excerpt}</p>
                <div className="hh-blog-footer">
                  <span className="hh-blog-date">{blog.date}</span>
                  <span className="hh-blog-readmore">
                    Read <i className="bi bi-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .hh-blog-section {
        background: #fff;
        padding: 56px 0;
        border-top: 1px solid #f1f5f9;
      }
      .hh-blog-hdr {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 28px;
      }
      .hh-blog-card {
        display: block;
        background: #fff;
        border: 1.5px solid #f1f5f9;
        border-radius: 16px;
        overflow: hidden;
        text-decoration: none;
        height: 100%;
        transition: all 0.25s;
      }
      .hh-blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 36px rgba(0,0,0,0.08);
        border-color: #e5e7eb;
      }
      .hh-blog-img-wrap {
        position: relative;
        height: 180px;
        overflow: hidden;
      }
      .hh-blog-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
      }
      .hh-blog-card:hover .hh-blog-img-wrap img { transform: scale(1.06); }
      .hh-blog-img-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.2) 100%);
      }
      .hh-blog-body { padding: 18px; }
      .hh-blog-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .hh-blog-tag {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        padding: 3px 10px;
        border-radius: 999px;
      }
      .hh-blog-readtime {
        font-size: 0.73rem;
        color: #9ca3af;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .hh-blog-title {
        font-size: 0.98rem;
        font-weight: 700;
        color: #111827;
        line-height: 1.4;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-family: var(--font-display);
      }
      .hh-blog-excerpt {
        font-size: 0.82rem;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .hh-blog-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #f1f5f9;
        padding-top: 10px;
      }
      .hh-blog-date {
        font-size: 0.72rem;
        color: #9ca3af;
      }
      .hh-blog-readmore {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--ms-primary);
        display: flex;
        align-items: center;
        gap: 4px;
        transition: gap 0.2s;
      }
      .hh-blog-card:hover .hh-blog-readmore { gap: 8px; }
    `}</style>
  </section>
);

export default BlogSection;
