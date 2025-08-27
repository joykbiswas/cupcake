import { useLoaderData } from "react-router-dom";


const AllItems = () => {
    const cakes = useLoaderData();
    console.log(cakes);
    return (
        <div>
            <h2>All products :{cakes.length}</h2>
        </div>
    );
};

export default AllItems;