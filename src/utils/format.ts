const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-GT', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(date))
}

export default formatDate