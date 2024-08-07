import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import { getUserStyles, newStyleItem } from "../../redux/styles";
import StylesFormPage from "./StylesFormPage";
import "./AddStyleItem.css";

function AddStyleItem({ styleItem, setMsg }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const styles = useSelector(state => state.styles);
    const [newStyle, setNewStyle] = useState(false);
    const [open, setOpen] = useState(false);
    const [chosenStyle, setChosenStyle] = useState(null);
    const [styleExists, setStyleExists] = useState(false);

    let stylesArray = styles ? Object.entries(styles).map((style) => style[1]) : [];

    useEffect(() => {
        dispatch(getUserStyles());
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(!open);
    };

    const addToStyle = async (style) => {
        setChosenStyle(style);
        setOpen(false);

        if (style && style.styleItems) {
            for (let i = 0; i < style.styleItems.length; i++) {
                if (style.styleItems[i].productTypeId === styleItem.id) {
                    setStyleExists(true);
                    return;
                }
            }
        }

        try {
            const result = await dispatch(newStyleItem(styleItem.id, style.id));
            setMsg({ "style": "This item has been added to your wardrobe" });
            closeModal();
        } catch (error) {
            console.error('Error adding to wardrobe:', error);
            setMsg({ "style": "Failed to add item to wardrobe" });
        }
    };

    const styleReturned = (returnedStyle) => {
        addToStyle(returnedStyle);
    };

    return (
        <div className="add-style-item-container">
            {!newStyle && (
                <div className="would-you-box">
                    <div className="would-you">Would you like to add to an existing wardrobe or create a new one?</div>
                    <div className="would-you-buttons">
                        <button className="store-button would-you-new-style" onClick={() => setNewStyle(true)}>Create a New One</button>
                        <div className="dropdown-styles">
                            <button className="store-button" onClick={handleOpen}>Your Wardrobe</button>
                            {open && (
                                <ul className="drop-down-menu-styles">
                                    {stylesArray.map(style => (
                                        <li key={style.id}>
                                            <button className="style-list-item" onClick={() => addToStyle(style)}>{style.title}</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {styleExists && (
                                <div className="already-has-item">*This wardrobe already has this item</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {newStyle && (
                <div className="new-style-modal-container">
                    <StylesFormPage styleReturned={styleReturned} setMsg={setMsg} />
                    <button className="nevermind-new-style" onClick={() => setNewStyle(false)}>Nevermind, I want to add it to an existing wardrobe</button>
                </div>
            )}
        </div>
    );
}

export default AddStyleItem;
