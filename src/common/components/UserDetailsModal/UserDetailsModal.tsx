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
            Закрыть
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
          <h2 className={styles.modalTitle}>Ошибка загрузки</h2>
          <p className={styles.errorMessage}>
            Не удалось загрузить данные пользователя.{' '}
            {apiError?.message ? `Ошибка: ${apiError.message}` : 'Пожалуйста, попробуйте еще раз.'}
          </p>
          <Button onClick={onClose} variant="danger" className={styles.closeButton}>
            Закрыть
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          Детали пользователя: {userDetails?.login}
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
            {/* Отображаем имя, если оно есть, иначе логин */}
            <p className={styles.detailItem}>
              <strong>Имя:</strong> {userDetails.name || userDetails.login}
            </p>
            
            {userDetails.bio && (
              <p className={styles.detailItem}>
                <strong>Био:</strong> {userDetails.bio}
              </p>
            )}
            <p className={styles.detailItem}>
              <strong>Публичные репозитории:</strong> {userDetails.public_repos}
            </p>
            <p className={styles.detailItem}>
              <strong>Подписчики:</strong> {userDetails.followers}
            </p>
            <p className={styles.detailItem}>
              <strong>Подписки:</strong> {userDetails.following}
            </p>
            <p className={styles.detailItem}>
              <strong>Профиль GitHub:</strong>{' '}
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
                <strong>Компания:</strong> {userDetails.company}
              </p>
            )}
            {userDetails.location && (
              <p className={styles.detailItem}>
                <strong>Местоположение:</strong> {userDetails.location}
              </p>
            )}
            {userDetails.blog && (
              <p className={styles.detailItem}>
                <strong>Блог:</strong>{' '}
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
              <strong>Присоединился:</strong> {new Date(userDetails.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
        <Button onClick={onClose} variant="secondary" className={styles.closeButton}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};
