import PropTypes from 'prop-types'
const SectionHeder = ({header, description}) => {
    return (
        <div className="w-full my-8">
            <h1 className="text-4xl text-center font-medium mb-2">{header}</h1>
            <p className="text-center">{description}</p>
        </div>
    );
};

SectionHeder.propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
}
export default SectionHeder;