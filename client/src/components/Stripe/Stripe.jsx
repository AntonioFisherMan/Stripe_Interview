import React  from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Preloader from '../common/Preloader'
import '../Pages/FrontPage.css'
import appImg from '../../assets/app.png'



const Stripe = (props) => {

    const makePayment = (token) => {
        props.MakePayment(token)
    }

    return (
        <>
            {!props.products ? <Preloader /> :
                <div>
                    {props.products.map(product => <div className="goodsItem" key={product._id}>
                        <img src={product.img} alt="" />
                        <h4 className="goodsItemPrice">{product.text}</h4>
                        <StripeCheckout name="Checkout form"  image={appImg} amount={product.price*100} token={makePayment}  stripeKey="pk_test_51GsYDlJe5WB3tLqfR7rSA1Iun06rsaM8uwYLWxgTsgPzz1zIxxONPXKjDHuGIzyc38jyN37ViRr02OrfSKkFjzmX00XciwJEoN">
                            <button className="btn btn-primary" >Buy for {product.price} $</button>
                        </StripeCheckout>
                    </div>)}

                </div>
            }
        </>
    )

}


export default Stripe