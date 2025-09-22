import * as qs from 'qs'
import {Category} from 'api'
import {Option} from 'components/MultiDropdown'

type ValueOf<T> = T[keyof T];

export const getNewURLWithUpdatedParamValue = (
  paramName: string,
  value: ValueOf<qs.ParsedQs>,
  prevParams: qs.ParsedQs
): string => {
  const n = { ...prevParams, [paramName]: value }
  return qs.stringify(n, { addQueryPrefix: true })
}

export const categoriesToOptions = (v:Category): Option => ({key: `${v.id}`, value: v.name})

