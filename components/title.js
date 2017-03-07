import React from 'react'
import {render} from 'react-dom'
import headerImage from '../images/back.png'

let backStyle = {
	backgroundImage: 'url('+headerImage+')',
	backgroundSize: '50%',
	backgroundRepeat: 'no-repeat',
	backgroundPositionY: '10px' 
}


let Title = React.createClass({
	goBack(){
		history.back();
	},
	render(){
		return (
			<div className='title'>
				<div className='back' style={backStyle} onClick={this.goBack}>
					
				</div>
				<h3>客户跟单</h3>
			</div>
		)
	}
})


export default Title;