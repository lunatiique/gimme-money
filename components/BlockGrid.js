import React from 'react';
import styles from './css/BlockGrid.module.css'; // CSS module for styling

// Example icons array, feel free to expand or replace with any other icons and labels
const blocks = [
  { icon: <img src="/img/sepolia_icon.png" alt="sepolia" />, text: 'Sepolia', bottomText: 'It is deployed on Sepolia testnet for test purposes.'},
  { icon: <img src="img/crowdfunding_icon.png" alt="crowdfunding" />, text: 'Crowdfunding', bottomText: 'Launch your crowdfunding on the blockchain.' },
  { icon: <img src="img/safety_icon.png" alt="safety" />, text: 'Verification', bottomText: 'Verify your association for more legitimacy.' },
];

const BlockGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {blocks.map((block, index) => (
        <div key={index} className={styles.block}>
          <div className={styles.icon}>{block.icon}</div>
          <div className={styles.text}>{block.text}</div>
          <div className={styles.bottomText}>{block.bottomText}</div>
        </div>
      ))}
    </div>
  );
};

export default BlockGrid;
