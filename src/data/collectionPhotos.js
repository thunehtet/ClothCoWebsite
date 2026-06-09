export const COLLECTION_PHOTOS = [
  {
    id: 'collection-photo-1',
    name: 'Padonmar cotton collection photo 1',
    imageUrl: '/images/collection/sample-1.jpg',
  },
  {
    id: 'collection-photo-2',
    name: 'Padonmar cotton collection photo 2',
    imageUrl: '/images/collection/sample-2.jpg',
  },
  {
    id: 'collection-photo-3',
    name: 'Padonmar cotton collection photo 3',
    imageUrl: '/images/collection/sample-3.jpg',
  },
]

export function collectionPhotoFor(index) {
  return COLLECTION_PHOTOS[index % COLLECTION_PHOTOS.length]
}
