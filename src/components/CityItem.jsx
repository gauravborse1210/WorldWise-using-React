import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

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

// Main Component
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
