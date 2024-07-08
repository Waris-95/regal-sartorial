import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getUserStyles, deleteStyle } from "../../redux/styles";
import OpenModalButton from '../OpenModalButton'
import StylesFormPage from "./StylesFormPage";
import StylesDetails from "./StylesDetail";
import "./Styles.css";

function Styles() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const styles = useSelector(state => state.styles);
    const [stylesLoaded, setStylesLoaded] = useState(false);

    const greyImage = "https://garden.spoonflower.com/c/5090068/p/f/m/3yDyWOWB4oECjSmqcc9qmveAYXj9WfizlmWcqq8S3gEqvqlo5DilMA/Light%20Gray%20Solid.jpg";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getUserStyles()).then(() => setStylesLoaded(true));
        }
    }, [dispatch, user]);

    if (!user) {
        return <Navigate to='/login' />;
    }

    const removeStyle = (style) => {
        dispatch(deleteStyle(style.id));
    }

    if (!stylesLoaded) {
        return <div>Loading...</div>;
    }

    if (styles && Object.keys(styles).length) {
        const stylesArray = Object.entries(styles).map((style) => style[1]);

        return (
            <div className="styles-container">
                <div className="page-header">
                    <h1>my styles</h1>
                </div>
                <div className="styles-cards-container">
                    <div className="style-cards-box">
                        {stylesArray.map((style, i) => (
                            <div key={i} className="style-card">
                                <Link className="style-link" to={`/styles/${style.id}`}>
                                    <div className="style-card-image-container">
                                        <img
                                            loading="lazy"
                                            className="style-card-image1"
                                            src={style.styleItems.length > 0 ? style.styleItems[0].product.products[0].image1 : greyImage}
                                            alt="style"
                                        />
                                        <div className="style-small-images">
                                            <img
                                                loading="lazy"
                                                className="style-card-image2"
                                                src={style.styleItems.length > 1 ? style.styleItems[1].product.products[0].image1 : greyImage}
                                                alt="style"
                                            />
                                            <img
                                                loading="lazy"
                                                className="style-card-image3"
                                                src={style.styleItems.length > 2 ? style.styleItems[2].product.products[0].image1 : greyImage}
                                                alt="style"
                                            />
                                        </div>
                                    </div>
                                    <div className="style-card-title">{style.title.toLowerCase()}</div>
                                </Link>
                                <button className="store-button delete-style2" onClick={() => removeStyle(style)}>delete style</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="new-style-button-container">
                    <OpenModalButton
                        buttonText="add new style"
                        modalComponent={<StylesFormPage styles={stylesArray} />}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="page-header">
                    <h1>My wardrobe</h1>
                </div>
                <div className="styles-container no-styles-container">
                    <div className="you-have-no-styles">You have no items in wardrobe</div>
                    <OpenModalButton
                        buttonText="Add To Wardrobe"
                        modalComponent={<StylesFormPage />}
                    />
                </div>
            </>
        );
    }
}

export default Styles;
