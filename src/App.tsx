import { useEffect, useState } from "react";

import twitter from "./assets/x-twitter.svg";

import "./App.scss";

interface Quote {
	title: string;
	content: string;
	author: string;
	id: number;
}

function App() {
	const [quotes, setQuotes] = useState<Quote[]>();
	const [color, setColor] = useState("");

	const changeColor = () => {
		const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);
		const randomFullColor = `#${randomHexColor}`;
		setColor(randomFullColor);
	};

	const fetchQuotes = async () => {
		const res = await fetch("https://api.quotable.io/quotes/random");
		const data = await res.json();
		setQuotes(data);
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	return (
		<div
			className="container"
			style={{ backgroundColor: color ? color : "gray" }}
		>
			{quotes?.map((quote) => {
				return (
					<div className="card" id="quote-box" key={quote.author}>
						<div
							className="card-body"
							style={{ color: color ? color : "gray" }}
						>
							<p className="card-text" id="text">
								{quote.content}
							</p>
							<p id="author">- {quote.author}</p>
							<div className="card-links">
								<a
									href="twitter.com/intent/tweet"
									target="_blank"
									id="tweet-quote"
									className="btn"
									style={{ backgroundColor: color ? color : "gray" }}
								>
									<img
										src={twitter}
										style={{ height: "24px", width: "24px" }}
									/>
								</a>
								<button
									id="new-quote"
									className="btn"
									onClick={() => {
										fetchQuotes();
										changeColor();
									}}
									style={{
										backgroundColor: color ? color : "gray",
										color: color == "#ffffff" ? "#000000" : "#ffffff",
									}}
								>
									New Quote
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
