export default {
  createObjectFromFields: (formFields) => Array.from(formFields)
    .filter(el => el.id)
    .reduce((info, el) => {
      info[el.id] = el.value
      return info
    }, {}),
}
