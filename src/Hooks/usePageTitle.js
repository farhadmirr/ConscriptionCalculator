import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title; // Update the document title
  }, [title]); // Re-run this effect only when the title changes
};

export default usePageTitle;