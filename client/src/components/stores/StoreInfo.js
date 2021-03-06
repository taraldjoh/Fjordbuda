import { Helmet } from 'react-helmet'
import React, { Component } from 'react';
import { Phone, Map, Mail, CheckCircle } from 'react-feather';
import StoreMap from './StoreMap';
import { getStores } from '../../globals/stores';
import { renderStoreTitle } from '../../globals/renderTitle';
import Fade from 'react-reveal/Fade';

export default class StoreInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        getStores().sort().map(store => {
            if (renderStoreTitle() === store.name) {
                this.setState({
                    name: store.name,
                    mail: store.mail,
                    adress: store.adress,
                    zip: store.zip,
                    coordinates: store.coordinates,
                    tlf: store.tlf,
                    openingHours: store.openingHours,
                    brands: store.brands
                });
            }
        });
    }

    componentDidMount() {
        document.querySelector('#hero > h5').innerHTML = `${this.state.adress} ${this.state.zip}`;
    }

    renderOpeningHours() {
        return Object.keys(this.state.openingHours).map(key => 
            <li key={key}>{key.toUpperCase()} <span>{`${this.state.openingHours[key]}`}</span></li>
        )
    }

    renderGotBrands() {
        return Object.keys(this.state.brands).map(key =>
            <li key={key}><CheckCircle size={22} className={`mr-3 ${this.state.brands[key]}`} /> <span><a className="productItem">{key.split('_').join(' ')}</a></span></li>
        )
    }

    brandUrl(brand) {
        if (brand === 'norrøna') {
            return 'norrona';
        }

        return brand.toLowerCase().split('_').join('-');
    }

    render() {
        return (
            <div id='storeInfo'>
                <Helmet>
                    <title>Fjordbuda - Butikk</title>
                    <meta name="description" content={`Shop for norske klær og suvenirer hos oss.`} />
                </Helmet>
                <div className='container'>
                    <div className='row'>
                        <div className='col s4'>
                            <Fade>
                                <h2>ADRESSE</h2>
                                <ul>
                                    <li>{this.state.adress}<br />{this.state.zip}</li>
                                    <li><Phone size={20} className='mr-3'/> <a href='tel:+4770117300'> {this.state.tlf}</a></li>
                                    <li><Mail size={20} className='mr-3'/><a href='mailto:'> {this.state.mail}</a></li>
                                </ul>
                            </Fade>
                        </div>
                        <div className='col s4'>
                            <Fade>
                                <h2>ÅPNINGSTIDER</h2>
                                <ul id='openingHours'>
                                    {this.renderOpeningHours()}
                                </ul>
                            </Fade>
                        </div>
                        <div className='col s4'>
                            <Fade>
                            <h2>MERKEVARER</h2>
                                <ul id='gotBrands'>
                                    {this.renderGotBrands()}
                                    <li>... og mer</li>
                                </ul>
                            </Fade>
                        </div>
                    </div>
                </div>
                <StoreMap coords={this.state.coordinates} all={false} />
            </div>
        )
    }
}
