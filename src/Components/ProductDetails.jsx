import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectProduct } from '../Slices/products'
import { Star , ShoppingCart , TruckIcon , RefreshCw ,Package , Scale , Ruler , Heart} from 'lucide-react'



function ProductDetails() {
    const dispatch = useDispatch()
    const product = useSelector(state=>state.products.selectedProduct);
    const favorites = useSelector(state => state.products.favorites);

    const handleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };

    console.log(product)
    return (
        <div className='relative w-full h-fit'>
            <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={product.thumbnail} alt={product.title} className="w-full bg-contain h-auto object-cover rounded-lg shadow-md" />
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-blue-600 hover:underline cursor-pointer">
              {product.reviews.length} ratings
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {/* <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span> */}
            <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
            <span className="ml-2 text-green-600">({product.discountPercentage.toFixed(2)}% off)</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-4 text-red-600 font-semibold">{product.availabilityStatus}</div>

          {/* Add to Cart Button */}
          <button className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full mb-4">
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>

          {/* Buy Now Button */}
          <button className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full mb-6">
            Buy Now
          </button>

          {/* Additional Info */}
          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <TruckIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span>{product.shippingInformation}</span>
            </div>
            <div className="flex items-center mb-2">
              <RefreshCw className="w-5 h-5 mr-2 text-gray-600" />
              <span>{product.returnPolicy}</span>
            </div>
            <div className="flex items-center mb-2">
              <Package className="w-5 h-5 mr-2 text-gray-600" />
              <span>SKU: {product.sku}</span>
            </div>
            <div className="flex items-center mb-2">
              <Scale className="w-5 h-5 mr-2 text-gray-600" />
              <span>Weight: {product.weight} oz</span>
            </div>
            <div className="flex items-center mb-2">
              <Ruler className="w-5 h-5 mr-2 text-gray-600" />
              <span>Dimensions: {product.dimensions.width}" x {product.dimensions.height}" x {product.dimensions.depth}"</span>
            </div>
            <div className="flex items-center">
              <Heart className={`cursor-pointer ${favorites.includes(product.id) ? 'text-red-600 fill-red-600' : 'text-black fill-white'}`} onClick={()=>{handleFavorite(product.id)}}  />
              <span>{favorites.includes(product.id) ? 'Added to Wishlist' : 'Add To WishList'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 font-semibold">{review.reviewerName}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
    )
}

export default ProductDetails