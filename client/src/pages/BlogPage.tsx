import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const posts = [
    { title: 'The Benefits of Cow-based Wellness', date: 'Oct 12, 2026', category: 'Wellness' },
    { title: 'Why Organic Jaggery is Better Than Sugar', date: 'Sep 28, 2026', category: 'Nutrition' },
    { title: 'A Day in the Life of a Healthify Haat Farmer', date: 'Sep 15, 2026', category: 'Community' },
  ];

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--ms-primary)' }}>Our Blog</h1>
        <p className="text-muted">Stories, tips, and insights on living the natural way of life.</p>
      </div>
      
      <div className="row g-4">
        {posts.map((post, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <span className="badge bg-success-subtle text-success mb-2">{post.category}</span>
                <h5 className="fw-bold mb-3">{post.title}</h5>
                <p className="text-muted small mb-4">{post.date}</p>
                <Link to="#" className="text-primary text-decoration-none fw-bold">Read More →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
