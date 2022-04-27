export const initialStates = {
    imageText: '',
    selectedImage: [],
    imageArray: [],
    renderParent : false
}

export const initalActionStates = {
    sortingOptions: [
        { name: 'Date' },
        { name: 'Description' },
    ],
    selectedSortType: { name: 'Date' },
    openModal: false
}

export const initialModalStates = {
    addImageText: '',
    imageArray: []
}