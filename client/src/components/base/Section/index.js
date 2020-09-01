import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Section = ({ section: { button, heading, images, list, listClass, listItemClass, text, title } }) => {

  const renderList = () => {
    return list.map((li, i) => {
      return (
        listClass === 'use-list'
          ? <li className={listItemClass} key={i}>
            <p>{li.text}</p>
            {li.image ? <img
              className={li.image.className}
              src={li.image.src}
              alt={li.image.alt}
            /> : null}
          </li>
          : <li className={listItemClass} key={i}>
            {li.image ? <img
              className={li.image.className}
              src={li.image.src}
              alt={li.image.alt}
            /> : null}
            {li.text}
          </li>
      )
    })
  }

  const renderTexts = () => {
    return text.map((txt, i) => {
      return (
        i === text.length - 1
          ? <Fragment key={i}>
            <p className="section-text"><strong>{txt}</strong></p>
            <br />
          </Fragment>
          : <Fragment key={i}>
            <p className="section-text">{txt}</p>
            <br />
          </Fragment>
      )
    })
  }

  return (
    <section className={`section ${title ? 'section--' + title : null}`}>
      {heading ? <h3 className="section-heading">{heading}</h3> : null}
      {list ? <ul className={`list section-text ${listClass}`}>{renderList()}</ul> : null}
      {text ? renderTexts() : null}
      {images ? <img alt={images.alt} className={images.className} src={images.src} /> : null}
      {button ? button : null}
    </section>
  )
}

Section.propTypes = {
  section: PropTypes.object
}
