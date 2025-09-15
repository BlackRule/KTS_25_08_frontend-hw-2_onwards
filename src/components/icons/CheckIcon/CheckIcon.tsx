import cn from 'classnames'
import * as React from 'react'
import Icon, { IconProps } from '../Icon'

const CheckIcon: React.FC<IconProps> = ({color='primary',...props}) => <Icon {...props} >
  <path d="M4 11.6129L9.87755 18L20 7" className={cn(props.className,'stroke',color)} strokeWidth="2"/>
</Icon>

export default CheckIcon
