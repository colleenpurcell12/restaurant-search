import React from 'react'
import starEmpty from '../../public/resources/graphics/star-empty.png'
import starFull from '../../public/resources/graphics/stars-plain.png'

export const ZeroStars = (
                    <div className="ratings">
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                    </div>
                    );
export const OneStar = ( 
                    <div className="ratings">
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                    </div>
                    );
export const TwoStars = (
                    <div className="ratings">
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                    </div>
                    );
export const ThreeStars = (
                    <div className="ratings">
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                    </div>
                    );
export const FourStars = (
                    <div className="ratings">
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starFull} alt="orange star"/>
                        <img className='stars' src={starEmpty} alt="greyed out star"/>
                    </div>
                    );
export const FiveStars = (
		            <div className="ratings">
		                <img className='stars' src={starFull} alt="abc"/>
		                <img className='stars' src={starFull} alt="abc"/>
		                <img className='stars' src={starFull} alt="abc"/>
		                <img className='stars' src={starFull} alt="abc"/>
		                <img className='stars' src={starFull} alt="abc"/>
		            </div>
    				);