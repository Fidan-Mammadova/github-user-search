// src/components/UserDetailsModal/UserDetailsModal.tsx
import React, { useEffect } from 'react';
import styles from './UserDetailsModal.module.scss';
import type { GitHubApiError } from '../../../services/api/githubApi'; 
import { useGetUserDetailsQuery } from '../../../services/api/githubApi'; 
import { Loader } from '../Loader/Loader'; 
import { Button } from '../Button/Button'; 

interface UserDetailsModalProps {
  username: string | null; 
  onClose: () => void; 
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ username, onClose }) => {

  const {
    data: userDetails,
    isLoading,
    isError,
    error,
  } = useGetUserDetailsQuery(username!, {
    skip: !username, 
  });

  useEffect(() => {
    if (username) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, [username]);

  if (!username) {
    return null; 
  }

  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <Loader />
          <Button onClick={onClose} variant="secondary" className={styles.closeButton}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (isError) {
    const apiError = error as GitHubApiError; 
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.modalTitle}>Loading Error</h2>
          <p className={styles.errorMessage}>
            Failed to load user data.{' '}
            {apiError?.message ? `Error: ${apiError.message}` : 'Please try again.'}
          </p>
          <Button onClick={onClose} variant="danger" className={styles.closeButton}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          User Details: {userDetails?.login}
        </h2>
        {userDetails && (
          <div className={styles.details}>
            <img
              src={userDetails.avatar_url}
              alt={`${userDetails.login}'s avatar`}
              className={styles.avatarLarge}
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Avatar';
              }}
            />
            {/* Display name if exists, otherwise login */}
            <p className={styles.detailItem}>
              <strong>Name:</strong> {userDetails.name || userDetails.login}
            </p>

            {userDetails.bio && (
              <p className={styles.detailItem}>
                <strong>Bio:</strong> {userDetails.bio}
              </p>
            )}
            <p className={styles.detailItem}>
              <strong>Public Repositories:</strong> {userDetails.public_repos}
            </p>
            <p className={styles.detailItem}>
              <strong>Followers:</strong> {userDetails.followers}
            </p>
            <p className={styles.detailItem}>
              <strong>Following:</strong> {userDetails.following}
            </p>
            <p className={styles.detailItem}>
              <strong>GitHub Profile:</strong>{' '}
              <a
                href={userDetails.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLink}
              >
                {userDetails.html_url}
              </a>
            </p>
            {userDetails.company && (
              <p className={styles.detailItem}>
                <strong>Company:</strong> {userDetails.company}
              </p>
            )}
            {userDetails.location && (
              <p className={styles.detailItem}>
                <strong>Location:</strong> {userDetails.location}
              </p>
            )}
            {userDetails.blog && (
              <p className={styles.detailItem}>
                <strong>Blog:</strong>{' '}
                <a
                  href={userDetails.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileLink}
                >
                  {userDetails.blog}
                </a>
              </p>
            )}
            <p className={styles.detailItem}>
              <strong>Joined:</strong> {new Date(userDetails.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
        <Button onClick={onClose} variant="secondary" className={styles.closeButton}>
          Close
        </Button>
      </div>
    </div>
  );
};
