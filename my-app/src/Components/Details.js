import React from 'react';
import Modal from 'react-modal';
import querystring from 'query-string';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown'
    },
};
class Details extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
          ticker:{},
          books:undefined
        }
    }
    GetBook= () => {
        const { books } = this.state;
        axios({
            method: 'GET',
            url: `http://localhost:2963/book/${books}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ books: response.data.bName })
            })
            .catch(err => console.log(err));
    }
    render(){
        return(
            
            <div className="PriceModel" >
                sdfa
            </div>

         );
    }
    
}

export default Details;
