import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, toggleFavorite, selectProduct } from '../Slices/products'
import axios from 'axios';
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products.filteredProducts)
    const favorites = useSelector(state => state.products.favorites);
    const [limit , setLimit] = useState(10);
    const navi = useNavigate();


    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
                console.log("Fetching Data...")
                const data = await response.data.products;
                dispatch(addProducts(data));
                console.log(data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        getData();
    }, [limit]);

    const handleFetchMore = () => {
        if ((window.innerHeight + document.documentElement.scrollTop + 100) >= (document.documentElement.scrollHeight - 1)) {
            setLimit(limit+ 10);
        }
    };

    useEffect(()=>{
        window.addEventListener("scroll",handleFetchMore);

        return () => {
            window.removeEventListener('scroll', handleFetchMore);
        };
    },[handleFetchMore])


    const handleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };


    const goToProduct = (obj) =>{
        navi(`/products/${encodeURIComponent(obj.title)}`);
        dispatch(selectProduct(obj));
    }

    const renderRatingStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`h-5 w-5 ${index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400 fill-slate-400'}`}
            />
        ));
    };


    return (
        <div className='w-full h-fit flex flex-row items-start justify-around flex-wrap gap-5 bg-[#f5f4f2] p-[2%] px-[5%] max-[650px]:px-[2%]:'>
            {allProducts ? allProducts.map((obj, indx) => (
                <div className="card bg-base-100 w-96 shadow-xl" key={obj.id}>
                    <figure>
                        <img
                            src={obj.thumbnail}
                            alt="Shoes" className='bg-cover cursor-pointer' />
                    </figure>
                    <div className="card-body bg-gray-100 rounded-xl group">
                        <h2 className="card-title cursor-pointer flex flex-row items-center justify-between hover:text-blue-600" onClick={()=>{goToProduct(obj)}}>
                            {obj.title}
                            <div className="badge badge-secondary w-[25%] text-xs">{obj.discountPercentage} %off</div>
                        </h2>
                        <p>{obj.description}</p>
                        <div className="flex items-center mb-4 justify-between">
                            <div className='flex flex-row'>{renderRatingStars(obj.rating)}
                            <span className="ml-1 text-gray-600">({obj.rating.toFixed(2)})</span></div>
                            <Heart onClick={()=>{handleFavorite(obj.id)}} className={`cursor-pointer ${favorites.includes(obj.id) ? 'text-red-600 fill-red-600' : 'text-black fill-white'}`}/>
                        </div>
                        <p className={`text-base font-semibold w-fit px-2 rounded-lg ${obj.availabilityStatus === 'In Stock' ? 'bg-green-400' : 'bg-red-400'}`}>{obj.availabilityStatus}</p>
                        <p className='text-4xl font-bold flex flex-row items-start'> <span className='text-xl'>₹</span> {obj.price}</p>
                        <div className="card-actions justify-between items-center">
                            <button className="bg-blue-400 p-2 rounded-xl font-bold" onClick={()=>goToProduct(obj)}>Buy Now</button>
                            <div className='flex flex-row flex-wrap'>
                                {obj.tags.map((tag) => (
                                    <div className="badge badge-outline bg-gray-800 text-slate-100 p-3">{tag}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )) :
            <div className="flex w-52 flex-col gap-4 h-fit">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
            }
        </div>
    )
}

export default HomePage