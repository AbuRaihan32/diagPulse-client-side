import { useParams } from "react-router-dom";

const Details = () => {
    const {id} = useParams();
    return (
        <div>
            this Is details page id {id}
        </div>
    );
};

export default Details;