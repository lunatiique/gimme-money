import React from 'react';
import styles from './css/WaveText.module.css'; // Import the CSS module file

const WaveText = ({text}) => {
  return (
    <div className={styles.waveContainer}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={styles.waveLetter}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default WaveText;
