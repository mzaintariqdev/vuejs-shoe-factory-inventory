import { sleep } from '@/utils/helpers';
import { mockShoeArticle } from '@/utils/mocks/mockShoeArticles';

export const addShoeArticleService = async (formData) => {
  await sleep(2000);
  return {
    data: formData,
    error: false,
    status: 200,
  };
};

export const getShoeArticles = async () => {
  await sleep(2000);
  return {
    data: mockShoeArticle,
    error: false,
    status: 200,
  };
};

export const deleteShoeArticleApiService = (id) => ({
  data: { message: 'Shoe Article deleted SuccessFully', id },
  error: false,
  status: 200,
});

export const EditShoeArticleApiService = async (id) => {
  await sleep(2000);
  return {
    data: { message: 'Shoe Article Updated SuccessFully', id },
    error: false,
    status: 200,
  };
};

export const getShoeArticleByIdService = async (id) => {
  await sleep(2000);
  const shoeArticleById = mockShoeArticle.find((ShoeArticle) => ShoeArticle.id === id);

  return {
    data: shoeArticleById,
    error: false,
    status: 200,
  };
};
