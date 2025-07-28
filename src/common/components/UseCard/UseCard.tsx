// src/components/UserCard/UserCard.tsx
import React from 'react';
import styles from './UseCard.module.scss';
import type { GitHubUser } from '../../types/index'; 

interface UserCardProps {
  user: GitHubUser; 
  onClick: (user: GitHubUser) => void; 
}

export const UserCard: React.FC<UserCardProps> = React.memo(({ user, onClick }) => {
  console.log(`Rendering UserCard for: ${user.login}`); 

  return (
    <div className={styles.userCard} onClick={() => onClick(user)}>
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className={styles.avatar}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Avatar';
        }}
      />
      <h3 className={styles.login}>{user.login}</h3>
      <p className={styles.viewDetails}>View details →</p>
    </div>
  );
});
