import { useEffect, useState, useCallback } from 'react'
import './searchBar.css'
import { FaSearch } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { IoMdAddCircle } from 'react-icons/io'
import { backendApi } from '../../api/http'
import _debounce from 'lodash/debounce'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [listSearch, setListSearch] = useState<string[]>()

  // Call API get top 3 search word
  const callGetTop3Search = async (value: string) => {
    await backendApi({ url: 'search/getTop3', method: 'GET', params: { keyword: value } })
      .then((res) => {
        setListSearch(res?.data.data)
      })
      .catch((error) => console.log(error))
  }

  // Call API delete word
  const callDeleteWord = async (value: string) => {
    await backendApi({ url: 'search/delete', method: 'POST', data: { keyword: value } })
      .then((res) => {
        if (res.status == 200) {
          toast.success(res?.data.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
          callGetTop3Search(keyword)
        }
      })
      .catch((error) => console.log(error))
  }

  // Call API add word
  const callAddWord = async (value: string) => {
    await backendApi({ url: 'search/add', method: 'POST', data: { keyword: value } })
      .then((res) => {
        if (res.status == 200) {
          toast.success(res?.data.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
          callGetTop3Search(keyword)
        }
      })
      .catch((error) => console.log(error))
  }

  // Use debounce to restrict api call when changing word for word only call api after certain time
  const debounceFn = useCallback(_debounce(callGetTop3Search, 500), [])

  useEffect(() => {
    keyword ? debounceFn(keyword) : setListSearch([])
  }, [keyword])

  const handleDelete = (value: string) => {
    callDeleteWord(value)
  }

  const handleAdd = (value: string) => {
    callAddWord(value)
  }

  return (
    <>
      <div className='container'>
        <h3 className='title'>Search</h3>

        <div className='input_container'>
          <input
            className='input'
            type='text'
            placeholder='Search...'
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
          />
          <div className='search'>
            <FaSearch />
          </div>
          <button className='add' onClick={() => handleAdd(keyword)}>
            <IoMdAddCircle />
            <p>Add </p>
          </button>
        </div>

        <div className='suggestion'>
          <p>Results: </p>
          {listSearch && listSearch?.length > 0 ? (
            <>
              {' '}
              {listSearch?.map((item) => (
                <span className='suggestion__item' key={item}>
                  <p>{item}</p>
                  <TiDelete
                    className='suggestion__icon'
                    onClick={() => {
                      handleDelete(item)
                    }}
                  />
                </span>
              ))}
            </>
          ) : (
            <p className='no_records'>No records</p>
          )}
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  )
}
