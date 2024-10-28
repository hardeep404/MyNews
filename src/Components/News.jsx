import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import news from "../SimpleRes";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import conf from "../../conf";

export default class News extends Component {
  // headlines = news.articles;
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLat = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLat(
      this.props.category
    )} - My News`;
  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${conf.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });

    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${conf.apiKey}&page=${
      this.state.page + 1
    }&&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: [...this.state.articles, ...parsedData.articles],
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          News - Top {this.capitalizeFirstLat(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container bg-body-tertiary">
            <div className="row">
              {this.state.articles.map((ele, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={ele.title ? ele.title.slice(0, 45) : ""}
                      description={
                        ele.description
                          ? ele.description.slice(0, 80)
                          : "My description"
                      }
                      imageUrl={
                        ele.urlToImage
                          ? ele.urlToImage
                          : "https://img.freepik.com/free-vector/breaking-news-live-streaming-concept_23-2148500721.jpg"
                      }
                      newsUrl={ele.url}
                      author={ele.author ? ele.author : "unknown"}
                      date={ele.publishedAt}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
