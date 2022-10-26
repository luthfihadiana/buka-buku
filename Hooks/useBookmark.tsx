import { useState, useEffect } from 'react';
import { Book } from '../Models';

const useBookmark = () => {
  const [bookmark, setBookmark] = useState<Book[]>([]);
  useEffect(() => {
    const bookmarkData = localStorage.getItem('bookmark');
    if (!bookmarkData) localStorage.setItem('bookmark', JSON.stringify([]));
    setBookmark(JSON.parse(bookmarkData || '[]'));
  }, []);

  const isBookmarked = (book: Book) => {
    let isBookmark = false;
    let i = 0;
    while (i < bookmark.length && !isBookmark) {
      isBookmark = book.id === bookmark[i].id;
      i++;
    }
    return isBookmark;
  }

  const setBookmarked = (book: Book) => {
    setBookmark(prev => {
      const newBookmark = !prev ? [book] : [...prev, book];
      localStorage.setItem('bookmark', JSON.stringify(newBookmark))
      return newBookmark;
    })
  }

  const removeBoomarked = (book: Book) => {
    setBookmark(prev => {
      const newBookmark = [...prev];
      const selectedIndex = newBookmark.findIndex(el => el.id === book.id);
      newBookmark.splice(selectedIndex, 1);
      localStorage.setItem('bookmark', JSON.stringify(newBookmark))
      return newBookmark;
    })
  }

  const toggleBookmark = (book: Book) => {
    if (isBookmarked(book)) {
      removeBoomarked(book);
    } else {
      setBookmarked(book);
    }
  }

  return {
    bookmark,
    isBookmarked,
    setBookmarked,
    removeBoomarked,
    toggleBookmark
  }
}

export default useBookmark;