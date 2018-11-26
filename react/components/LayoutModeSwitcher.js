import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'

import Grid from '../images/Grid'
import SingleItemGrid from '../images/SingleItemGrid'
import InlineGrid from '../images/InlineGrid'


export default function LayoutModeSwitcher({ activeMode, onChange }) {

  const onChangeHandler = (type, onChange) => e => onChange(e, type)
  const renderButton = (mode, onChange) => {

    const renderIcon = mode => {
      return mode === 'small' ? <Grid /> : mode === 'inline' ? <InlineGrid /> : <SingleItemGrid />
    }

    return (
      <div className="vtex-layout-switcher flex justify-between pv2">
        <div className="flex justify-center flex-auto ">
          <Button
            variation="tertiary"
            size="small"
            onClick={onChangeHandler(mode, onChange)}
          >
            {renderIcon(mode)}
          </Button>
        </div>
      </div>
    )
  }

  return renderButton(activeMode, onChange)
}

LayoutModeSwitcher.propTypes = {
  /** Current active mode */
  activeMode: PropTypes.string.isRequired,
  /** On change callback */
  onChange: PropTypes.func.isRequired,
}
