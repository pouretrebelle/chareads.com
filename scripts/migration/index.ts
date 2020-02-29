import videoTemplate from './templates/video'
import { VideoIntermediary } from './youtube/types'
import { structuredYoutubeData } from './videos'
import bookTemplate from './templates/book'
import { BookIntermediary } from './goodreads/types'
import { structuredGoodreadsData } from './books'
import { downloadFile, writeFile } from './writeFile'
import { downloadBookCover } from './goodreads/getCovers'

structuredYoutubeData.forEach((video: VideoIntermediary): void => {
  const folder = `content/videos/migrated/${video.folder}`

  writeFile(folder, 'index.yml', videoTemplate(video))

  downloadFile(
    `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    folder,
    'cover.jpg'
  )
})

structuredGoodreadsData.forEach(async (book: BookIntermediary) => {
  const folder = `content/books/migrated/${book.folder}`

  writeFile(folder, 'index.md', bookTemplate(book))

  await downloadBookCover(book, folder, 'cover.jpg')
})
