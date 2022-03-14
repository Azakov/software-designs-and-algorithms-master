import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account } from '../types';

import rows from './mocks/rows.json';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

function App() {
  const [data, setData] = useState<Row[]>(undefined);
  const [updateData, setUpdateData] = useState<Row[]>(undefined);
  const [filter, setFilterData] = useState<string[]>(undefined);
  const [sort, setSortData] = useState<string>(undefined);
  const [searchQuery, setSearchData] = useState<string>(undefined);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => 
        setData(users.map((user) => createRow(user, images, accounts)))
    );
  }, [])

  useEffect(() => {
    setUpdateData(filterList(data, filter));
  }, [data, filter])
  
  useEffect(() => {
    setUpdateData(sortList(data, sort));
  }, [data, sort])

  useEffect(() => {
    setUpdateData(searchData(data, searchQuery));
  }, [data, searchQuery])

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters updateSelected={setFilterData} />
            <Sort  updateSelected={setSortData} />
          </div>
          <Search updateSelected={setSearchData} />
        </div>
        <Table rows={updateData || mockedData} />
      </div>
    </StyledEngineProvider>
  );
}

const getAccountsById = (accounts: Account[], id: string): Account => accounts.find((acc) => acc.userID === id);

const getImagesById = (images: Image[], id: string): Image  => images.find((img) => img.userID === id);

const getLastPayment = (account: Account): number => account.payments.length
    ? [...account.payments].sort((a, b) => +new Date(b.date) - +new Date(a.date))[0].totalSum 
    : 0;

const  createRow = ( user: User, images: Image[], accounts: Account[]): Row => {
    return {
        avatar: getImagesById(images, user.userID).url,
        username: user.username,
        country: user.country,
        name: user.name,
        lastPayments: getLastPayment(getAccountsById(accounts, user.userID)),
        posts: getAccountsById(accounts, user.userID).posts
    }
}

const  filterList = (data: Row[], filters: string[]): Row[] => {
    if (!data) {
        return;
    }
    if (filters && filters.length === 0) {
        return [...data];
    }

    return filters?.map(filterOption => filterByOption([...data], filterOption)).flat();
}

const filterByOption = (data: Row[], option): Row[] => {
    if (option === 'Without posts') {
        return data.filter(item => item.posts === 0);
    } else if (option === 'More than 100 posts') {
        return data.filter(item => item.posts >= 100);
    } else {
        return data;
    }
}

const sortList = (data: Row[], sort: string): Row[] => {
    if (!data) {
        return;
    }

    if (!sort) {
        return [...data];
    }

    if (sort === 'asc') {
        return [...data].sort((a,b) => a.posts - b.posts);
    } else {
        return [...data].sort((a,b) => b.posts - a.posts);
    }

}

const searchData = (data: Row[], searchQuery: string): Row[] => {
    if (!data) {
        return;
    }

    if (!searchQuery) {
        return [...data];
    }

    return data.filter(row => filterByName(row.name, searchQuery) 
        || filterByUsername(row.username, searchQuery) 
        || filterByCountry(row.country, searchQuery))

}

const filterByName = (name: string, searchQuery: string) => name.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
const filterByUsername = (username: string, searchQuery: string) => username.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
const filterByCountry = (country: string, searchQuery: string) => country.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())

export default App;
