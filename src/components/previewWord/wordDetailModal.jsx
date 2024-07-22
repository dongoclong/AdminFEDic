import React from 'react';
import styles from './wordDetailModal.module.scss';

const WordDetailModal = ({ word, onClose }) => {
  if (!word) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>Word Details</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalContent}>
          <p><strong>Date:</strong> {word.date}</p>
          <p><strong>Word:</strong> {word.word}</p>
          <p><strong>Meaning:</strong> {word.meaning}</p>
          <p><strong>Description:</strong> {word.note}</p>
          <p><strong>User Edit:</strong> {word.user_add}</p>
          <p><strong>Subject:</strong> {word.subject}</p>
          <p><strong>Image:</strong> <img src={word.image[0].link} alt="word" className={styles.wordImage} /></p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.closeButtonFooter}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default WordDetailModal;
