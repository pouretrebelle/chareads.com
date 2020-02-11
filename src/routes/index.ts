type PagesType = {
  [key: string]: {
    PATH: string
    VIEW: string
  }
}

const PAGES: PagesType = {
  404: {
    PATH: '/404',
    VIEW: 'NotFoundPage',
  },
  HOME: {
    PATH: '/',
    VIEW: 'HomePage',
  },
  VIDEO: {
    PATH: '/video',
    VIEW: 'VideoPage',
  },
  VIDEOS: {
    PATH: '/videos',
    VIEW: 'VideoListPage',
  },
  BOOK: {
    PATH: '/book',
    VIEW: 'BookPage',
  },
  BOOKS: {
    PATH: '/books',
    VIEW: 'BookListPage',
  },
}

export default PAGES
