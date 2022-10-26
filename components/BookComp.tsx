import Image from 'next/image'
import classNames from 'classnames';
import {
  BsFillBookmarkStarFill,
} from "react-icons/bs";
import styles from './BookComp.module.css';
import { Book } from '../Models';

type BookcompProps = {
  data: Book;
  isBookmarked?: boolean;
  handleBookmarkAction?: (book: Book) => void;
}

export const BookComp = ({ data, isBookmarked, handleBookmarkAction }: BookcompProps) => {
  return <div className={styles.card} key={data?.id}>
    <Image
      alt={`book-cover-${data?.id}`}
      src={data?.cover_url}
      width={30}
      height={40}
      layout="responsive"
    />
    <span className={styles.bookTitle}>{data?.title}</span>
    <span className={styles.bookAuthor}>
      {data.authors.toString()}
    </span>
    {handleBookmarkAction && <span
      onClick={() => {
        handleBookmarkAction(data)
      }}
      className={classNames(styles.bookmarkContainer, { [styles.bookmarked]: isBookmarked })}>
      <BsFillBookmarkStarFill />
    </span>}
  </div>
}
