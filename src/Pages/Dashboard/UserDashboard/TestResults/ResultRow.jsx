import PropTypes from 'prop-types'

const ResultRow = ({result, index}) => {
  return (
    <tr className='text-center'>
      <th>{index + 1}</th>
      <td>{result.name}</td>
      <td>{result.date}</td>
      <td>{result.price} $</td>
      <td>
        <a href={result.resultUrl} target='_blank' className='bg-[#31EDAF] py-2 px-4 text-white rounded-full' > View the results </a>
      </td>
    </tr>
  );
};

ResultRow.propTypes = {
    result: PropTypes.object,
    index: PropTypes.number
}

export default ResultRow;
