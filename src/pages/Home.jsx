// Home.jsx
import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import Features from '../components/home/Features';
import ProductGrid from '../components/product/ProductGrid';
import NewCollection from '../components/home/NewCollection';
import PromoGrid from '../components/home/PromoGrid';
import MembershipBanner from '../components/home/MembershipBanner';
import SeasonalBanner from '../components/home/SeasonalBanner';
import { featuredProducts, newProducts } from '../utils/constants';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import BlogTips from '../components/home/BlogTips';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Features />
      <Categories />
      <PromoGrid />
      <ProductGrid title="Featured Products" products={featuredProducts} />
      <NewCollection />
      <ProductGrid title="New Products" products={newProducts} />
      <MembershipBanner />
      <SeasonalBanner />
      <Testimonials/>
      <BlogTips/>
    </div>
  );
};

export default Home;