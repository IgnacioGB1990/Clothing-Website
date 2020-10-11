//Listens for every action of a specific type that we pass to it.
import { takeEvery } from "redux-saga/effects"
import ShopActionTypes from "./shop.types"
//import { fetchCollectionsStartAsync } from "./shop.actions"

export function* fetchCollectionsAsync() {
  yield console.log("I am fired")
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}