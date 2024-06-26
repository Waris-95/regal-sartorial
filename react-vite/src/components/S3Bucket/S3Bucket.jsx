import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./S3Bucket.css";

function Video() {
  const videoRef = useRef(null);
  const playDuration = 50.9; // Time in seconds to play the video

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current.currentTime >= playDuration) {
        videoRef.current.pause();
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    // Autoplay the video once it's ready
    const handleLoadedMetadata = () => {
      videoElement.play();
    };
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [playDuration]);

  return (
    <div className="new-arrivals-container">
      <video
        ref={videoRef}
        loading="lazy"
        className="video-homepage"
        src="https://regalsartorial.s3.us-east-2.amazonaws.com/Giorgio+Armani+-+Made+to+Measure.mp4"
        autoPlay
        muted
        playsInline
      />
      <Link className="link-new-arrivals" to="/new-arrivals">Shop New Arrivals</Link>
    </div>
  );
}

export default Video;
