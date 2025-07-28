
import React, { useState, useEffect, useCallback } from 'react';
import styles from './HomePage.module.scss';
import { Input } from '../../common/components/Input/Input';
import { UserCard } from '../../common/components/UseCard/UseCard';
import { Loader } from '../../common/components/Loader/Loader';
import { Button } from '../../common/components/Button/Button'; 
import { UserDetailsModal } from '../../common/components/UserDetailsModal/UserDetailsModal';
import { useDebounce } from '../../app/hooks';
import { useSearchUsersQuery} from '../../services/api/githubApi';
import type {  GitHubApiError } from '../../common/types/index';
import type { GitHubUser } from '../../common/types/index';


export const HomePage: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [manualSearchQuery, setManualSearchQuery] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [selectedUserLogin, setSelectedUserLogin] = useState<string | null>(null);

const {
    data: searchResults, 
    isLoading,        
    isFetching,        
    isError,          
    error,             
  } = useSearchUsersQuery(debouncedSearchTerm, {
    skip: debouncedSearchTerm.length === 0, 
    pollingInterval: 0, 
  });

 
  const showLoader = (isLoading || isFetching) && debouncedSearchTerm.length > 0;


  const apiErrorMessage = isError
    ? (error as GitHubApiError)?.message || 'An unknown error occurred during the search.'
    : '';


  const handleUserClick = (user: GitHubUser) => {
    setSelectedUserLogin(user.login);
  };


  const handleCloseModal = () => {
    setSelectedUserLogin(null);
  };


    const handleSearchButtonClick = useCallback(() => {
    setManualSearchQuery(searchTerm); 
  }, [searchTerm]);


  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);


    useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) { 
      setManualSearchQuery('');
    }
  }, [debouncedSearchTerm, searchTerm]);


return (
    <div className={styles.homePage}>
      <div className={styles.searchSection}>
        <div className={styles.searchInputWrapper}>
    
          <Input
            id="search-input"
            type="text"
            placeholder="Search GitHub username..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setManualSearchQuery(''); 
            }}
            label="" 
            className={styles.searchInput}
          />
        </div>
        <Button onClick={handleSearchButtonClick} className={styles.searchButton}>
          Search
        </Button>
      </div>

   
      {showLoader && (
        <div className={styles.statusSection}>
          <Loader />
        </div>
      )}

      {isError && (
        <div className={styles.statusSection}>
          <p className={styles.errorMessage}>
            Error: {apiErrorMessage}. Please try again. 
          </p>
        </div>
      )}

      {!showLoader && !isError && (debouncedSearchTerm.length > 0 || manualSearchQuery.length > 0) && (
        <div className={styles.resultsSection}>
          {searchResults?.items.length === 0 ? (
            <p className={styles.noResults}>No users found.</p> 
          ) : (
            <div className={styles.userGrid}>
              {searchResults?.items.map((user) => (
                <UserCard key={user.id} user={user} onClick={handleUserClick} />
              ))}
            </div>
          )}
        </div>
      )}

      {!showLoader && !isError && debouncedSearchTerm.length === 0 && manualSearchQuery.length === 0 && (
        <div className={styles.initialMessage}>
          <p>Enter a GitHub username to search.</p> 
        </div>
      )}

      {selectedUserLogin && (
        <UserDetailsModal
          username={selectedUserLogin}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
