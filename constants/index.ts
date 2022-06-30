type LoginInfo = {
  email: string;
  password: string;
};

type ArticleInfo = {
  source: string;
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
  url: string;
  urlToImage: string;
};

type WordInfo = {
  word: object;
  meaning: string;
  slug: string;
  isEditing: boolean
};

type UseInfo = {
  use: string;
  name: string;
  email: string;
};

type RemoveWordInfo = {
  word: {
    word: string;
    meaning: string;
    slug: string;
    isEditing: boolean
  };
};

type Headlines = {
  headlines: {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    slug: string;
    source: string;
    title: string;
    url: string;
    urlToImage: string;
  }
};
