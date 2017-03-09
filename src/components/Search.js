import React, { Component } from 'react'; 
import { ZeroStars, OneStar, TwoStars, ThreeStars, FourStars, FiveStars  } from './Stars';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const apiKey = '75c1dd27cdb88c9dc3547cf214cb7aca'
const applicationID = '2SB5FLKWK3'
let client = algoliasearch(applicationID, apiKey);
const indexName = 'restaurants_complete' 

let helper = algoliasearchHelper(client, indexName, {
  facets: ['payment_options','food_type'] 
});    

export default class Search extends Component {
    constructor() {
        super();
        this.state = {  hits: [], numOfHits: 0, numResultsToShow: 4,
                        nameTerm: '', cuisineTerm: '', restaurants: [], geoPosition: []
                    } 
        this.handleInputChange  = this.handleInputChange.bind(this);
        this.handleClickCuisine = this.handleClickCuisine.bind(this);
        this.handleClickPayment = this.handleClickPayment.bind(this);
        this.handleToggleMore   = this.handleToggleMore.bind(this);
        this.handleClickRatings = this.handleClickRatings.bind(this);
    }

    componentDidMount () {
        // ** get user location
         navigator.geolocation.getCurrentPosition((position) => {
            let {latitude, longitude} = position.coords
            this.setState({ geoPosition: [latitude, longitude]})
            helper.setQueryParameter('aroundLatLng', `${latitude}, ${longitude}`)
        });        
        if(this.state.geoPosition.length===0){
            helper.setQueryParameter('aroundLatLng','37.786919, -122.397722') // ** Algolia SF office in SOMA
        }

        helper.on('result', (content) => {
            this.setState({ hits: content.hits })
            var count = this.state.restaurants.length
            if(count===0 || this.state.nameTerm===''){count=content.hits.length}
            this.setState({numOfHits: count })
        });
        helper.search();
    }
    handleInputChange(e){ // ** query by keyword as you type
        let { nameTerm } = this.state;

        nameTerm = e.target.value.toLowerCase();
        nameTerm==='' ?  this.setState({ numOfHits: this.state.hits.length}) :        
        helper.setQuery(nameTerm).search();
        this.setState({  nameTerm: nameTerm, cuisineTerm: '' }) 
    }
    handleClickCuisine(e){
        let selectedCuisine = e.target.id
        // ** the single search parameter will be the choosen cuisine
        if(this.state.nameTerm===''){ 
            helper.setQuery(selectedCuisine).search();
        }
        // ** filters the hits based on the input box term, by the choosen cuisine type
        else{
            let filteredHits=[]
            this.state.hits.forEach(function(rest){ if(rest.food_type===selectedCuisine){ filteredHits.push(rest) } })
            this.setState({ restaurants:  filteredHits,  numOfHits:  filteredHits.length, 
                            cuisineTerm:  selectedCuisine  });
        }   
    }
    handleClickRatings(e) {
        let filteredHits=[]
        // ** when the star icons are clicked, have to find the id in the parent div
        let rating = e.target.parentElement.id; 
        this.state.hits.forEach(function(rest) {
            if(rest.stars_count >rating) {
                filteredHits.push(rest)
            }
        })
        this.setState({ hits: filteredHits, restaurants: filteredHits, numOfHits: filteredHits.length });
    }
    handleClickPayment(e) {
        let { nameTerm, cuisineTerm, hits, restaurants } = this.state;
        let filteredHits=[]
        let list = [];
        (cuisineTerm==='' && nameTerm!=='') ? (list=hits) : 
        (cuisineTerm==='' && nameTerm==='') ? (list=hits) : (list=restaurants);
        list.forEach(function(rest) {
            if(rest.payment_options.includes(e.target.id)) {
                filteredHits.push(rest)
            }
        })
        this.setState({ restaurants: filteredHits, numOfHits: filteredHits.length });
    }
    
