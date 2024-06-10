function truncateText(text, ) {
    if (text.length <= 100) {
        return text;
    } else {
        return text.slice(0, 100) + "...";
    }
}

export default truncateText;
