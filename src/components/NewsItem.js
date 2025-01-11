import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, image, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={
            {
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 0,
            }
            } >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        <img src={!image ? "https://callsmaster.com/wp-content/themes/seolounge/images/no-image/No-Image-Found-400x264.png" : image} className="card-img-top" alt="Not Available" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel='noreferrer' target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
      </div >
    )
  }
}

export default NewsItem
