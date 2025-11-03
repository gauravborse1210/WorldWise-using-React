import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  //For displaying Emojis from our fake API data

  const flagemojiToPNG = (flag) => {
    // Case 1: If it's a React <img /> element
    if (typeof flag === "object" && flag?.props?.src) {
      const src = flag.props.src;
      return <img src={src} alt="flag" />;
    }

    // Case 2: If it's a flag emoji (e.g., 🇫🇷)
    const flagEmojiRegex = /^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]$/;
    const isFlagEmoji = typeof flag === "string" && flagEmojiRegex.test(flag);

    if (isFlagEmoji) {
      const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map((char) => String.fromCharCode(char - 127397).toLowerCase())
        .join("");

      return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
      );
    }

    // Case 3: If it's already a valid image URL
    if (typeof flag === "string" && flag.startsWith("https://flagcdn.com/")) {
      return <img src={flag} alt="flag" />;
    }

    // Fallback for unknown input
    return null;
  };

  return (
    <li className={styles.countryItem}>
      <span>{flagemojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
