import React, { useState } from "react";
import Chevron from 'react-chevron';
import "./readMore.css";

const ReadMore = ({ children }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

return (
	<p className="text">
	{isReadMore ? text.slice(0, 150) : text}
	<span onClick={toggleReadMore} className="read-or-hide">
		{isReadMore ? 
		<p id="chevron" >Show More<Chevron id="chevron2" direction={'down'} style={{color: "#ffffff",}} /></p> : 
		<p id="chevron" >Show less<Chevron id="chevron2"  direction={'up'}   style={{color: "#ffffff",}} /></p>
		}
	</span>
	</p>
);
};

export default ReadMore;
