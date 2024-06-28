import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { authenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer"; // Import the Footer component

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Footer /> {/* Add the Footer component here */}
        <Modal />
      </ModalProvider>
    </>
  );
}
