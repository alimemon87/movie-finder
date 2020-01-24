import React from 'react';
import Movie from '../../components/Movie/Movie';
import {Alert} from 'react-bootstrap';


const SelectedMovies = (props) => { 
    const { selectedMovies, pageTitle } = props;
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3 className="text-center">  {pageTitle}  </h3>
                    <div className="App">
                        <div className="movies">
                            {
                               (selectedMovies.length > 0) ? (
                                        selectedMovies.map((item, index) => {
                                            return (<Movie 
                                                    key={`${index}-${item.Title}`} 
                                                    movie= {item}
                                                    hideWML = {props.hideWML}
                                                    hideFavourite = {props.hideFavourite}
                                                    checkBoxHandler = {(e) => props.removeWatchMeLater(e, item, index)}
                                                    onFavouriteHandler = {(e, result)=> props.removeFavourite(item, index)}
                                                />)
                                            }
                                        )
                                ): (
                                    <Alert variant={"info"}>
                                        <h6 className='text-center'>Nothing to display.</h6>
                                    </Alert>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>           
            </div>
        </div>
    );
};

export default SelectedMovies;