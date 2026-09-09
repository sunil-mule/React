import './Banner.css';

export default function Banner({
  imageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
  title = 'Mega Sale Event',
  subtitle = 'Explore top-rated products with incredible discounts.',
}) {
  return (
    <div className="banner">
      <img src={imageUrl} alt={title} className="banner-image" />
      <div className="banner-overlay">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
