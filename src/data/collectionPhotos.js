export const COLLECTION_PHOTOS = [
  {
    id: 'collection-photo-1',
    name: 'Padonmar cotton collection photo 1',
    imageUrl: '/images/collection/sample-1.jpg',
    width: 1362,
    height: 2048,
  },
  {
    id: 'collection-photo-2',
    name: 'Padonmar cotton collection photo 2',
    imageUrl: '/images/collection/sample-2.jpg',
    width: 1346,
    height: 2048,
  },
  {
    id: 'collection-photo-3',
    name: 'Padonmar cotton collection photo 3',
    imageUrl: '/images/collection/sample-3.jpg',
    width: 1296,
    height: 2048,
  },
]

export function collectionPhotoFor(index) {
  return COLLECTION_PHOTOS[index % COLLECTION_PHOTOS.length]
}
