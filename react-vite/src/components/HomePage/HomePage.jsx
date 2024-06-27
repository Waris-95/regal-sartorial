import { useEffect } from "react";
import "./HomePage.css";
import "../../index.css"
import AllProducts from "../AllProducts/AllProducts";
import Video from "../S3Bucket/S3Bucket";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage-container">
      <div className="vid-container">
       <Video />
      </div>

      <div className="featured-collection-box">
        <div className="feature-collection-text">
          Featured Men&apo;s Collection
        </div>
      </div>

      <div className="all-prods-container">
        <AllProducts />
      </div>
    </div>
  );
}

export default HomePage;
