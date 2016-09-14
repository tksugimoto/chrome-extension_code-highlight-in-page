Array.from(document.querySelectorAll("pre")).forEach(pre => {
	hljs.highlightBlock(pre);
});
