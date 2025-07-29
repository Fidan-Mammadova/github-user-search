GitHub Link:
https://github.com/Fidan-Mammadova/github-user-search.git

Vercel Link:
https://github-user-search-kxd5.vercel.app/


I have completed the GitHub user search project. Here's what the application does:

1. Allows searching GitHub users by login using GitHub API.
2. Displays a list of matched users (avatar and login).
3. Clicking on a user reveals detailed info: name, bio, public repos, and GitHub profile link.
4. Search input uses a 500ms debounce to avoid spamming the API.

Stack and implementation details:
- Built with ReactJS and TypeScript. All components are strictly typed.
- API requests are handled with RTK Query.
- Styling is implemented with SCSS Modules (no global CSS).
- Debounce implemented via a custom `useDebounce` hook.
- Loading spinner appears while fetching.
- API errors are handled gracefully with user feedback.
- Unnecessary re-renders are avoided via memoization (`React.memo`, `useCallback`, etc.).

 Bonus:
- Fully responsive design.
- At least one basic unit test included (component rendering test).

 Covered evaluation points:
1. Clean, readable code with proper structure and typings.
2. Solid API handling: RTK Query, caching, loading & error states.
3. UX considerations: error feedback, debounce, animations.
4. Performance: memoization and preventing re-renders.
5. Modular SCSS-based styling.
