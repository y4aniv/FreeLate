function randomAgentId(): string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const getRandomLetter = () =>
		letters.charAt(Math.floor(Math.random() * letters.length));
	const number = Math.floor(100000 + Math.random() * 900000);
	return `${getRandomLetter()}${getRandomLetter()}${number}`;
}

export { randomAgentId };
