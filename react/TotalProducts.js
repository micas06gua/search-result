import { FormattedHTMLMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

import searchResult from './searchResult.css'

const TotalProducts = ({ recordsFiltered }) => {
  return (
    <div
      className={`${
        searchResult.totalProducts
      } pv5 ph9 bn-ns bt-s b--muted-5 tc-s tl t-action--small`}
    >
      <FormattedHTMLMessage
        tagName="span"
        id="store/search.total-products"
        values={{
          recordsFiltered,
        }}
      />
    </div>
  )
}

TotalProducts.propTypes = {
  /** Total of records filtered */
  recordsFiltered: PropTypes.number.isRequired,
}

export default TotalProducts
