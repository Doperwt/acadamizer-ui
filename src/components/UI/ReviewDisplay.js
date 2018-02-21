import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ReviewDisplay extends PureComponent {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.string)
  }

  percentageDisplay(review,total){
    if(review===0){return '0%'}
    return Math.floor((review/total)*100).toString()+'%'
  }

  render(){
    const reviews = this.props.reviews
    const negative = reviews.filter(a => a === 'negative').length
    const neutral = reviews.filter(a => a === 'neutral').length
    const positive = reviews.filter(a => a === 'positive').length

    var green = this.percentageDisplay(positive,reviews.length)
    var yellow = this.percentageDisplay(neutral,reviews.length)
    var red =  this.percentageDisplay(negative,reviews.length)

    return(
      <div style={{ minWidth:"80%", minHeight:'30px'}}>
        <div style={{backgroundColor:'green', minWidth:green, minHeight:'30px', float:'left'}} ></div>
        <div style={{backgroundColor:'yellow', minWidth:yellow, minHeight:'30px', float:'left'}}></div>
        <div style={{backgroundColor:'red',minWidth:red, minHeight:'30px', float:'left'}}></div>
      </div>
    )
  }
}

export default ReviewDisplay
// ,display:'flex',flexDirection:'column',flexWrap: 'wrap',justifyContent:'center'
