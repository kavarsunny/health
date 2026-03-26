import { Link } from 'react-router-dom';

const blogs = [
  {
    icon: 'bi-heart-pulse-fill', iconBg: '#e8f5e9', iconColor: '#336939',
    tag: 'Nutrition',
    date: 'March 20, 2026',
    title: '10 Superfoods That Boost Your Immunity Naturally',
    excerpt: 'Discover the power of nature\'s best superfoods — from turmeric to moringa — and how incorporating them into your daily diet can significantly strengthen your immune system.',
    to: '/blog/superfoods-immunity',
  },
  {
    icon: 'bi-tree-fill', iconBg: '#fff8e1', iconColor: '#f57f17',
    tag: 'Farming',
    date: 'March 15, 2026',
    title: 'How Organic Farming is Transforming Rural India',
    excerpt: 'Meet the farmers who are changing the face of agriculture by adopting sustainable practices and building a healthier future for their communities and consumers alike.',
    to: '/blog/organic-farming-india',
  },
  {
    icon: 'bi-egg-fried', iconBg: '#f3e5f5', iconColor: '#8b5cf6',
    tag: 'Recipes',
    date: 'March 10, 2026',
    title: '5 Quick & Healthy Farm-to-Table Recipes for Weekdays',
    excerpt: 'Fresh, simple, and delicious — these recipes use seasonal produce delivered straight from our farms to help you eat better without spending hours in the kitchen.',
    to: '/blog/healthy-recipes',
  },
];

const BlogSection = () => (
  <section className="ms-section ms-section-alt">
    <div className="container">
      <div className="ms-section-header">
        <div className="ms-section-eyebrow">Journal</div>
        <h2 className="ms-section-title">Read Our Latest Blog</h2>
        <p className="ms-section-sub">
          Stay informed with farming stories, nutrition tips, healthy recipes, and sustainability insights.
        </p>
      </div>
      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog.to} className="col-md-4">
            <div className="ms-blog-card">
              <div className="ms-blog-img-wrap" style={{ background: blog.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
                <i className={`bi ${blog.icon}`} style={{ fontSize: '3rem', color: blog.iconColor, opacity: 0.85 }} />
              </div>
              <div className="ms-blog-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span className="ms-blog-tag">{blog.tag}</span>
                  <span className="ms-blog-date">{blog.date}</span>
                </div>
                <div className="ms-blog-title">{blog.title}</div>
                <p className="ms-blog-excerpt">{blog.excerpt}</p>
                <Link to={blog.to} className="ms-blog-read-more">
                  Read More <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/blog" className="ms-btn-outline">
          View All Articles <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>
  </section>
);

export default BlogSection;
