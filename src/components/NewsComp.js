import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class NewsComp extends Component {

    static defaultProps={
            country:'in',
            category:'business',
            pageSize: '8'

        }

    static propTypes={
            country: PropTypes.string,
            category: PropTypes.string,
            pageSize: PropTypes.number
        }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,

        }

    }

    async componentDidMount() {
        this.setState({loading: true})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });

    }

    pagePrevious = async () => {
        this.setState({loading: true})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ page: this.state.page - 1, articles: parsedData.articles , loading:false});

    }

    pageNext = async () => {

        if (!((this.state.page + 1) > Math.ceil(this.state.totalResults / this.pageSize))) {

            this.setState({loading: true})
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ page: this.state.page + 1, articles: parsedData.articles , loading:false});

        }
    }

    render() {
        return (

            <div className='container my-4'>
                
                <h1 className='text-center'> NewsMania - {this.props.category}</h1>
                {this.state.loading && <Spinner/>}
                <div className="row" >
                    {!this.state.loading && this.state.articles.map((element) => (

                        <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : "No title given"} desc={element.description ? element.description : "No Description available"} imageUrl={element.urlToImage ? element.urlToImage : "https://images.macrumors.com/t/MfyaJZJZunvOLaOpkgFC_y-sr_k=/2500x/article-new/2021/05/Memorial-Day-Deals-2021-Apple.jpg"} url={element.url} author={element.author} date={element.publishedAt} />
                        </div>

                    ))}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.pagePrevious}>&larr; Previous</button>
                    <button disabled={((this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.pageNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default NewsComp