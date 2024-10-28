import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    // let PublicDate= date;
    let getGmt = new Date(date);
    let finDate = getGmt.toDateString();

    return (
      <div className="my-3">
        <div className="card">
          <img
            src={imageUrl}
            className="card-img-top"
            alt="news image"
            style={{ height: "11rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {finDate}
              </small>
            </p>
            <span
              className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
              style={{ left: "80%" }}
            >
              {source}
            </span>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>  
          </div>
        </div>
      </div>
    );
  }
}
