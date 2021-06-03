import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import point from '../point'

export type Store = {
  id: string,
  name: string,
  logo: string,
  description: string,
}

const defaultContext = {
  storeList: [] as Array<Store>
}

const StoreContext = createContext(defaultContext)

export const useStoreContext = () => useContext(StoreContext)
export const ProvideStoreContext = ({ children }: { children: ReactNode }) => {
  const [storeList, setStoreList] = useState<Array<Store>>([])

  useEffect(() => {
    (async () => {
      let data = await window.point.contract.call() // todo update point sdk in point browser to enable passing query params for the contract call
      let stores:any = []
      let storesData = data

      storesData.forEach((storeData:any) => {
        let store = {
          id: storeData[0],
          name: storeData[1],
          description: storeData[2],
          logo: storeData[3]
        }

        stores.push(store)
      })

      setStoreList(stores as Store[]) // TODO: error handling
    })()
  }, [])

  const context = {
    storeList,
  }

  return <StoreContext.Provider value={ context }>{ children }</StoreContext.Provider>
}
