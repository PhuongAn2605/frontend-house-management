export const editComment = (targetComments, commentToEdit) => {
    const existingComment = targetComments.find(c => c._id === commentToEdit._id);
    const index = targetComments.indexOf(existingComment);

    return [
        ...targetComments.slice(0, index),
        {
            ...commentToEdit,
        },
        ...targetComments.slice(index + 1)
    ]

}

export const deleteComment = (targetComments, id) => {
    return targetComments.filter(c => c._id !== id);
}