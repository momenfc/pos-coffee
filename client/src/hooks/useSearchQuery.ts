import { useMemo } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

function useSearchQuery() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryObj = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  /**
   *
   * @param {object} query
   * @param {{pathname:string}} options
   * @returns
   */

  interface Options {
    pathname?: string;
    state?: any;
    replace?: boolean;
  }
  const handleSearchQuery = (query: any, options?: Options) => {
    // console.log('handleSearchQuery  options:', options);
    // console.log('handleSearchQuery  query:', query);

    if (options) {
      navigate(
        {
          pathname: options.pathname,
          search: createSearchParams(query).toString(),
        },
        { state: options.state, replace: options.replace }
      );
      return;
    }
    setSearchParams(query);
  };
  return {
    searchQueryStr: searchParams.toString(),
    searchQueryObj,
    isSearchQuery: !!searchParams.toString(),
    setSearchQuery: handleSearchQuery,
  };
}

export default useSearchQuery;
