import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, url, author, date } = this.props;
        return (
            <div className='container my-4 border-3' >
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small>
                            
                            </p>
                        <h5 className="card-title">{title}</h5>
                        
                        <p className="card-text">{desc}</p>
                        <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem