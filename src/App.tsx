import { useState, useEffect } from "react";
import "./App.css";
import twitter from "./assets/x-twitter.svg";

interface Quote {
	title: string;
	content: string;
	author: string;
	id: number;
}

function App() {
	const [quotes, setQuotes] = useState<Quote[]>([]);

	const fetchQuotes = async () => {
		const res = await fetch("https://api.quotable.io/quotes/random");
		const data = await res.json();
		setQuotes(data);
		console.log(data);
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col d-flex justify-content-center">
					{quotes?.map((quote) => {
						return (
							<div className="card mw-100" id="quote-box" key={quote.id}>
								<div className="card-body">
									<p className="card-text fs-4" id="text">
										{quote.content}
									</p>
									<p className="text-secondary" id="author">
										- {quote.author}
									</p>
									<div>
										<a
											href="twitter.com/intent/tweet"
											target="_blank"
											id="tweet-quote"
										>
											<i className={twitter}></i>
											tweet quote
										</a>
										<button
											id="new-quote"
											className="btn btn-primary mx-2"
											onClick={fetchQuotes}
										>
											quote text
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
