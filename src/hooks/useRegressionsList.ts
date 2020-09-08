import { gql, useQuery } from '@apollo/client'
import _ from 'lodash'

const GET_REGRESSIONS_LIST = gql`
  query {
    regressions {
      name
      resourceName
      endpoint
    }
  }
`

type VariablesType = {}

type Regression = {
  name: string
  endpoint: string
  resourceName: string
}

type RegressionsListData = {
  regressions: Regression[]
}

const useRegressionsList = () => {
  const { data, loading, error } = useQuery<RegressionsListData, VariablesType>(
    GET_REGRESSIONS_LIST
  )

  const regressionsData = _.get(data, 'regressions')

  return { data: regressionsData || [], loading, error }
}

export default useRegressionsList
