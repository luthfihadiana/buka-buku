import axios from 'axios';
import { Category } from '../Models';
import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        setCategories([...res.data]);
      })
      .catch(error => console.log(error));
  }, [])
  return {
    categories
  }
}

export default useCategories;