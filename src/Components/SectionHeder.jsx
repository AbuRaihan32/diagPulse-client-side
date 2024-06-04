import PropTypes from 'prop-types'
const SectionHeder = ({header, description}) => {
    return (
        <div className="w-full my-8">
            <h1 className="text-3xl text-[#1E2865] text-center uppercase">{header}</h1>
            <p className="text-xl text-gray-500 text-center">{description}</p>
        </div>
    );
};

SectionHeder.propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
}
export default SectionHeder;