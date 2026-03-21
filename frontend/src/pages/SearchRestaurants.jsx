import { useEffect, useState } from "react";
import RestaurantCarousel from "../components/RestaurantCarousel";

export default function SearchRestaurants(){

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRestaurants = async () => {

            try{
                const response = await fetch("api/restaurants/");

                const data = await response.json();

                console.log(data);

                setRestaurants(data);
            }
            catch(error){
                console.error("Error:", error);
            }
            finally{
                setLoading(false);
            }

        };

        fetchRestaurants();

    }, []);

    if(loading){
        return <p>Loading...</p>;
    }

    return(
        <RestaurantCarousel restaurants={restaurants}/>
    );

}