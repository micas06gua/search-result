import classNames from 'classnames'
import PropTypes from 'prop-types'
import { map, flatten, filter, prop, compose } from 'ramda'
import React, { useRef, useState, useEffect, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { IconFilter } from 'vtex.store-icons'

import AccordionFilterContainer from './AccordionFilterContainer'
import Sidebar from './SideBar'
import { facetOptionShape } from '../constants/propTypes'
import useSelectedFilters from '../hooks/useSelectedFilters'
import useFacetNavigation from '../hooks/useFacetNavigation'

import searchResult from '../searchResult.css'

const FilterSidebar = ({ filters }) => {
  const [open, setOpen] = useState(false)

  const selectedFiltersFromProps = filter(
    prop('selected'),
    useSelectedFilters(
      compose(
        flatten,
        map(prop('facets'))
      )(filters)
    )
  )

  const [selectedFilters, setSelectedFilters] = useState(
    selectedFiltersFromProps
  )

  const navigateToFacet = useFacetNavigation()

  const lastSelectedFilters = useRef(selectedFilters)

  useEffect(() => {
    if (!open) {
      lastSelectedFilters.current = selectedFilters
    }
  }, [selectedFilters, open])

  const isOptionSelected = opt =>
    !!selectedFilters.find(facet => facet.value === opt.value)

  const handleFilterCheck = filter => {
    if (!isOptionSelected(filter)) {
      setSelectedFilters(selectedFilters.concat(filter))
    } else {
      setSelectedFilters(
        selectedFilters.filter(facet => facet.value !== filter.value)
      )
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClearFilters = () => {
    setSelectedFilters(lastSelectedFilters.current)
  }

  const handleApply = () => {
    navigateToFacet(selectedFilters)
  }

  return (
    <Fragment>
      <button
        className={classNames(
          `${
            searchResult.filterPopupButton
          } mv0 pointer flex justify-center items-center`,
          {
            'bb b--muted-1': open,
            bn: !open,
          }
        )}
        onClick={handleOpen}
      >
        <span
          className={`${
            searchResult.filterPopupTitle
          } c-on-base t-action--small ml-auto`}
        >
          <FormattedMessage id="store/search-result.filter-action.title" />
        </span>
        <span
          className={`${searchResult.filterPopupArrowIcon} ml-auto pl3 pt2`}
        >
          <IconFilter size={16} viewBox="0 0 17 17" />
        </span>
      </button>

      <Sidebar onOutsideClick={handleClose} isOpen={open}>
        <AccordionFilterContainer
          filters={filters}
          onFilterCheck={handleFilterCheck}
          selectedFilters={selectedFilters}
          isOptionSelected={isOptionSelected}
        />
        <div
          className={`${
            searchResult.filterButtonsBox
          } bt b--muted-5 bottom-0 fixed w-100 items-center flex z-1 bg-base`}
        >
          <div className="bottom-0 fl w-50 pl4 pr2">
            <Button
              block
              variation="tertiary"
              size="regular"
              onClick={handleClearFilters}
            >
              <FormattedMessage id="store/search-result.filter-button.clear" />
            </Button>
          </div>
          <div className="bottom-0 fr w-50 pr4 pl2">
            <Button
              block
              variation="secondary"
              size="regular"
              onClick={handleApply}
            >
              <FormattedMessage id="store/search-result.filter-button.apply" />
            </Button>
          </div>
        </div>
      </Sidebar>
    </Fragment>
  )
}

FilterSidebar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string.isRequired,
      facets: PropTypes.arrayOf(facetOptionShape),
    })
  ).isRequired,
}

export default FilterSidebar
