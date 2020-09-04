export default {
  createObjectFromFields: (formFields) => {
    const genres = ['rock', 'blues', 'metal', 'classicRock', 'country']
    const instruments = ['guitar', 'bass', 'drums', 'vocals', 'keys']

    return Array.from(formFields)
      .filter(el => el.id)
      .reduce((info, el) => {
        // if id is genres OR instruments create an array from them
        if (genres.includes(el.id)) {
          // add to genres array
          info['genres']
            ? info['genres'].concat(el.value)
            : info['genres'] = [el.value]
        } else if (instruments.includes(el.id)) {
          // add to instruments array
          info['instruments']
            ? info['instruments'].concat(el.value)
            : info['instruments'] = [el.value]
        } else {
          // add el.id as key with el.value
          info[el.id] = el.value
        }
        return info
      }, {})
  }
}
