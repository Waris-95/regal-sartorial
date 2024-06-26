import "./DeadLink.css";
import { Link } from "react-router-dom";

function DeadLinkPage() {
    return (
        <div className="deadlink-page">
            <img
                alt="404 Not Found"
                className="background-image"
            />
            <div className="content-overlay">
                <div className="message-box">
                    <h1 className="message-header">Looks like you're lost</h1>
                    <div className="redirect-message">
                        Click <Link to="/">here</Link> to be redirected.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeadLinkPage;
