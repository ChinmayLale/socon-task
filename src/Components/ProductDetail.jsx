import React from 'react';
import { Star, ShoppingCart, Truck, RotateCcw, AlertTriangle } from 'lucide-react';

function ProductDetail  ({ data })  {


  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src={data.thumbnail} alt={data.title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-600 mb-4">{data.description}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">${data.price.toFixed(2)}</span>
            {data.discountPercentage > 0 && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                {data.discountPercentage}% OFF
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-4">
            {renderRatingStars(data.rating)}
            <span className="ml-2 text-gray-600">({data.rating.toFixed(2)})</span>
          </div>
          
          <div className="mb-4">
            <span className="font-semibold">Availability: </span>
            <span className={`${data.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
              {data.availabilityStatus}
            </span>
          </div>
          
          <div className="mb-4">
            <span className="font-semibold">Brand: </span>
            <span>{data.brand}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-semibold">SKU: </span>
            <span>{data.sku}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center">
              <ShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <Truck className="mr-2 text-gray-600" />
              <span>{data.shippingInformation}</span>
            </div>
            <div className="flex items-center mb-2">
              <RotateCcw className="mr-2 text-gray-600" />
              <span>{data.returnPolicy}</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="mr-2 text-gray-600" />
              <span>{data.warrantyInformation}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Specifications</h3>
            <ul className="list-disc list-inside">
              <li>Weight: {data.weight} oz</li>
              <li>Dimensions: {data.dimensions.width}" x {data.dimensions.height}" x {data.dimensions.depth}"</li>
              <li>Minimum Order: {data.minimumOrderQuantity} units</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap">
              {data.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Meta Information</h3>
            <p>Created: {new Date(data.meta.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(data.meta.updatedAt).toLocaleDateString()}</p>
            <p>Barcode: {data.meta.barcode}</p>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {data.reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 py-4 last:border-b-0">
            <div className="flex items-center mb-2">
              {renderRatingStars(review.rating)}
              <span className="ml-2 font-semibold">{review.reviewerName}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;