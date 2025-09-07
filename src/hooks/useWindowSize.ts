import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export interface Size {
    //TODO  | undefined google for it with SSR
    height: number; 
    width: number;
}

const getWindowDimensions = ():Size => {
  const { innerWidth: width, innerHeight: height } = window
  return { height, width }
}

const useWindowSize=(delay = 100) =>{
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    const debouncedHandleResize = debounce(handleResize, delay)
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [delay])

  return windowDimensions
}

export default useWindowSize