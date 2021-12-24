import React, { Component } from 'react'
import Card from './Card';
import './Card.css'
import axios from "axios";
const API_BASE_URL= "https://deckofcardsapi.com/api/deck/";


class Deck extends Component {
    constructor(props){
        super(props);
        this.state={
            deck: null,
            cards: [] 
        };
        this.handleChange=this.handleChange.bind(this);
        this.drawCard=this.drawCard.bind(this);
    }
    
    async componentDidMount() {
       let deck= await axios.get(`${API_BASE_URL}new/shuffle/`);
       //console.log(deck);
       this.setState({deck: deck.data})
       
    }

   async drawCard() {
     let id=this.state.deck.deck_id;
     try{
        let cardUrl= await axios.get(`${API_BASE_URL}${id}/draw/`);
        let cardRes= cardUrl.data.cards[0];
        if(!cardUrl.data.success) {
            throw new Error("No card remaining!!");
        }
         //console.log(cardRes)
     this.setState(st => ({
        cards: [
            ...st.cards,
            {
                id: cardRes.code,
                image: cardRes.image,
                name: `${cardRes.value} of ${cardRes.suit}`
            }
        ]
    }));
     }
     catch(err) {
         alert(err);
     }
    }

    handleChange() {
        this.drawCard();
    };


    render() {
        let cardsRend=this.state.cards.map(c => (
            <Card name={c.name} image={c.image} key={c.id} />
        ))
        return (
            <div>
                <h1 className="Deck-title">💎Card Dealer💎</h1>

                <h2 className="Deck-title subtitle">💎A small project with React!💎</h2>
                
                <button className="Deck-btn" onClick={this.handleChange} >Draw A Card!</button>
                <div className="Card-area">
                {cardsRend}
                </div>
                
                
            </div>
        )
    }
}

export default Deck;