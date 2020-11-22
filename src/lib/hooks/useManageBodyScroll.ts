import { useEffect, useRef } from 'react'

export interface ManageBodyScrollApi {
  scrollDisabled: boolean
}

// https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/
export const useManageBodyScroll = (api: ManageBodyScrollApi) => {
  const { scrollDisabled } = api
  const scrollY = useRef(window.pageYOffset)
  useEffect(() => {
    if (scrollDisabled) {
      const bodyElement = document.body
      scrollY.current = window.pageYOffset
      bodyElement.style.overflow = 'hidden'
      bodyElement.style.position = 'fixed'
      bodyElement.style.top = `-${scrollY.current}px`
      bodyElement.style.width = '100%'
    } else {
      const bodyElement = document.body
      bodyElement.style.removeProperty('overflow')
      bodyElement.style.removeProperty('position')
      bodyElement.style.removeProperty('top')
      bodyElement.style.removeProperty('width')
      window.scrollTo(0, scrollY.current)
    }
  }, [scrollDisabled])
}
