'use client'

import { useEffect, useState } from "react";
import { ISearchHistory } from "./types";

const useSearchHistory = () => {

    let [searchHistory, updateSearchHistory] = useState<ISearchHistory[]>([]);

    useEffect(() => {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
        updateSearchHistory(searchHistory);
    }, [])

    useEffect(() => {
        window?.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory])


    const addSearchHistory = (newSearch: ISearchHistory) => {
        if (searchHistory !== undefined) {
            const updatedSearchHistory = [...searchHistory, newSearch];
            updateSearchHistory(updatedSearchHistory);
        } else {
            const updatedSearchHistory = [newSearch];
            updateSearchHistory(updatedSearchHistory);
        }
        // localStorage in NextJS requires to be run in useEffect
        // window?.localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    const deleteSearchHistory = (index: number) => {
        if (searchHistory !== undefined) {
            const updatedSearchHistory = searchHistory.filter((_, i) => i !== index);
            updateSearchHistory(updatedSearchHistory);
        }
        // window?.localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    const clearSearchHistory = () => {
        updateSearchHistory([]);
        // window?.localStorage.setItem('searchHistory', JSON.stringify([]));
    };

    return { searchHistory, addSearchHistory, deleteSearchHistory, clearSearchHistory }
}

export default useSearchHistory;