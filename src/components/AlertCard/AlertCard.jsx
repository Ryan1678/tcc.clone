import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./AlertCard.css";

export const AlertCard = ({title, message, link}) => {
  return (
    <div className="card">
        <div className="header">
            <div className="image">
                <svg aria-hidden="true" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinejoin="round" strokeLinecap="round"></path></svg>
            </div>

            <div className="content">
                <span className="title">{title}</span>
                <p className="message">{message}</p>
            </div>
            
            <div className="actions">
                <Link to={link}>
                    <button className="desactivate" type="button">Voltar para página</button>
                </Link> 
            </div>
        </div>
    </div>
  );
};

AlertCard.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};