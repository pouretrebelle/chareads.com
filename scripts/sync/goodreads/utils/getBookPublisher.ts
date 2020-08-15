import { GoodreadsReview, BookIntermediary } from '../types'

const getBookPublisher = (
  review: GoodreadsReview
): BookIntermediary['publisher'] =>
  review.book.publisher
    ? review.book.publisher
        .replace(/^(Bloomsbury).+$/, '$1')
        .replace(/^(Crown).+$/, '$1')
        .replace(/^(Delacorte).+$/, '$1')
        .replace(/^(Dutton).+$/, '$1')
        .replace(/^(Faber).+$/, '$1 & $1')
        .replace(/^(Dutton).+$/, '$1')
        .replace(/^(Harper ?Collins).+$/, '$1')
        .replace(/^(Harper ?Voyager).+$/, '$1')
        .replace(/^(Hodder).+$/, 'Hodder & Stoughton')
        .replace(/^(Macmillan).+$/, '$1')
        .replace(/^(Mulholland Books).+$/, '$1')
        .replace(/^(Pan)$/, 'Pan Macmillan')
        .replace(/^(Penguin)( [bB]ooks)?( UK)?.+$/, 'Penguin')
        .replace(/^Penguin Modern Classics$/, 'Penguin Books')
        .replace(/^(Picador).+$/, '$1')
        .replace(/^(Portfolio).+$/, '$1')
        .replace(/^(Random House).+$/, '$1')
        .replace(/^(Scholastic).+$/, '$1')
        .replace(/^(Vintage)( Books)?( U.K. Random House)?.+$/, 'Vintage')
    : undefined

export default getBookPublisher
