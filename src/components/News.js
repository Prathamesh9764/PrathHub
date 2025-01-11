import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
    };

    const category = this.props.category || "Default Category";
    document.title = `${this.capitalizeFirstLetter(category)} - PrathHub`;
}


    async updateNews() {
        this.props.setProgress(10);
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cbe90c3c37f4f73afae42fc3d6591c2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let passedData = await data.json();
        this.props.setProgress(70);
        console.log(passedData);

        this.setState({
            articles: passedData.articles,
            totalResults: passedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=7cbe90c3c37f4f73afae42fc3d6591c2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let passedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(passedData.articles),
            totalResults: passedData.totalResults
        });
        
};

render() {
    return (
        <>
            <h1 className='text-center' style={{ margin: '30px 0px', marginTop: '80px' }}>PrathHub - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {this.state.articles && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} image={element.urlToImage}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
                    </div> */}
        </>
    )
}
}

export default News
