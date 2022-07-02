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

type UseInfo = {
  use: string;
  name: string;
  email: string;
};

type WordInfo = {
  word: object;
  meaning: string;
  slug: string;
  isEditing: boolean
};

type RemoveWordInfo = {
  word: {
    word: string;
    meaning: string;
    slug: string;
    isEditing: boolean
  };
};

type ChangeWordInfo = {
  wordInfo: {
    word: string;
    meaning: string;
  };
  wordNum: number
};

type ChangeSetWordInfo = {
  word:string;
  meaning: string;
}
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
