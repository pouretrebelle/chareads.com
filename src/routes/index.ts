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
  ABOUT: {
    PATH: '/about',
    VIEW: 'AboutPage',
  },
  VIDEO: {
    PATH: '/videos',
    VIEW: 'VideoPage',
  },
  VIDEOS: {
    PATH: '/videos',
    VIEW: 'VideoListPage',
  },
  BOOK: {
    PATH: '/books',
    VIEW: 'BookPage',
  },
  BOOKS: {
    PATH: '/books',
    VIEW: 'BookListPage',
  },
}

export default PAGES