    handleToggleMore(e){
        if(this.state.numResultsToShow===4) this.setState({ numResultsToShow: 8 });
        else { this.setState({ numResultsToShow: 4 }); }
    }
    render() {  
        let { hits, numResultsToShow, numOfHits,  restaurants, cuisineTerm, nameTerm } = this.state;
       
        if(cuisineTerm===''){restaurants = hits }
        // ** else restaurants have already been saved as a filtered subset of the hits

        // ** to clip the names of restaurants with long names
        restaurants = restaurants.slice(0,numResultsToShow).map( function(item){
            item.name = item.name.split('-')[0]
            item.name = item.name.split(' at ')[0]
            return item
         })

        // ** prepare the cuisine types count per set of results, to be displayed in the sidebar
        let cuisineTypes = { Italian: 0, American: 0, Californian: 0, 
                            French:0, Seafood:0, Japanese: 0, Indian: 0 }
        hits.forEach(function(item){
            if(Object.keys(cuisineTypes).includes(item.food_type)){
                cuisineTypes[item.food_type]+=1
            } 
        })
        // ** transform the cusine type counts obj -> arr, to map over it
        let cuisineTypesArr = []
        for(var key in cuisineTypes) {
            if(cuisineTypes.hasOwnProperty(key)){
                cuisineTypesArr.push([key,cuisineTypes[key]])
            }
        }

        return (
            <div>

                <div className="search_container">
                     <input ref="userInput"
                        type='text'
                        value={nameTerm}
                        placeholder="Search for Restaurants by Name, Cuisine, Location"
                        onChange={this.handleInputChange}
                        className="search_bar" 
                         />
                </div>

                <div className="main-content">
                    <div className="sidebar lower-content-area">
                    <div className="sidebar_cuisine"> 
                        <div>Cuisine/Food Type</div>
                        <table className="cuisine_table">
                            <tbody>
                                {cuisineTypesArr.map( (cuisine, idx) => { return (
                                    <tr key={idx} className="cuisine_item" onClick={this.handleClickCuisine}>
                                        <td className="cuisine_type" id={cuisine[0]}>{cuisine[0]}</td>
                                        <td className="cuisine_count" id={cuisine[0]} >{cuisine[1]}</td> 
                                    </tr>
                                )} ) }
                            </tbody>
                        </table>
                    </div>

                    <div className="sidebar_ratings">
                        <div> Rating</div>
                        <div className="star_rows">
                            <div className="star_row" onClick={this.handleClickRatings}> {ZeroStars} </div>
                            <div className="star_row" onClick={this.handleClickRatings}> {OneStar}   </div>
                            <div className="star_row" onClick={this.handleClickRatings}> {TwoStars}  </div>
                            <div className="star_row" onClick={this.handleClickRatings}> {ThreeStars}</div>
                            <div className="star_row" onClick={this.handleClickRatings}> {FourStars} </div>
                            <div className="star_row" onClick={this.handleClickRatings}> {FiveStars} </div> 
                            
                        </div>
                    </div>

                    <div className="sidebar_payment">
                        <div> Payment Options</div>

                        <div className="payment_list">
                            <div className="payment_item" onClick={this.handleClickPayment}>
                                <p className="payment_name"  id='MasterCard'> MasterCard </p> 
                            </div>
                            <div className="payment_item" onClick={this.handleClickPayment}>
                                <p className="payment_name"  id='Visa'> Visa </p> 
                            </div>
                            <div className="payment_item" onClick={this.handleClickPayment}>
                                <p className="payment_name"  id='AMEX'> AMEX </p> 
                            </div>
                            <div className="payment_item" onClick={this.handleClickPayment} >
                                <p className="payment_name" id='Discover'> Discover </p> 
                            </div>
                        </div>

                    </div>
                </div>
                    <div className="results lower-content-area">
                        <div className="restaurant_list">
                            <div className="results_metrics">
                                <div className="results_count">{numOfHits} results found </div>
                                <div className="results_speed">in .0002 seconds 
                                    <p className="results_line">___________________________________________________</p>
                                </div>
                            </div>
                            { (restaurants.length>0)? 
                            <div >
                            { restaurants.map(rest => {
                                return (
                                    <div key={rest.objectID} className="restaurant_item">
                                        <img className='restaurant_image' src={rest.image_url} alt={`${rest.name} icon`}/>
                                        <div className='restaurant_description'>
                                            <div className='restaurant_name'>
                                                {rest.name}
                                            </div>
                                            <div className="restaurant_stats_top_row"> 
                                                <div className="star_count">
                                                    {rest.stars_count}
                                                </div>
                                                <div className="star_rating">
                                                    {(  (rest.stars_count>4.5)? <div>{FiveStars}    </div> : 
                                                        (rest.stars_count>3.5)? <div>{FourStars}    </div> : 
                                                        (rest.stars_count>2.5)? <div>{ThreeStars}   </div> : 
                                                        (rest.stars_count>1.5)? <div>{TwoStars}     </div> : 
                                                        (rest.stars_count> .5)? <div>{OneStar}      </div> : 
                                                                                <div>{ZeroStars}    </div>
                                                    )}
                                                </div>
                                                ({rest.reviews_count} reviews) 
                                                <div className="restaurant_stats_last_row"> 
                                                    {rest.food_type} | { 
                                                        (rest.neighborhood).split('/').length>1 ?  
                                                        (rest.neighborhood).split('/')[0] :
                                                         rest.neighborhood
                                                    } | {rest.price_range}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                              })
                            } 
                            
                            {
                                (numResultsToShow===4)? 
                                <div className='restaurant_button'>
                                    <p className="restaurants_show_more" onClick={this.handleToggleMore}>
                                        Show More
                                    </p>
                                </div>
                                :
                                <div className='restaurant_button'>
                                    <p className="restaurants_show_more" onClick={this.handleToggleMore}>
                                        Show Less
                                    </p>
                                </div>
                            }
                            
                            </div>
                            :  
                            <div>Loading...</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};